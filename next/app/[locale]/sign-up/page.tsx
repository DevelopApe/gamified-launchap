import { AmbientColor } from '@/components/decorations/ambient-color';
import { Register } from '@/components/register';

export default function RegisterPage({locale}: {locale?: string}) {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <Register locale={locale}/>
    </div>
  );
}
