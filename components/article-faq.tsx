export function ArticleFaq({ items }: { items: { question: string; answer: string }[] }) {
  return <section className="article-faq" aria-labelledby="article-faq-title"><h2 id="article-faq-title">FAQ</h2>{items.map((item) => <div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</section>;
}
