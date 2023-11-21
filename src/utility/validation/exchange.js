import * as Yup from 'yup';

export const exchangeSchema = Yup.object().shape({
  mode: Yup.number().required('Transaction mode is required'),
  price: Yup.number().required('Price is required'),
  number: Yup.number().required('Amount is required'),
});