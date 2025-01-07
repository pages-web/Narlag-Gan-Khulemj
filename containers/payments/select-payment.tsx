import { RadioGroup } from '@/components/ui/radio-group';
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import {
  handleMethodAtom,
  openDetailAtom,
  openMethodsAtom,
} from '@/store/payment.store';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import {
  CreditCardIcon,
  FileText,
  LandmarkIcon,
  QrCodeIcon,
  Wallet2Icon,
  XIcon,
} from 'lucide-react';
import PaymentType from './payment-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useDetail } from '@/components/order-detail/order-detail';
import { usePaymentConfig } from '@/sdk/queries/payment';
import Image from 'next/image';
import { Loading, LoadingIcon } from '@/components/ui/loading';
import { usePay } from '@/sdk/hooks/payment';

const FormSchema = z.object({
  type: z.string({
    required_error: 'You need to select a payment type.',
  }),
});

const nonMobile = ['cash', 'account', 'card', 'invoice'];

const SelectPayment = () => {
  const [open, setOpen] = useAtom(openMethodsAtom);
  const setOpenDetail = useSetAtom(openDetailAtom);
  const selectPayment = useSetAtom(handleMethodAtom);
  const { billType } = useDetail();
  const { loading, payments } = usePaymentConfig();
  const { handlePay, loading: paying } = usePay();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const type = form.watch('type');

  function onSubmit({ type }: z.infer<typeof FormSchema>) {
    setOpen(false);
    if (nonMobile.includes(type)) {
      return handlePay({ type });
    }
    selectPayment(type);
    setOpenDetail(true);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="bottom"
        className="md:h-[95vh] md:max-h-[768px] rounded-t-2xl"
      >
        <div className="relative">
          <SheetClose asChild>
            <Button
              className="absolute right-0 md:right-5 -top-1 rounded-full"
              variant="non"
              size="icon"
            >
              <XIcon className="h-[1.125rem] w-[1.125rem]" />
            </Button>
          </SheetClose>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container max-w-5xl px-0"
          >
            <h2 className="font-semibold md:text-xl text-black/80 mb-4">
              {'Төлбөрийн төрлөө сонгоно уу'}
            </h2>
            {loading ? (
              <Loading className="pt-32" />
            ) : (
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <PaymentType
                              value="account"
                              name="Банкны данс"
                              selected={type === 'account'}
                            >
                              <LandmarkIcon />
                            </PaymentType>                
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <Button
              className="w-full mt-8 font-semibold"
              size="lg"
              type="submit"
              disabled={paying}
              variant="non"
            >
              {paying && <LoadingIcon />}
              Төлбөр
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SelectPayment;
