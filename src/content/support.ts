export const supportText = {
  title: "Ajuda",
  description: "Perguntas frequentes e um canal para enviar sua dúvida.",
  faqTitle: "Perguntas frequentes",
  form: {
    title: "Fale com a gente",
    subject: "Assunto",
    message: "Mensagem",
    send: "Enviar",
    sent: "Mensagem registrada. Ela fica salva neste navegador.",
    missingFields: "Preencha assunto e mensagem.",
  },
  tickets: { title: "Suas mensagens", empty: "Você ainda não enviou nenhuma mensagem." },
};

export const faq = [
  {
    question: "De onde vêm as cotações?",
    answer: "Da API pública da CoinGecko, atualizada a cada minuto. Os valores são em dólar (USD).",
  },
  {
    question: "As compras e vendas usam dinheiro real?",
    answer: "Não. Tudo é uma simulação com saldo fictício (padrão de US$ 10.000, ajustável em Configurações), pensada para aprender sem risco.",
  },
  {
    question: "Onde ficam meus dados?",
    answer: "Apenas neste navegador (localStorage). Você pode exportar ou apagar tudo em Configurações.",
  },
  {
    question: "Como favoritar uma moeda?",
    answer: "Clique na estrela no Dashboard ou em Tendências. As favoritas aparecem em Favoritos.",
  },
  {
    question: "Posso usar isso como recomendação de investimento?",
    answer: "Não. O FinanceFlow é educativo e não oferece aconselhamento financeiro.",
  },
];
