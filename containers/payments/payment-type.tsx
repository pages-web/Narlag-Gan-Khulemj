import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const PaymentType = ({
  selected,
  value,
  children,
  name,
}: React.PropsWithChildren<{
  selected: boolean;
  value: string;
  name: string;
}>) => {
  return (
    <FormItem className="relative">
      <Button
        variant="outline"
        className={cn(
          'h-auto flex-col items-center md:items-start pt-5 pb-4 pl-6 gap-1 group w-full border-2 border-border/10 shadow-md ease-in duration-100 transition-colors relative',
          selected && 'bg-primary/10 hover:bg-primary/10  border-primary'
        )}
        asChild
      >
        <div>
          <FormControl>
            <RadioGroupItem
              value={value}
              id={value}
              className={cn(
                'absolute right-5 top-5 h-6 w-6 border-2 shadow-none hidden md:inline-flex',
                selected && 'border-primary'
              )}
            />
          </FormControl>

          {children}
          <div className="flex-auto text-left">
            <div className={'font-medium capitalize text-black'}>{name}</div>
          </div>
          <FormLabel
            className={cn('absolute inset-0 rounded-2xl cursor-pointer')}
            htmlFor={value}
          />
        </div>
      </Button>
    </FormItem>
  );
};

export default PaymentType;
