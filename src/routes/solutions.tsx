import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, meta } from "@/components/site/ui";
import { PersonaTabs } from "@/components/site/Interactive";

export const Route = createFileRoute("/solutions")({
  head: () => meta("Solutions — HSI", "How HSI supports students, postdocs, PIs, departments, biotech and pharma R&D, and translational researchers."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Solutions" title="Value for every research user." intro="From a student's first literature review to an R&D team's target decision, HSI adapts to role, scope and permissions." />
      <Section eyebrow="Filter by role" title="Choose your perspective."><PersonaTabs /></Section>
    </>
  );
}
