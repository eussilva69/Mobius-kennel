# CONTEXTO_PROJETO.md | Contexto Compartilhado do Produto

> **Status:** v1.0 implementada (landing page completa). **Aguardando validação comercial** dos itens da seção 8 antes da publicação.
> **Nome do Projeto:** MORBIUS KENNEL
> **Diretório:** `D:\PROJETOS CLAUDE\MORBIUS KENNEL`
> **Assets originais do cliente:** `D:\$$$ ARQUIVOS CLIENTES $$$\MORBIUS KENNEL`
> **Última atualização deste arquivo:** 21/11/2026
> **Diretriz de Confiabilidade:** tudo o que está aqui foi confirmado pelo briefing ou verificado no código. Itens não confirmados ficam na seção 8 e **nunca** devem ser inventados no site.

---

## 1. IDENTIFICAÇÃO DO PRODUTO & NEGÓCIO

- **Nome comercial:** Morbius Kennel
- **Slogan:** Força, Nobreza e Equilíbrio.
- **Segmento:** **Adestramento canino** com aulas no endereço do cliente.
  - Correção: uma versão anterior deste arquivo dizia "canil, criação seletiva, ninhadas". Isso NÃO corresponde ao negócio atual.
- **Localização:** Arujá — SP. Atende "Arujá e região", sujeito à confirmação de disponibilidade.
- **Horário:** segunda a sábado, das 08h às 18h.
- **WhatsApp comercial:** +55 (11) 92042-5303 · `https://wa.me/5511920425303`
- **Instagram:** https://www.instagram.com/morbius.kennel/
- **Proposta de valor:** treinamento personalizado (comandos fundamentais, obediência avançada, orientação comportamental) na rotina do cão, sem multa por cancelamento.
- **Público-alvo:** tutores que querem melhorar obediência, passeios, socialização, ansiedade/reatividade e a convivência em casa, sem levar o cão a outro local. A linguagem do site é leiga.
- **Objetivo nº 1 do site:** conversão para conversa no WhatsApp. A jornada é: problema → confiança → solução → plano → WhatsApp.

---

## 2. MAPEAMENTO DE PASTAS & ARQUIVOS-CHAVE (MIRA A LASER)

> **ATENÇÃO IA:** consulte esta tabela antes de buscar no repositório. **Conteúdo comercial (preços, contatos, textos de FAQ) vive em `src/data/`, nunca nos componentes.**

