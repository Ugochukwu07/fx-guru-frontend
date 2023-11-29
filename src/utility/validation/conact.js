import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string()
            .email('Invalid email format')
            .required('Email is required')
            .min(5, 'Email must be at least 5 characters'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });