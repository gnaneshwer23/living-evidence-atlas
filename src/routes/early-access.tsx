import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, meta } from "@/components/site/ui";
import { EarlyAccessForm } from "@/components/site/EarlyAccessForm";

export const Route = createFileRoute("/early-access")({
  head: () =>
    meta(
      "Early Access & Pilots — HSI",
      "Apply for early access, research collaboration or an institutional pilot with HSI.",
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Early Access"
        title="Help shape the future of scientific intelligence."
        intro="Join early access, become a research collaborator, or discuss an institutional pilot. We are looking for partners to help validate HSI rigorously."
      />
      <Section eyebrow="Application" title="Tell us about your research.">
        <EarlyAccessForm />
      </Section>
    </>
  );
}
