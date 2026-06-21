import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "How does the AI documentation engine work?",
      answer: "Lumina AI analyzes your commit history and code context to generate documentation that aligns with your team's specific style guidelines. It supports 40+ programming languages and integrates directly into your PR workflow."
    },
    {
      question: "Is my source code secure?",
      answer: "Yes. Lumina AI uses enterprise-grade encryption. Your code is never used to train global models; we use isolated fine-tuning for your workspace only. We are SOC2 Type II and GDPR compliant."
    },
    {
      question: "Can I host Lumina on-premise?",
      answer: "Absolutely. For enterprise customers, we offer a self-hosted option via Docker or Kubernetes. Contact our sales team for custom licensing."
    },
    {
      question: "What integrations do you support?",
      answer: "We support Jira, Slack, GitHub, GitLab, Bitbucket, Confluence, and linear. We also provide a full REST and GraphQL API for custom integrations."
    },
    {
      question: "Do you offer a free trial?",
      answer: "We offer a 14-day full-feature trial for teams up to 25 members. No credit card is required to sign up."
    }
  ];

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
            Common Questions
          </h2>
          <p className="text-zinc-600">
            Everything you need to know about the Lumina platform.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-zinc-100">
              <AccordionTrigger className="text-left font-semibold text-zinc-900 hover:text-emerald-600 hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-600 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