| Caminho | Finalidade | Arquivos críticos |
|---|---|---|
| `src/app/` | Rotas, layout raiz, metadados, SEO técnico | `layout.tsx` (metadata, fonte Archivo, header/footer globais), `page.tsx` (ordem das 7 seções + JSON-LD), `globals.css` (design system Tailwind v4), `sitemap.ts`, `robots.ts`, `not-found.tsx`, `politica-de-privacidade/page.tsx`, `icon.png`, `apple-icon.png`, `favicon.ico` |
| `src/data/` | **Fonte única de conteúdo** | `site.ts` (nome, contatos, horário, região, navegação), `plans.ts` (preços; descontos e totais calculados; `processPlans` + `avulsoPlan`), `faqs.ts` (6 perguntas), `problems.ts` (6 situações com rótulo curto `short`), `images.ts` (fotos + alt text), `testimonials.ts` (vazio até haver depoimentos autorizados) |
| `src/lib/` | Regras e utilitários | `whatsapp.ts` (`createWhatsAppLink` + mensagens por origem), `messages.ts` (`buildDogMessage`), `selection-store.ts` (seleção compartilhada com o contato fixo), `analytics.ts`, `structured-data.ts` (schema.org), `seo.ts` (título, description, OG base), `site-url.ts`, `format.ts` |
| `src/components/layout/` | Estrutura global | `Header` + `MobileMenu` (client), `Footer`, `FloatingWhatsApp` (client: botão redondo no desktop/paisagem, barra inferior no celular; envia a seleção do visitante), `ScrollState`, `InPageFocus` (foco nas âncoras) |
| `src/components/sections/` | As seções (ordem em `page.tsx`) | `Hero` (recorte sobre bloco diagonal dourado), `Services` (3 serviços com foto + `ProblemSelector` compacto), `HowItWorks` (bloco dourado), `Pricing`, `About`, `Results` (só com depoimentos autorizados), `FAQ`, `FinalCTA` (espelha o hero, com o segundo recorte) |
| `src/components/ui/` | Primitivos do design system | `ButtonLink` (variantes `gold`, `ink`, `ghost`, `ghostInk`; classe `.btn`), `WhatsAppButton`, `PricingCard`, `Container`, `BrandIcons` (WhatsApp/Instagram) |
| `src/components/analytics/` | Medição | `AnalyticsListener` (client, delegação de cliques `data-track`, FAQ, scroll depth), `AnalyticsScripts` (GTM/GA4 só com env) |
| `public/images/morbius/` | Imagens otimizadas (WebP), **geradas** | `brand/`, `hero/` (recortes com fundo transparente), `treinamentos/`, `profissionais/`, `og/`. A pasta é apagada e recriada pelo `npm run images` |
| `scripts/` | Pipeline de imagens | `process-images.mjs` (sharp: enquadra, gradua e otimiza; `npm run images`). `cutout.py` (rembg, modelo `birefnet-general-lite`: remove o fundo). `cutouts/*.png` (recortes já gerados, versionados) |
| `e2e/` + `playwright.config.ts` | Testes E2E (Playwright, 40 testes: desktop 1440 + mobile 390) | Rodam contra um servidor já iniciado (`E2E_BASE_URL`, padrão `http://localhost:3000` do `npm run start`) |
| Raiz | Configuração | `package.json`, `next.config.ts` (imagens AVIF/WebP, headers de segurança), `tsconfig.json`, `eslint.config.mjs`, `vitest.config.mts`, `.env.example` |

---

## 3. ENGENHARIA, STACK & COMANDOS OFICIAIS

- **Framework:** Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript 5.9 (strict + `noUncheckedIndexedAccess`).
- **Estilo:** Tailwind CSS v4. Tokens ficam em `@theme` dentro de `globals.css`, não há `tailwind.config`. Variante customizada `scrolled:`.
- **Ícones:** lucide-react v1. A v1 não traz marcas, por isso WhatsApp e Instagram estão em `BrandIcons.tsx` (Simple Icons, CC0).
- **Animações:** CSS puro, sem bibliotecas de animação:
  - entrada do hero (`.hero-in`, `.hero-figure`, só opacidade e transform);
  - acordeão com `::details-content`;
  - tudo respeita `prefers-reduced-motion`.
- **Fonte:** Archivo variável (eixo de largura) via `next/font/google`.
  - Títulos: classe `.display` (800, largura 125%, caixa alta). Em telas abaixo de 480px a largura cai para 110%, e abaixo de 360px para 100%.
  - Corpo: largura normal.
  - Histórico: o Cormorant foi descartado porque desenha o "ê" deslocado; o EB Garamond foi substituído na reformulação de 21/11/2026, a pedido do cliente (mais contraste, estilo da referência).
- **Recorte de fotos (remover fundo):**
  1. Criar um venv Python com `pip install "rembg[cpu]"`.
  2. Rodar `python -I scripts/cutout.py <foto.jpg> scripts/cutouts/<nome>.png`.
  3. Ajustar o enquadramento em `process-images.mjs` (`HERO_CROP` / `TEAM_CROP`).
