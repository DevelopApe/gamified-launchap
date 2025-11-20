import { AmbientColor } from '@/components/decorations/ambient-color';
import { Register } from '@/components/register';

// Accept permissive params typing to satisfy Next's generated PageProps checks
export default function RegisterPage({ params }: { params: any }) {
  const locale: string | undefined = params?.locale;

  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <Register locale={locale} />
    </div>
  );
}
