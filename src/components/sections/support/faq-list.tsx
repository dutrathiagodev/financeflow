import { faq, supportText } from "@/content/support";

export function FaqList() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-medium">{supportText.faqTitle}</h2>
      {faq.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-line bg-panel px-5 py-4 transition-colors open:border-line-strong"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg">
            {item.question}
            <span aria-hidden="true" className="text-ink-muted transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-ink-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
