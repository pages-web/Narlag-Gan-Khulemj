export const getProductNameCode = (productName?: string) => {
    const arr = (productName || '').split(' - ');
    return {
      name: arr.length === 2 ? arr[1] : productName,
      code: arr.length === 2 ? arr[0] : '',
    };
  };
  