- **Banco de dados / backend:** nenhum. Site 100% estático (todas as rotas são pré-renderizadas). Sem login, checkout ou formulários persistidos.
- **Hospedagem prevista:** Vercel.
- **Comandos:**
  - Instalação: `npm install`
  - Desenvolvimento: `npm run dev`
  - Build: `npm run build` · Servir build: `npm run start`
  - Tipos: `npm run typecheck` (`tsc --noEmit`)
  - Lint: `npm run lint` (ESLint 9 flat config + `eslint-config-next`)
  - Testes unitários: `npm run test` (Vitest: links do WhatsApp, mensagens, consistência de preços/descontos)
  - Testes E2E: `npm run build`, depois `npm run start` e, em outro terminal, `npm run test:e2e`. Defina `E2E_BASE_URL` se não for `http://localhost:3000`.
  - Desempenho medido em 21/11/2026, num build local com rede e CPU emuladas:

    | Dispositivo | LCP | CLS |
    |---|---|---|
    | Celular 412px (4G lento, CPU 4×) | ~1,8–2,6 s | ~0 |
    | Tablets | ~0,5–0,6 s | ~0 |
    | Desktop | ~0,4 s | ~0 |

  - Links de âncora usam `prefetch={false}`, para não pré-carregar a própria página.
  - Imagens: `npm run images` (reprocessa os originais do cliente)

---

## 4. INTEGRAÇÕES EXTERNAS

- **WhatsApp:** links `wa.me` com mensagem pré-preenchida (`encodeURIComponent`). Não usa a API do WhatsApp Business.
  - Mensagens por origem em `src/lib/whatsapp.ts`.
  - Planos usam `plan.message`; problemas e questionário montam o texto dinamicamente em `src/lib/messages.ts`.
- **Instagram:** apenas links (sem embed).
- **Analytics (preparado, desligado):** GA4 ou GTM carregam **somente** se `NEXT_PUBLIC_GTM_ID` (formato `GTM-…`) ou `NEXT_PUBLIC_GA_ID` (formato `G-…`) forem definidos. Os IDs são validados por regex.
  - Eventos: `whatsapp_click` (param `source`), `plan_select` (`plan`), `quiz_start`, `quiz_complete`, `faq_open` (`question_id`), `instagram_click` (`source`), `scroll_depth` (`percent` 25/50/75/100).
  - Para adicionar rastreio a um link, use os atributos `data-track="whatsapp_click" data-source="…" [data-plan="…"]`.
  - **Privacidade:** nunca enviar nome, telefone, região digitada ou descrição do comportamento do cão como parâmetro.
  - Um `whatsapp_click` mede o clique, não uma conversa iniciada.
- **Pagamentos:** não há (fora do escopo da v1).

---

## 5. REGRAS DE NEGÓCIO E INVARIANTES CRÍTICAS

1. **Nada inventado.** Proibido publicar: depoimentos, nomes de clientes, avaliações/estrelas, número de cães treinados, % de satisfação, garantias de resultado, prazos fixos, "avaliação gratuita", "plano mais vendido", certificações, endereço físico, CNPJ, raio em km, cidades atendidas não confirmadas.
2. **Planos e preços** (`src/data/plans.ts`, protegidos por teste):

   | Plano | Etiqueta | Duração | Mensalidade | Desconto | Total de referência |
   |---|---|---|---|---|---|
   | Avulso | Flexibilidade | sem compromisso | R$ 630 | referência | — |
   | Fundamentos | Para começar | 3 meses | R$ 600 | 4,76% | R$ 1.800 |
   | Equilíbrio (destaque) | Mais evolução | 5 meses | R$ 565 | 10,32% | R$ 2.825 |
   | Excelência | Mais completo | 6 meses | R$ 530 | 15,87% | R$ 3.180 |

   - Os descontos são **calculados** sobre R$ 630/mês.
   - O Equilíbrio recebe o destaque visual, mas nunca deve ser chamado de "mais vendido".
