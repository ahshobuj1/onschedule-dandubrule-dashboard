/* eslint-disable @typescript-eslint/no-explicit-any */

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router';
import toast from 'react-hot-toast';
import {loginFormSchema, type LoginFormData} from './type';
// import {useLoginMutation} from '@/features/auth/authApi';

export const useLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [login, {isLoading, isSuccess, isError, error}] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    trigger,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange', // better UX: validate on onChange
    defaultValues: {
      email: 'super@gmail.com',
      password: 'superAdmin@123',
      terms: true, // pre-checked
    },
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const termsValue = watch('terms');

  const onSubmit = async (values: LoginFormData) => {
    try {
      console.log(values);
      toast.success('Login successful! Redirecting...');

      setTimeout(() => {
        navigate('/dashboard', {replace: true});
      }, 500);

      // const res = await login(values).unwrap();
      // console.log('Login success:', res);
      // if (res.success) {
      //   toast.success('Login successful! Redirecting...');
      //   setTimeout(() => {
      //     navigate('/dashboard', {replace: true});
      //   }, 500);
      // }
    } catch (err: any) {
      const message = err?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    }
  };

  // Helper to safely update terms + trigger validation
  const handleTermsChange = (checked: boolean) => {
    setValue('terms', checked, {shouldValidate: true});
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    // isLoading,
    // isSuccess,
    // isError,
    // error: error as any,
    showPassword,
    togglePasswordVisibility,
    setValue, // Now available!
    trigger, // For manual validation
    terms: termsValue, // Current value of checkbox
    handleTermsChange, // Recommended way to handle checkbox
  };
};
