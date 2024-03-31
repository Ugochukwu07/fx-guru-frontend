import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  name: Yup.string().required('Fullname is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .min(5, 'Email must be at least 5 characters'),
  username: Yup.string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters'),
  ref_code: Yup.string()
    .matches(/^\S+$/, 'This field cannot contain spaces')
    .min(5, 'Referral Code must be at least 5 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Za-z])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Password must contain at least one letter'
    ),
  password_confirmation: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const loginSchema = Yup.object().shape({
  user_id: Yup.number().required('User ID is required'),
  username: Yup.string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Za-z])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Password must contain at least one letter'
    ),
});