3. **Cancelamento:** comunicar "sem multa por cancelamento", sem afirmar que o cliente deve pagar o pacote inteiro. Condições de cobrança e reembolso são "esclarecidas antes da contratação".
4. **Comunicação responsável:** falar em orientação e evolução. Não prometer eliminar ansiedade, reatividade ou agressividade.
5. **Questionário:** só organiza informações para o atendimento. Não diagnostica, não salva nada e não é obrigatório para chegar ao WhatsApp.
6. **Logo:** usar o original sem redesenhar. O emblema circular é só um recorte no limite do anel dourado, com fundo transparente.
7. **Fotos:** apenas as reais do cliente, sem alterar a anatomia dos cães. O tratamento se limita a uma leve dessaturação, recorte e conversão para WebP.

---

## 5.1 ESTRUTURA ATUAL (reformulação de 21/11/2026)

Feita a pedido do cliente: menos texto, só o essencial, mais contraste, menos marrom, visual sem "cara de IA", e hero no estilo de uma referência (pessoa e cães recortados sobre bloco diagonal dourado).

- **7 seções, alternando fundo preto, claro e dourado:**
  1. Hero (preto + bloco dourado + recorte)
  2. O que treinamos (claro: 3 serviços com foto + seletor compacto "Qual é o caso do seu cão?")
  3. Como funciona (dourado, 3 passos)
  4. Planos e preços (preto)
  5. Sobre (claro)
  6. Dúvidas (preto, 6 perguntas)
  7. Fechamento (dourado + bloco preto + segundo recorte)
- **Removidos de propósito:** barra superior, galeria com lightbox, comparativo "hoje → treino", seção de região separada (virou o fechamento), anéis decorativos, chips, ícones em círculos, eyebrows.
- **Navegação (4 itens):** Serviços · Como funciona · Planos · Dúvidas.
- **CTAs:**
  - Rótulos curtos: "Chamar no WhatsApp", "Enviar pelo WhatsApp", "Falar no WhatsApp" (nos planos, com o nome do plano só para leitores de tela), "Consultar o Avulso", "Começar agora".
  - Nada de "avaliar" nem "especialista".
- **Contato fixo:** se o visitante marcou situações no seletor, a barra/botão fixo vira "Enviar minha seleção (N)" com a mesma mensagem.
- **Planos:** 3 cards (Equilíbrio dourado com selo "Mais evolução", primeiro no celular). O Avulso fica numa faixa abaixo.

## 6. IDENTIDADE VISUAL, DESIGN SYSTEM & LEIS DE UX

- **Paleta (tokens em `globals.css`):**
  - Fundos: `ink #0e0e0d` (fundo), `ink-2 #171716` (cards), `ink-3 #232321`
  - Dourados: `gold #d4a24c` (dourado do logo), `gold-light #e2b765`, `gold-deep #a87a2a` (só detalhes, não texto pequeno)
  - Claros: `paper #f4f0e8` (seções claras)
  - Texto sobre escuro: `fg #f7f4ee`, `fg-muted #b6b1a7`
  - Texto sobre claro: `ink`, `ink-muted #55514a`
  - Sobre o dourado: `ink` e `ink/80` (≈6:1)
  - Linhas: `line` (branco 12%), `line-ink` (preto 14%)
  - Contrastes: dourado × preto ≈ 8,3:1; `ink-muted` × papel ≈ 6,9:1.
- **Tipografia:** Archivo.
  - `.display`: títulos largos, pesados e em caixa alta, nos tamanhos `--text-hero`, `--text-h2` e `--text-h3`.
  - Corpo em 17px.
  - Botões em caixa alta, largura 112% (classe `.btn`, que compacta em ≤380px e em paisagem).
- **Assinatura visual:**
  - O corte diagonal (`.diag-right`): bloco dourado no hero e bloco preto no fechamento, com os recortes de fotos reais por cima.
  - Cantos retos em todo o site.
