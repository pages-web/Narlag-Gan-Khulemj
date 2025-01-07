import { type OperationVariables, useMutation } from "@apollo/client";
import { mutations } from "../graphql/payment";
import { useDetail } from "@/components/order-detail/order-detail";
import { useAtomValue, useSetAtom } from "jotai";
import { onError } from "@/lib/utils";
import { configAtom } from "@/store/auth.store";
import { handleMethodAtom, invoiceDetailAtom, openNonMobileAtom, selectedMethodAtom } from "@/store/payment.store";

const useCreateInvoice = ({ appToken, posName }: { appToken: string; posName: string }) => {
  const context = {
    headers: {
      "erxes-app-token": appToken,
    },
  };
  const { paymentIds } = useAtomValue(configAtom) || {};
  const { totalAmount, _id, customerId, customerType, number, deliveryInfo } = useDetail();
  const setInvoice = useSetAtom(invoiceDetailAtom);

  const [createInvoice, { reset, data, loading }] = useMutation(mutations.createInvoice, {
    onCompleted(data) {
      setInvoice(data?.invoiceCreate);
    },
    context,
    onError,
  });
  let tax = (totalAmount / 100) * 1;

  const handleCreateInvoice = (variables?: OperationVariables) =>
    createInvoice({
      variables: {
        amount: totalAmount,
        contentType: "pos:orders",
        contentTypeId: _id,
        customerId: customerId || "empty",
        customerType: customerType || "customer",
        description: ` ${posName.toUpperCase()}- ${number} - Charge : ${tax}MNT`,
        data: { posToken: process.env.NEXT_PUBLIC_POS_TOKEN },
        paymentIds,
        phone: deliveryInfo?.phone,
        ...variables,
      },
    });

  const { invoiceCreate } = data || {};

  return { loading, reset, data: invoiceCreate, handleCreateInvoice };
};

export const useCreateInvoiceNew = () => {
  const { paymentIds, erxesAppToken, name } = useAtomValue(configAtom) || {};

  const context = {
    headers: {
      "erxes-app-token": erxesAppToken,
    },
  };

  const selectedMethod = useAtomValue(handleMethodAtom);
  const { totalAmount, _id, customerId, customerType, number, deliveryInfo } = useDetail();

  const [addTransaction, { loading: addingTransaction, data: transactionData }] = useMutation(mutations.addTransaction);

  const [createInvoice, { reset, loading, data }] = useMutation(mutations.createInvoice, {
    context,
    onError,
  });

  let tax = (totalAmount / 100) * 1;
  const handleCreateInvoice = (variables?: OperationVariables) =>
    createInvoice({
      variables: {
        amount: totalAmount,
        contentType: "pos:orders",
        contentTypeId: _id,
        customerId: customerId || "empty",
        customerType: customerType || "customer",
        description: `${name}- ${number} - Charge : ${tax}MNT`,
        data: { posToken: process.env.NEXT_PUBLIC_POS_TOKEN },
        paymentIds,
        phone: deliveryInfo?.phone,
        ...variables,
      },
      onCompleted({ invoiceCreate }) {
        addTransaction({
          variables: {
            invoiceId: invoiceCreate?._id,
            paymentId: selectedMethod,
            amount: invoiceCreate?.amount,
            details: {
              phone: variables?.phone,
            },
          },
        });
      },
    });

  const { paymentTransactionsAdd } = transactionData || {};

  return {
    loading: loading || addingTransaction,
    reset,
    data: paymentTransactionsAdd,
    handleCreateInvoice,
    invoiceId: data?.invoiceCreate?._id,
  };
};

export const useCheckInvoice = () => {
  const [checkInvoice, { data, loading }] = useMutation(mutations.checkInvoice);

  const { invoiceCheck } = data || {};

  return { loading, checkInvoice, status: invoiceCheck };
};

export const usePay = () => {
  const { _id, totalAmount } = useDetail();
  const setPayment = useSetAtom(selectedMethodAtom);
  const openNonMobile = useSetAtom(openNonMobileAtom);
  const [addPayment, { loading }] = useMutation(mutations.ordersAddPayment, {
    onError,
  });
  const [settlePayment, { loading: settling }] = useMutation(mutations.ordersSettlePayment, {
    onError,
    refetchQueries: ["OrderDetail"],
  });

  const handlePay = ({ type }: { type: string }) => {
    let variables: any = { _id };
    if (type === "cash") {
      variables = { ...variables, cashAmount: totalAmount };
    } else {
      variables = { ...variables, paidAmounts: paidAmounts(type, totalAmount) };
    }

    addPayment({
      variables,
      onCompleted() {
        settlePayment({
          variables: {
            _id,
            billType: "-9",
          },
          onCompleted() {
            setPayment(type);
            type !== "invoice" && openNonMobile(true);
          },
        });
      },
    });
  };

  return {
    loading: loading || settling,
    handlePay,
  };
};

export const paidAmounts = (type: string, amount: number, info?: any) => [
  {
    _id: Math.random().toString(),
    amount,
    type,
    info,
  },
];

export default useCreateInvoice;
