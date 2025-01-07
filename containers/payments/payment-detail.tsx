import { DialogHeader } from '@/components/ui/dialog';
import { useCreateInvoiceNew } from '@/sdk/hooks/payment';
import { usePaymentConfig } from '@/sdk/queries/payment';
import {
  handleCompleteAtom,
  handleMethodAtom,
  openDetailAtom,
} from '@/store/payment.store';
import { IPayment } from '@/types/payment.types';
import { useAtomValue, useSetAtom } from 'jotai';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import QrDetail, { QrContainer } from './qr-detail';
import PhoneDetail from './phone-detail';
import { Loading } from '@/components/ui/loading';
import { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { subscriptions } from '@/sdk/graphql/payment';

const QR_PAYMENTS = ['qpay', 'monpay', 'pocket', 'qpayQuickqr'];
const PHONE_PAYMENTS = ['socialpay', 'storepay'];

const PaymentDetail = () => {
  const open = useAtomValue(openDetailAtom);
  const selectedMethod = useAtomValue(handleMethodAtom);
  const { payments, loading } = usePaymentConfig();
  const kind = payments?.find((p: IPayment) => p._id === selectedMethod)?.kind;

  const isQr = QR_PAYMENTS.includes(kind || '');
  const isPhone = PHONE_PAYMENTS.includes(kind || '');
  const onCompleted = useSetAtom(handleCompleteAtom);

  const {
    handleCreateInvoice,
    data,
    loading: creating,
    invoiceId,
  } = useCreateInvoiceNew();

  useSubscription(subscriptions.invoice, {
    variables: { invoiceId },
    skip: !invoiceId,
    onData(options) {
      const { invoiceUpdated } = options.data.data || {};
      if (invoiceUpdated?.status === 'paid') {
        onCompleted();
      }
    },
  });

  const { status, response, _id } = data || {};

  useEffect(() => {
    if (!isPhone && selectedMethod && open) {
      handleCreateInvoice();
    }
  }, [selectedMethod]);

  return (
    <>
      <DialogHeader className="flex-row gap-4 items-center justify-between my-2 md:mt-0">
        <div className="flex items-center gap-4">
          <Image
            src={`/images/payments/${kind}.png`}
            alt=""
            className="object-contain rounded-lg flex-none"
            height={36}
            width={36}
          />
          <div className="text-left">
            <div className="font-medium capitalize leading-none mb-0.5">
              {kind}
            </div>
            <div className="text-neutral-500 text-xs md:text-md">
              {isQr
                ? ('Qr кодыг уншуулж төлбөрөө төлнө үү')
                : ('Бүртгэлтэй утасны дугаараа оруулна уу')}
            </div>
          </div>
        </div>
        {!creating && !!status && (
          <Badge
            variant="outline"
            className="p-2 px-4 rounded-xl bg-yellow-100, border-amber-200 text-yellow-500"
          >
            {status}
          </Badge>
        )}
      </DialogHeader>
      {isQr &&
        (creating ? (
          <QrContainer loading />
        ) : (
          (!!response?.qrData || (isQr && response?.error)) && (
            <QrDetail
              errorDescription={response?.error}
              status={status}
              qrCode={response?.qrData}
              urls={response?.urls}
              id={_id}
            />
          )
        ))}
      {isPhone && (
        <PhoneDetail
          kind={kind}
          loading={loading}
          handleCreate={({ phone }) => handleCreateInvoice({ phone })}
          data={data}
        />
      )}

      {creating && <Loading className="absolute inset-0 bg-background/40" />}
    </>
  );
};

export default PaymentDetail;