- **Movimento:** só a entrada do hero. Sem revelação por rolagem, parallax ou autoplay.
- **Leis de UX:**
  - *Fitts:* alvos ≥44px e CTA dourado sólido. A barra fixa no celular aparece após rolar. O ícone de WhatsApp do header some quando ela aparece.
  - *Hick/Miller:* 3 serviços, 3 passos, 3 planos + Avulso, 6 dúvidas.
  - *Jakob:* menu hambúrguer, acordeão nativo.
- **Responsividade:**
  - Celular: hero com texto primeiro e imagem logo abaixo; serviços em carrossel com rolagem lateral.
  - Paisagem: hero lado a lado e botão redondo no lugar da barra.
  - Verificado sem rolagem horizontal em 320, 360, 375, 390, 430, 667×375, 768, 844×390, 1024, 1280, 1440, 1920 e 2560 px.

---

## 7. SEO LOCAL

- **Title:** "Adestramento de Cães em Arujá | Morbius Kennel".
- **Description:** "Adestramento de cães em Arujá e região, com aulas na sua casa. Planos a partir de R$ 530/mês e sem multa por cancelamento. Fale pelo WhatsApp."
  - Fica em `src/lib/seo.ts`, com o preço gerado dos dados.
  - Substitui a description do briefing, que não tinha preço nem diferencial.
- **Palavras-chave no texto:** "Adestrador em Arujá" (H2 de Sobre), "adestramento canino em domicílio" (Serviços e Sobre), "Planos e preços".
- **Metadados:** canonical, Open Graph e Twitter com a imagem `og-morbius-kennel.jpg` (1200x630); `lang="pt-BR"`.
- **JSON-LD** (`src/lib/structured-data.ts`): `LocalBusiness` (sem endereço de rua), `Service`, `WebSite` e `FAQPage`.
- **Arquivos técnicos:** `sitemap.xml` e `robots.txt` são gerados pelo Next.
- **Domínio:** vem de `NEXT_PUBLIC_SITE_URL`. Na Vercel, cai automaticamente em `VERCEL_PROJECT_PRODUCTION_URL`. Em build de CI (`CI=1`) sem nenhuma das duas, o build **falha de propósito**, para não publicar canonical em localhost.
- **Palavra-chave no H1:** o H1 é "Adestramento de cães em Arujá".
- **Canonical e Open Graph por página:** definidos em cada `page.tsx`. Os campos comuns de OG ficam em `src/lib/seo.ts` (`baseOpenGraph`).
- **JSON-LD do serviço:** `Service.offers` lista só os 3 planos mensais confirmados. O Avulso fica de fora até ser esclarecido.
- **Estrutura de títulos:** exatamente um H1 por página e H2 por seção.

---

## 8. PENDÊNCIAS — VALIDAÇÃO PRÉ-PUBLICAÇÃO (NÃO INVENTAR)

**Confirmações comerciais com a empresa:**
1. Quantidade de aulas por semana/mês de cada plano.
2. Duração de cada aula.
3. Modalidade exata do **Avulso**: R$ 630 é por aula, mensalidade flexível ou outra condição? Hoje o site exibe "R$ 630 /mês", conforme informado.
4. Política detalhada de cancelamento, regras de interrupção antecipada e reembolso (revisar também a resposta do FAQ "Existe multa por cancelamento?").
5. Formas de pagamento.
6. Cidades e bairros efetivamente atendidos. Hoje o site diz apenas "Arujá e região, sob consulta".
7. Nome do adestrador responsável, formação e certificações (para a seção Sobre e o JSON-LD).
8. Depoimentos e resultados **autorizados**, que entram em `src/data/testimonials.ts` com `authorized: true`.
9. Se existe avaliação inicial e se ela tem custo.
9a. Confirmar se atendem filhotes e qual a idade mínima ou regra de vacinação. Com isso, adicionar ao FAQ a pergunta "Vocês fazem adestramento de filhotes?", que reforça a palavra-chave "adestramento de filhotes em Arujá".

**Técnico, marketing e jurídico:**

