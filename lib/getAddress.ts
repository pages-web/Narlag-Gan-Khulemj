// import districts from '@/lib/address.json';

// export const getSubdistrict = ({
//   district,
//   subdistrict,
// }: {
//   district?: string;
//   subdistrict?: string;
// }) =>
//   districts
//     .find((d) => d.id === district)
//     ?.subdistricts.find((sd) => `${sd.id}-${sd.mn}` === subdistrict);

// export const getCharge = ({
//   district,
//   subdistrict,
//   totalAmount,
// }: {
//   district?: string;
//   subdistrict?: string;
//   totalAmount: number;
// }) => {
//   const { below, charge } = getSubdistrict({ district, subdistrict }) || {};
  
//   const deliveryFee = (!below || below > totalAmount) ? charge : 0;
  
//   return deliveryFee;
// };
