import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rio Sun Massage Therapy",
  alternates: { languages: { "en-GB": "/en/", "pt-BR": "/pt-br/", "x-default": "/en/" } },
};

/** "/" → remembered language, else browser language (pt → PT-BR), else EN-GB. Works on any static host. */
export default function RootRedirect() {
  const js = `(function(){var l;try{l=localStorage.getItem('riosun-locale')}catch(e){}if(!l){l=(navigator.language||'').toLowerCase().indexOf('pt')===0?'pt-br':'en'}location.replace('/'+l+'/')})()`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: js }} />
      <noscript><meta httpEquiv="refresh" content="0; url=/en/" /></noscript>
      <p style={{ color: "#f8f4ee", fontFamily: "system-ui", padding: 24 }}><a href="/en/" style={{ color: "#d9c6a8" }}>Rio Sun Massage Therapy</a></p>
    </>
  );
}
