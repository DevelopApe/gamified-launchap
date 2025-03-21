import { AmbientColor } from "@/components/decorations/ambient-color";
import ParticleBackground from "../../../components/decorations/particle-background";
import { Register } from "@/components/register";

export default function GamificationPage({locale}: {locale?: string}) {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <ParticleBackground />
      <Register locale={locale} />
    </div>
  );
}
