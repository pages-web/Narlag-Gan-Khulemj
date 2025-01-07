import { Button } from '@/components/ui/button';
import { openMethodsAtom } from '@/store/payment.store';
import { useAtom, useSetAtom } from 'jotai';
import SelectPayment from './select-payment';
import Success from './success';
import NonMobile from './nonMobile';
import PaymentDetailDialog from './payment-detail-dialog';
import { useDetail } from '@/components/order-detail/order-detail';
import { useEffect } from 'react';
import { openNonMobileAtom } from '@/store/payment.store';

const BuyButton = () => {
  const setOpenMethods = useSetAtom(openMethodsAtom);
  const { paidDate, paidAmounts, cashAmount } = useDetail();
  const openNonMobile = useSetAtom(openNonMobileAtom);

  const handlePay = () => {
    if (!paidDate) {
      return setOpenMethods(true);
    }
    openNonMobile(true);
  };

  useEffect(() => {
    handlePay();
  }, [paidDate]);

  const type = (paidAmounts || [])[0]?.type;

  if (cashAmount) {
    return null;
  }

  const getButtonTitle = () => {
    return ('Банкны данс харах');
  };

  return (
    <>
      <Button size="lg" variant="non" className="md:h-12 md:px-8" onClick={handlePay}>
        {getButtonTitle()}
      </Button>
      <SelectPayment />
      <PaymentDetailDialog />
      <NonMobile />
      <Success />
    </>
  );
};

export default BuyButton;
