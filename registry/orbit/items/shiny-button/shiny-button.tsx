import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ShinyButton({
  className,
  text = 'Create My Account',
}: {
  className?: string;
  text?: string;
}) {
  return (
    <Button
      className={cn(
        'bg-primary text-primary-foreground mt-7 w-full transform cursor-pointer rounded-lg py-3 text-sm font-semibold shadow-[inset_0_-4px_6px_1px_rgba(255,255,255,0.3),inset_0_6px_4px_0_rgba(255,255,255,0.3)] transition-all duration-200 ease-out hover:scale-101 hover:shadow-[inset_0_-4px_6px_1px_rgba(255,255,255,0.4),inset_0_6px_4px_0_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.15)] hover:brightness-110 active:scale-100 active:brightness-100',
        className,
      )}
    >
      {text}
    </Button>
  );
}

export default ShinyButton;
