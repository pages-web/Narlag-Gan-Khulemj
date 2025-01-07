import { useDetail } from '@/components/order-detail/order-detail';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { openNonMobileAtom } from '@/store/payment.store';
import { useAtom } from 'jotai';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
// import { PDFViewer } from '@react-pdf/renderer';
import Accounts from './accounts';

const NonMobile = () => {
  const [open, setOpen] = useAtom(openNonMobileAtom);
  const detail = useDetail();
  const { type } =
    (detail.paidAmounts || [])[0] ||
    ((detail?.cashAmount || 0) > 0 ? { type: 'cash' } : {});

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          'sm:max-w-xl sm:rounded-2xl',
          type === 'invoice' && 'sm:max-w-3xl sm:max-h-screen w-full'
        )}
      >
        {['cash', 'card'].includes(type || '') && (
          <div className="flex flex-col items-center py-6">
            <div className="h-16 w-16 rounded-full bg-green-200 flex items-center justify-center">
              <CheckIcon
                className="h-10 w-10 stroke-green-700 "
                strokeWidth={2.5}
              />
            </div>
            <div className="md:text-lg font-bold pt-6 text-center text-neutral-700">
              Таны захиалга амжилттай бүртгэгдлээ
            </div>
            <div className="text-neutral-500 pt-2 font-medium text-center">
              {(
                'Манай хүргэлтийн ажилтантай тооцоогоо хийнэ үү'
              )}
            </div>
            <Button
              className="px-12 mt-4"
              variant="outline"
              size="lg"
              onClick={() => {
                setOpen(false);
              }}
            >
              {('Дуусгах')}
            </Button>
          </div>
        )}
        <Accounts />
      </DialogContent>
    </Dialog>
  );
};

export default NonMobile;
