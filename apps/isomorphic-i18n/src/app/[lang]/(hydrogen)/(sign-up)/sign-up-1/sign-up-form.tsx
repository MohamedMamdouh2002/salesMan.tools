'use client';

import Link from 'next/link';
import { CSSProperties, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password, Checkbox, Button, Input, Text } from 'rizzui';
import { Form } from '@ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/validators/signup.schema';
import { useTranslation } from '@/app/i18n/client';
import ClipLoader from 'react-spinners/ClipLoader';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
  isAgreed: false,
};
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "green",
};
export default function SignUpForm({lang}:{lang:string}) {
  const [reset, setReset] = useState({});
  const {t}=useTranslation(lang!,'auth')
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function sendData(data: SignUpSchema) {
    setLoading(true); // تعيين حالة التحميل إلى true عند بدء الطلب
    try {
      const response = await fetch('https://salesman.ordrat./api/Auth/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
        }),
      });

      if (response.ok) {
        setLoading(false); 
        const result = await response.text();

        toast.success(t('auth-success-signup'))
        setReset({ ...initialValues, isAgreed: false });
        console.log('Success:', result);
        router.push('/signin');
      } else{ 
        setLoading(false); 
        toast.error(t('Failed to register'))
        
        throw new Error('Failed to register');

      }

    } catch (error) {
      setLoading(false);

      console.error('Error:', error);
    }
  }

   const  onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    console.log(data);
    sendData(data)
  };

  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
            <Input
              type="text"
              size="lg"
              label={t('auth-firstName')}
              placeholder={t('auth-firstName-ph')}
              className="[&>label>span]:font-medium [&>label>span]:dark:text-white  [&>label>span]:text-black"
              inputClassName="text-sm"
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              type="text"
              size="lg"
              label={t('auth-lastName')}
              placeholder={t('auth-lastName-ph')}
              className="[&>label>span]:font-medium [&>label>span]:dark:text-white  [&>label>span]:text-black"
              inputClassName="text-sm"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
            <Input
              type="text"
              size="lg"
              label={t('auth-phoneNumber')}
              placeholder={t('auth-phoneNumber-ph')}
              className="col-span-2 [&>label>span]:font-medium [&>label>span]:dark:text-white  [&>label>span]:text-black"
              inputClassName="text-sm"
              {...register('phoneNumber')}
              error={errors.phoneNumber?.message}
            />
            <Input
              type="email"
              size="lg"
              label={t('auth-email')}
              placeholder={t('auth-email-ph')}
              className="col-span-2 [&>label>span]:font-medium [&>label>span]:dark:text-white  [&>label>span]:text-black"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label={t('auth-password1')}
              placeholder={t('auth-password1-ph')}
              size="lg"
              className="col-span-2 [&>label>span]:font-medium [&>label>span]:dark:text-white  [&>label>span]:text-black"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            {/* <Password
              label={t('auth-password1')}
              placeholder={t('auth-password1-ph')}
              size="lg"
              className="[&>label>span]:font-medium [&>label>span]:dark:text-white  [&>label>span]:text-black"
              inputClassName="text-sm"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            /> */}
            <div className="col-span-2 flex items-start ">
              {/* <Checkbox
                {...register('isAgreed')}
                className="[&>label>span]:font-medium [&>label]:items-start"
                label={
                  <>
                    By signing up you have agreed to our{' '}
                    <Link
                      href="/"
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Terms
                    </Link>{' '}
                    &{' '}
                    <Link
                      href="/"
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </>
                }
              /> */}
            </div>
            <Button className="col-span-2 mt-2 w-full bg-black dark:bg-white hover:bg-black dark:hover:bg-white " disabled={loading} type="submit" size="lg">
            {loading ? (
              <ClipLoader
              loading={loading}
              cssOverride={override}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />

            ) : (
                <>
                  <span className='text-white dark:text-black'>{t('auth-sign-up')}</span>{' '}
                  <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5 text-white dark:text-black" />
                </>
          )}
              
            </Button>
            {/* <Button size="lg" type="submit" className="col-span-2 mt-2 bg-black dark:bg-white hover:bg-black dark:hover:bg-white ">
              <span className='text-white'>{t('auth-sign-up')}</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button> */}
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        {t('auth-dont-have-an-account')}{' '}
        <Link
          href={routes.signIn}
          className="font-semibold text-black dark:text-white transition-colors"
        >
         {t('auth-sign-in')}
        </Link>
      </Text>
    </>
  );
}
