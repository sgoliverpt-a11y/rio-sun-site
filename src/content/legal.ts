import type { L10n } from "@/i18n/config";

/**
 * Legal pages — DRAFT STRUCTURE ONLY. Must be reviewed by a UK legal professional
 * before launch (UK GDPR / PECR). Controller details to be supplied by Rio Sun.
 */
export const legalDocs: Record<"privacy" | "cookies" | "terms", { title: L10n; sections: { h: L10n; p: L10n }[] }> = {
  privacy: {
    title: { en: "Privacy Policy", "pt-br": "Política de Privacidade" },
    sections: [
      { h: { en: "Who we are", "pt-br": "Quem somos" }, p: { en: "Rio Sun Massage Therapy, operating from a treatment room within Cullinan Clinic, 659 Fulham Road, London SW6 5PY. [Legal entity and contact details to be confirmed.]", "pt-br": "Rio Sun Massage Therapy, que atende numa sala dentro da Cullinan Clinic, 659 Fulham Road, London SW6 5PY. [Razão social e contatos a confirmar.]" } },
      { h: { en: "Bookings", "pt-br": "Agendamentos" }, p: { en: "Bookings are made on Fresha or Treatwell. These platforms process your booking and payment data under their own privacy policies.", "pt-br": "Os agendamentos são feitos no Fresha ou no Treatwell. Essas plataformas tratam seus dados de agendamento e pagamento conforme suas próprias políticas de privacidade." } },
      { h: { en: "This website", "pt-br": "Este site" }, p: { en: "This website does not collect personal data through forms. [Analytics provider, if any, to be confirmed.]", "pt-br": "Este site não coleta dados pessoais por formulários. [Ferramenta de análise, se houver, a confirmar.]" } },
      { h: { en: "Your rights", "pt-br": "Seus direitos" }, p: { en: "Under UK GDPR you may request access to, correction or deletion of your personal data. [Contact to be confirmed.]", "pt-br": "Pelo UK GDPR, você pode solicitar acesso, correção ou exclusão dos seus dados pessoais. [Contato a confirmar.]" } },
    ],
  },
  cookies: {
    title: { en: "Cookie Policy", "pt-br": "Política de Cookies" },
    sections: [
      { h: { en: "Essential storage", "pt-br": "Armazenamento essencial" }, p: { en: "We store your language preference in your browser. This is not used for tracking.", "pt-br": "Guardamos sua preferência de idioma no navegador. Isso não é usado para rastreamento." } },
      { h: { en: "Third-party content", "pt-br": "Conteúdo de terceiros" }, p: { en: "The Google map on the Visit page only loads when you choose to load it, and may set cookies from Google.", "pt-br": "O mapa do Google na página Visite só é carregado quando você escolhe, e pode definir cookies do Google." } },
    ],
  },
  terms: {
    title: { en: "Terms & Booking", "pt-br": "Termos & Agendamentos" },
    sections: [
      { h: { en: "Bookings and payments", "pt-br": "Agendamentos e pagamentos" }, p: { en: "Bookings, payments, cancellations and refunds follow the policy shown on Fresha or Treatwell at the time of booking.", "pt-br": "Agendamentos, pagamentos, cancelamentos e reembolsos seguem a política exibida no Fresha ou no Treatwell no momento da reserva." } },
      { h: { en: "Health information", "pt-br": "Informações de saúde" }, p: { en: "Our treatments do not replace medical advice. Please tell us about pregnancy, recent surgery or any medical condition before your session.", "pt-br": "Nossos tratamentos não substituem orientação médica. Informe-nos sobre gestação, cirurgia recente ou qualquer condição médica antes da sessão." } },
      { h: { en: "Prices", "pt-br": "Preços" }, p: { en: "Prices shown on this website are for guidance. The price confirmed on the booking platform applies.", "pt-br": "Os preços exibidos neste site são indicativos. Vale o preço confirmado na plataforma de agendamento." } },
    ],
  },
};
