/**
 * Processa os arquivos originais da Morbius Kennel e gera os assets otimizados do site.
 *
 * Uso:  npm run images
 * Fonte: variável MORBIUS_ASSETS_DIR ou a pasta padrão do cliente abaixo.
 *
 * Logo e hero: PNGs oficiais enviados pelo cliente, já com fundo transparente em alta resolução.
 * Fechamento (fundo site.png): recorte oficial de alta qualidade enviado pelo cliente.
 * Fotos dos serviços e sobre: fotos melhoradas em alta resolução (alta_qualidade_jpg).
 *
 * Nada aqui altera a anatomia dos cães nem redesenha o logotipo.
 */
import sharp from "sharp";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = process.env.MORBIUS_ASSETS_DIR ?? "D:/$$$ ARQUIVOS CLIENTES $$$/MORBIUS KENNEL";
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/images/morbius");
const APP = path.join(ROOT, "src/app");

const files = {
  // Arquivos oficiais enviados pelo cliente já com fundo transparente
  logo: "MORBIUS KENNEL LOGO.png",
  heroCutout: "MORBIUS KENNEL HERO.png",
  teamCutout: "fundo site.png",
  sitDog: "fotos_melhoradas_para_site/alta_qualidade_jpg/08_cachorro_branco_adestrado.jpg",
  shepherd: "fotos_melhoradas_para_site/alta_qualidade_jpg/06_passeio_ao_ar_livre.jpg",
  rottweiler: "fotos_melhoradas_para_site/alta_qualidade_jpg/07_passeio_com_caes_no_gramado.jpg",
  care: "fotos_melhoradas_para_site/alta_qualidade_jpg/03_homem_e_cachorro_carinho.jpg",
};
const src = (k) => path.join(SRC, files[k]);

const INK = { r: 14, g: 14, b: 13 }; // --color-ink #0e0e0d
const GOLD = "#d4a24c";

const webp = (img, file, quality = 85) => img.webp({ quality, effort: 6 }).toFile(file);

/* ---------------- Logo ---------------- */
const LOGO_CROP = { left: 10, top: 10, width: 980, height: 980 };

async function logo() {
  const emblem = await sharp(src("logo")).extract(LOGO_CROP).png().toBuffer();

  await sharp(emblem).resize(512).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(path.join(OUT, "brand/logo-emblem.png"));
  await sharp(emblem).resize(192).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(path.join(APP, "icon.png"));
  // Apple touch icon: selo sobre fundo preto opaco (iOS não lida bem com transparência)
  const appleEmblem = await sharp(emblem).resize(160).png().toBuffer();
  await sharp({ create: { width: 180, height: 180, channels: 4, background: { ...INK, alpha: 1 } } })
    .composite([{ input: appleEmblem, left: 10, top: 10 }])
    .png()
    .toFile(path.join(APP, "apple-icon.png"));

  // favicon.ico com PNGs embutidos (16, 32, 48)
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((s) => sharp(emblem).resize(s).png().toBuffer()));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length;
  const entries = sizes.map((s, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(s, 0);
    e.writeUInt8(s, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(pngs[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += pngs[i].length;
    return e;
  });
  await writeFile(path.join(APP, "favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));
  return emblem;
}

/* ---------------- Recortes (fundo transparente) ---------------- */
async function cutouts() {
  // Hero: adestrador + cão de grande porte sentado com guia, corpo inteiro em alta definição
  await sharp(src("heroCutout"))
    .trim({ threshold: 5 })
    .webp({ quality: 88, alphaQuality: 92, effort: 6 })
    .toFile(path.join(OUT, "hero/adestrador-e-cao-recorte.webp"));

  // Fechamento: adestrador + dois cães pastores nas patas traseiras sob comando, corpo inteiro
  await sharp(src("teamCutout"))
    .trim({ threshold: 5 })
    .webp({ quality: 88, alphaQuality: 92, effort: 6 })
    .toFile(path.join(OUT, "hero/adestrador-dois-caes-recorte.webp"));
}

/* ---------------- Fotos ---------------- */
async function photos() {
  // 1. Obediência: cão branco sentado nas patas traseiras no gramado
  await webp(
    sharp(src("sitDog"))
      .extract({ left: 0, top: 460, width: 1926, height: 2100 })
      .resize({ width: 1200 }),
    path.join(OUT, "treinamentos/obediencia-cao-sentado.webp"),
    85
  );

  // 2. Passeio na guia: adestrador com pastor-alemão e cão pequeno no caminho de lajotas
  await webp(
    sharp(src("shepherd"))
      .extract({ left: 240, top: 660, width: 1920, height: 2094 })
      .resize({ width: 1200 }),
    path.join(OUT, "treinamentos/passeio-na-guia.webp"),
    85
  );

  // 3. Comportamento: adestrador conduzindo rottweiler e maltês branco no gramado
  await webp(
    sharp(src("rottweiler"))
      .extract({ left: 0, top: 240, width: 1920, height: 2094 })
      .resize({ width: 1200 }),
    path.join(OUT, "treinamentos/comportamento-rottweiler-maltes.webp"),
    85
  );

  // 4. Sobre: adestrador fazendo carinho no rosto do cão à beira do lago
  await webp(
    sharp(src("care"))
      .extract({ left: 0, top: 520, width: 2408, height: 2480 })
      .resize({ width: 1400 }),
    path.join(OUT, "profissionais/adestrador-com-cao.webp"),
    85
  );
}

/* ---------------- Open Graph 1200x630 ---------------- */
async function og(emblem) {
  const W = 1200, H = 630;
  const bg = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="rgb(${INK.r},${INK.g},${INK.b})"/>
      <polygon points="${W * 0.66},0 ${W},0 ${W},${H} ${W * 0.5},${H}" fill="${GOLD}"/>
      <style>
        .t { font-family: 'Arial Black', 'Segoe UI Black', Arial, sans-serif; font-weight: 900; fill: #f7f4ee; font-size: 60px; }
        .s { font-family: 'Segoe UI', Arial, sans-serif; fill: #b9b3a8; font-size: 26px; }
      </style>
      <text x="64" y="300" class="t">ADESTRAMENTO</text>
      <text x="64" y="370" class="t">DE CÃES</text>
      <text x="64" y="440" class="t" fill="${GOLD}" style="fill:${GOLD}">EM ARUJÁ</text>
      <text x="64" y="510" class="s">Aulas na sua casa · Morbius Kennel</text>
    </svg>`,
  );
  const subject = await sharp(src("heroCutout"))
    .trim({ threshold: 5 })
    .resize({ height: 560 })
    .png()
    .toBuffer();
  const meta = await sharp(subject).metadata();
  const logoSmall = await sharp(emblem).resize(120).png().toBuffer();
  await sharp(bg)
    .composite([
      { input: subject, left: W - (meta.width ?? 400) - 40, top: H - (meta.height ?? 560) },
      { input: logoSmall, left: 64, top: 70 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(OUT, "og/og-morbius-kennel.jpg"));
}

await rm(OUT, { recursive: true, force: true });
for (const d of ["brand", "hero", "treinamentos", "profissionais", "og"]) await mkdir(path.join(OUT, d), { recursive: true });
const emblem = await logo();
await cutouts();
await photos();
await og(emblem);
console.log("Imagens geradas com sucesso em", OUT);
