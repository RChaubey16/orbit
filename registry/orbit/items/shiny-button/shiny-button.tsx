import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ShinyButton({
  className,
  text = 'Get Started',
}: {
  className?: string;
  text?: string;
}) {
  return (
    <Button
      className={cn(
        'bg-primary text-primary-foreground mt-7 w-full max-w-[320px] transform cursor-pointer rounded-lg py-3 text-sm font-semibold shadow-[inset_0_-4px_6px_1px_rgba(255,255,255,0.3),inset_0_6px_4px_0_rgba(255,255,255,0.3)] transition-all duration-200 ease-out',
        className,
      )}
    >
      {text}
    </Button>
  );
}

export default ShinyButton;
