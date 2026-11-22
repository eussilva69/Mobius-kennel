import Script from "next/script";
import { getAnalyticsIds } from "@/lib/analytics";

/**
 * Carrega GTM ou GA4 SOMENTE se os IDs forem configurados nas variáveis de ambiente.
 * Nenhum identificador é inventado. Ao ativar, configure também o aviso de cookies (LGPD).
 *
 * ⚠️ PRIVACIDADE — OBRIGATÓRIO ANTES DE DEFINIR OS IDs:
 * os links do WhatsApp levam a mensagem na URL (wa.me/...?text=...), que pode conter a região
 * digitada no questionário e a descrição do comportamento do cão. O "Enhanced Measurement" do GA4
 * (cliques de saída) e a variável {{Click URL}} do GTM enviariam essa URL completa.
 * No GA4: Admin → Fluxo de dados → desative "Cliques de saída" OU, em "Redação de dados",
 * adicione o parâmetro de consulta `text`. No GTM: não use {{Click URL}} em tags de clique.
 */
export function AnalyticsScripts() {
  const { gtmId, gaId } = getAnalyticsIds();

  if (gtmId) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
    );
  }

  if (gaId) {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
        </Script>
      </>
    );
  }

  return null;
}
