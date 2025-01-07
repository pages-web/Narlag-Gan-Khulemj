import { gql } from '@apollo/client';

const createInvoice = gql`
  mutation InvoiceCreate(
    $amount: Float!
    $phone: String
    $email: String
    $description: String
    $customerId: String
    $customerType: String
    $contentType: String
    $contentTypeId: String
    $redirectUri: String
    $paymentIds: [String]
    $data: JSON
  ) {
    invoiceCreate(
      amount: $amount
      phone: $phone
      email: $email
      description: $description
      customerId: $customerId
      customerType: $customerType
      contentType: $contentType
      contentTypeId: $contentTypeId
      redirectUri: $redirectUri
      paymentIds: $paymentIds
      data: $data
    ) {
      _id
      invoiceNumber
      amount
      remainingAmount
      phone
      email
      description
      status
      data
      contentTypeId
      transactions {
        _id
        paymentId
        paymentKind
        status
        details
        response
      }
    }
  }
`;

export const addTransaction = gql`
  mutation TransactionsAdd(
    $invoiceId: String!
    $paymentId: String!
    $amount: Float!
    $details: JSON
  ) {
    paymentTransactionsAdd(
      invoiceId: $invoiceId
      paymentId: $paymentId
      amount: $amount
      details: $details
    ) {
      _id
      amount
      invoiceId
      paymentId
      paymentKind
      status
      response
      details
    }
  }
`;

const checkInvoice = gql`
  mutation InvoicesCheck($id: String!) {
    invoicesCheck(_id: $id)
  }
`;
const ordersAddPayment = gql`
  mutation ordersAddPayment(
    $_id: String!
    $cashAmount: Float
    $paidAmounts: [PaidAmountInput]
  ) {
    ordersAddPayment(
      _id: $_id
      cashAmount: $cashAmount
      paidAmounts: $paidAmounts
    ) {
      _id
    }
  }
`;

const ordersSettlePayment = gql`
  mutation ordersSettlePayment(
    $_id: String!
    $billType: String!
    $registerNumber: String
  ) {
    ordersSettlePayment(
      _id: $_id
      billType: $billType
      registerNumber: $registerNumber
    ) {
      status
      message
    }
  }
`;

const mutations = { createInvoice, 
  checkInvoice, 
  addTransaction,  
  ordersAddPayment,
  ordersSettlePayment, 
};

export default mutations;
