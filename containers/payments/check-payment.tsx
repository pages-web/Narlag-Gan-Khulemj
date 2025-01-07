import { Button } from '@/components/ui/button';
import { LoadingIcon } from '@/components/ui/loading';
import { useCheckInvoice } from '@/sdk/hooks/payment';
import { toast } from 'sonner';
import { getLabel } from '@/lib/utils';

const CheckPayment = ({ id, disabled }: { id: string; disabled?: boolean }) => {
  const { checkInvoice, loading } = useCheckInvoice();
  return (
    <Button
      size="lg"
      className="flex-auto w-full absolute bottom-1 left-0"
      disabled={disabled || loading}
      onClick={() =>
        checkInvoice({
          variables: { id },
          onCompleted({ invoicesCheck }) {
            toast.info(getLabel(invoicesCheck));
          },
        })
      }
    >
      {loading && <LoadingIcon />}
      {'Төлбөрийг шалгах'}
    </Button>
  );
};

export default CheckPayment;
