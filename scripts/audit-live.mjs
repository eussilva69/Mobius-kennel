async function runAudit() {
  const base = 'https://www.morbiuskennel.com.br';
  const results = [];

  async function check(name, url, expectedStatus, redirectTarget) {
    try {
      const res = await fetch(url, { redirect: 'manual' });
      const status = res.status;
      const location = res.headers.get('location') || '';
      const pass = expectedStatus === status && (!redirectTarget || location.includes(redirectTarget));
      results.push({ name, url, status, expected: expectedStatus, location, pass });
    } catch (e) {
      results.push({ name, url, error: e.message, pass: false });
    }
  }

  await check('Apex HTTP Redirect', 'http://morbiuskennel.com.br', 308, 'https://morbiuskennel.com.br');
  await check('Apex HTTPS Redirect', 'https://morbiuskennel.com.br', 308, 'https://www.morbiuskennel.com.br');
  await check('Home WWW', `${base}/`, 200);
  await check('Politica de Privacidade', `${base}/politica-de-privacidade`, 200);
  await check('Robots.txt', `${base}/robots.txt`, 200);
  await check('Sitemap XML', `${base}/sitemap.xml`, 200);
  await check('Sitemap Index Redirect', `${base}/sitemap_index.xml`, 308, '/sitemap.xml');
  await check('Sitemap Slug Redirect', `${base}/sitemap`, 308, '/sitemap.xml');
  await check('WhatsApp Shortlink', `${base}/whatsapp`, 307, 'wa.me/5511920425303');
  await check('Instagram Shortlink', `${base}/instagram`, 307, 'instagram.com/morbius.kennel');
  await check('PWA Webmanifest', `${base}/manifest.webmanifest`, 200);
  await check('Humans.txt', `${base}/humans.txt`, 200);
  await check('Security.txt', `${base}/.well-known/security.txt`, 200);
  await check('Favicon ICO', `${base}/favicon.ico`, 200);
  await check('App Icon PNG', `${base}/icon.png`, 200);
  await check('Apple Touch Icon', `${base}/apple-icon.png`, 200);

  console.log('=== RELATORIO DE STATUS DAS ROTAS ===');
  let allPass = true;
  for (const r of results) {
    console.log((r.pass ? '[PASS]' : '[FAIL]'), r.name, '-> Status:', r.status, (r.location ? 'Loc: ' + r.location : ''));
    if (!r.pass) allPass = false;
  }
  console.log('Resultado Rotas:', allPass ? 'TODAS PASSARAM (16/16)' : 'FALHA');

  console.log('\n=== AUDITORIA DE HEADERS DE SEGURANÇA ===');
  const homeRes = await fetch(`${base}/`);
  const headers = homeRes.headers;
  const securityChecks = [
    { name: 'X-Content-Type-Options', expected: 'nosniff', val: headers.get('x-content-type-options') },
    { name: 'X-Frame-Options', expected: 'SAMEORIGIN', val: headers.get('x-frame-options') },
    { name: 'Referrer-Policy', expected: 'strict-origin-when-cross-origin', val: headers.get('referrer-policy') },
    { name: 'Permissions-Policy', expected: 'camera=(), microphone=(), geolocation=()', val: headers.get('permissions-policy') },
  ];
  for (const s of securityChecks) {
    const ok = s.val === s.expected;
    console.log((ok ? '[PASS]' : '[FAIL]'), s.name, ':', s.val);
  }

  console.log('\n=== AUDITORIA DO CONTEÚDO HTML & SEO ===');
  const html = await homeRes.text();
  const checks = [
    { name: 'Title Tag', pass: html.includes('<title>') && html.includes('Morbius Kennel') },
    { name: 'Meta Description', pass: html.includes('name="description"') && html.includes('Adestramento de cães em Arujá') },
    { name: 'Canonical Link', pass: html.includes('rel="canonical"') && html.includes('https://www.morbiuskennel.com.br') },
    { name: 'Viewport Meta', pass: html.includes('name="viewport"') },
    { name: 'OpenGraph Title', pass: html.includes('property="og:title"') },
    { name: 'OpenGraph Image', pass: html.includes('property="og:image"') },
    { name: 'Twitter Card', pass: html.includes('name="twitter:card"') },
    { name: 'GEO Region Tag', pass: html.includes('name="geo.region"') && html.includes('BR-SP') },
    { name: 'GEO Placename Tag', pass: html.includes('name="geo.placename"') && html.includes('Arujá') },
    { name: 'ICBM Coordinates', pass: html.includes('name="ICBM"') && html.includes('-23.3967') },
    { name: 'Schema.org JSON-LD Graph', pass: html.includes('application/ld+json') && html.includes('LocalBusiness') },
    { name: 'Schema.org GeoCircle', pass: html.includes('GeoCircle') && html.includes('50000') },
    { name: 'Schema.org FAQPage', pass: html.includes('FAQPage') },
  ];
  for (const c of checks) {
    console.log((c.pass ? '[PASS]' : '[FAIL]'), c.name);
  }

  console.log('\n=== AUDITORIA DO SITEMAP.XML ===');
  const sitemapRes = await fetch(`${base}/sitemap.xml`);
  const sitemapXml = await sitemapRes.text();
  const sitemapChecks = [
    { name: 'XML Declaration', pass: sitemapXml.includes('<?xml version="1.0" encoding="UTF-8"?>') },
    { name: 'urlset Namespace', pass: sitemapXml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"') },
    { name: 'image Namespace', pass: sitemapXml.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"') },
    { name: 'xhtml Namespace', pass: sitemapXml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"') },
    { name: 'Home URL', pass: sitemapXml.includes('<loc>https://www.morbiuskennel.com.br/</loc>') },
    { name: 'Privacy URL', pass: sitemapXml.includes('<loc>https://www.morbiuskennel.com.br/politica-de-privacidade</loc>') },
    { name: 'Image Nodes', pass: sitemapXml.includes('<image:loc>') },
    { name: 'Hreflang Alternates', pass: sitemapXml.includes('hreflang="pt-BR"') && sitemapXml.includes('hreflang="x-default"') },
  ];
  for (const sc of sitemapChecks) {
    console.log((sc.pass ? '[PASS]' : '[FAIL]'), sc.name);
  }

  console.log('\n=== AUDITORIA DO ROBOTS.TXT ===');
  const robotsRes = await fetch(`${base}/robots.txt`);
  const robotsTxt = await robotsRes.text();
  const robotsChecks = [
    { name: 'Wildcard Rule', pass: robotsTxt.includes('User-Agent: *') },
    { name: 'Googlebot Rule', pass: robotsTxt.includes('User-Agent: Googlebot') },
    { name: 'WhatsApp Rule', pass: robotsTxt.includes('User-Agent: WhatsApp') },
    { name: 'GPTBot Rule', pass: robotsTxt.includes('User-Agent: GPTBot') },
    { name: 'ClaudeBot Rule', pass: robotsTxt.includes('User-Agent: ClaudeBot') },
    { name: 'PerplexityBot Rule', pass: robotsTxt.includes('User-Agent: PerplexityBot') },
    { name: 'Sitemap Directive', pass: robotsTxt.includes('Sitemap: https://www.morbiuskennel.com.br/sitemap.xml') },
    { name: 'Host Directive', pass: robotsTxt.includes('Host: https://www.morbiuskennel.com.br') },
  ];
  for (const rc of robotsChecks) {
    console.log((rc.pass ? '[PASS]' : '[FAIL]'), rc.name);
  }
}

runAudit();