10. Domínio oficial, definido em `NEXT_PUBLIC_SITE_URL` na Vercel.
11. IDs de GA4/GTM. Ao ativá-los:
    - implementar aviso/consentimento de cookies (LGPD);
    - **antes de tudo**, desativar "Cliques de saída" no Enhanced Measurement do GA4, ou redigir o parâmetro `text`, e não usar `{{Click URL}}` no GTM. Os links `wa.me` levam a mensagem do visitante na URL (região, comportamento do cão). Detalhes em `src/components/analytics/AnalyticsScripts.tsx`.
12. Revisão jurídica da `/politica-de-privacidade`.
13. Verificar o Google Business Profile, que é essencial para o SEO local. Se houver endereço público, completar o `address` no JSON-LD.

**Assets ainda não fornecidos:**

14. Fotos em **resolução original**: as recebidas vieram comprimidas pelo WhatsApp (720 a 1200 px de largura, e as do parque eram uma colagem 2x2 de ~450 px cada).
15. Vídeos de treino (a galeria já aceita itens `type: "video"` em `src/data/gallery.ts`).
16. Foto de retrato do profissional e registros de evolução dos cães.
17. Logo em vetor (SVG/PDF) para maior nitidez no favicon e no cabeçalho.

---

## 9. INVENTÁRIO DE ASSETS RECEBIDOS (pasta do cliente)

| Arquivo original | Conteúdo | Uso no site |
|---|---|---|
| `MORBIUS KENNEL LOGO.png` (1000², fundo transparente) | **Logo oficial atual**: selo circular com três cães | Header, rodapé, favicon, `icon.png`, `apple-icon.png` (sobre fundo preto) e OG. Só a margem vazia é aparada (`LOGO_CROP`) |
| `MORBIUS KENNEL HERO.png` (1000², fundo transparente) | **Hero oficial atual**: adestrador sentado com cão de grande porte, já recortado pelo cliente | Hero, enquadrado da cabeça às canelas (`HERO_CROP`), e imagem OG |
| `LOGO MORBIUS KENNEL.jpg` (1024²) e `…ACBF4F….jpg` | Versões anteriores do logo e da foto do hero | Substituídas pelos PNGs acima (não usadas) |
| `…ACF584….jpg` (1086x1448) | Adestrador com dois cães sentados nas patas traseiras, na rua | **Fechamento**: recorte sem fundo (`scripts/cutouts/obediencia-cutout.png`) |
| `…AC60F6….jpg` (963x1280) | Cão branco sentado nas patas traseiras | Serviço "Obediência" |
| `…ACF1D6….jpg` (1200x1600) | Adestrador com pastor-alemão e cão pequeno | Serviço "Passeio na guia" |
| `…ACF28C….jpg` (960x1280) | Adestrador com rottweiler e maltês | Serviço "Comportamento" |
| `…ACBAF2….jpg` (1204x1600) | Adestrador agachado fazendo carinho no cão | Seção "Sobre" |
| `…AC268F….jpg`, `…AC7053….jpg` (colagem), `…ACD954….jpg` | Rua com dois cães pretos; treinos no parque; adestrador de costas com o cão | Não usados na versão atual (reserva) |

---

## 10. DEPLOY (VERCEL)

1. Suba o repositório para o GitHub (somente quando autorizado; ver política de Git em `AGENTS.md`).
2. Na Vercel, importe o projeto. O framework Next.js é detectado sozinho.
3. Em *Environment Variables*, defina `NEXT_PUBLIC_SITE_URL` com o domínio final, sem barra no fim. `NEXT_PUBLIC_GTM_ID` ou `NEXT_PUBLIC_GA_ID` são opcionais.
4. Conecte o domínio e valide o resultado no Rich Results Test e no Search Console (envie `/sitemap.xml`).
5. Antes de publicar, resolva os itens 1 a 9 da seção 8 e ajuste os arquivos de `src/data/`.
