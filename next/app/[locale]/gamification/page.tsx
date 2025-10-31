import { AmbientColor } from "@/components/decorations/ambient-color";
import ParticleBackground from "../../../components/decorations/particle-background";
import { Register } from "@/components/register";

// For a dynamic segment ([locale]) Next provides a `params` object to the page
// signature: ({ params }) where params.locale is the route param. Accept that
// shape so TypeScript/Next's app router accepts the default export.
// Use a permissive type for `params` to satisfy Next's generated PageProps
// checks (some Next versions generate types that expect Promise-like shapes).
export default function GamificationPage({ params }: { params: any }) {
  const locale: string | undefined = params?.locale;

  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <ParticleBackground />
      <Register locale={locale} />
    </div>
  );
}
