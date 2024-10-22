'use client';

import Link from 'next/link';
import { useState ,CSSProperties } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { Form } from '@ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import { useTranslation } from '@/app/i18n/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";

// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

const initialValues: LoginSchema = {
  email: '',
  password: '',
  // rememberMe: true,
};
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "green",
};
export default function SignInForm({lang}:{lang:string}) {
  //TODO: why we need to reset it here
  const {t}=useTranslation(lang!,'auth')
  const router = useRouter(); 
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  
  async function sendData(data: LoginSchema) {
    setLoading(true); // تعيين حالة التحميل إلى true عند بدء الطلب
    try {
        const response = await fetch('https://salesman.ordrat.com/api/Auth/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        });

        if (!response.ok) {
            toast.error(t('auth-error'));
            setLoading(false); // إلغاء التحميل عند حدوث خطأ
            throw new Error('Failed to register');
        }

        const result = await response.json();
        console.log('Success:', result);
        const name = localStorage.getItem('firstName');

        if (result?.refreshToken) {
            localStorage.setItem('accessToken', result?.accessToken);
            localStorage.setItem('email', result?.email);
            localStorage.setItem('firstName', result?.firstName);
            localStorage.setItem('lastName', result?.lastName);
            localStorage.setItem('refreshToken', result?.refreshToken);
            if (result.roles && Array.isArray(result.roles)) {
              localStorage.setItem('roles', JSON.stringify(result?.roles));
            }
        } else {
            console.log('Access Token not found.');
        }

        if (result?.roles?.includes('Admin')) {
            router.push('/');
        } else {
            console.log('User is not an Admin');
            router.push('/');
        }

    } catch (error) {
        console.error('Error:', error);
        setLoading(false);
    }
}

  const  onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log(data);
    sendData(data)
    // signIn('credentials', {
    //   ...data,
    // });
  };


  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
           <Input
            type="email"
            size="lg"
            label={t('auth-email')}
            placeholder={t('auth-email-ph')}
            className="[&>label>span]:font-medium [&>label>span]:dark:text-white  [&>label>span]:text-black"
            inputClassName="text-sm text-black dark:text-white dark:placeholder:text-white placeholder:text-gray-500"
            {...register('email')}
            error={errors.email?.message}
          />

          {/* <style jsx global>{`
            input:-webkit-autofill {
              color: black !important;
              background-color: transparent !important;
              -webkit-text-fill-color: black !important;
              transition: background-color 5000s ease-in-out 0s;
            }

            .dark input:-webkit-autofill {
              color: white !important;
              background-color: transparent !important;
              -webkit-text-fill-color: white !important;
            }
          `}</style> */}
            <Password
              label={t('auth-password1')}
              placeholder={t('auth-password1-ph')}
              size="lg"
              className="[&>label>span]:font-medium [&>label>span]:dark:text-white  [&>label>span]:text-black dark:placeholder:text-white"
              inputClassName="text-sm text-black dark:text-white "
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              {/* <Checkbox
                {...register(t('auth-remember-me'))}
                label="Remember Me"
                className="[&>label>span]:font-medium"
              /> */}
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-black dark:text-white underline transition-colors  hover:no-underline"
              >
                {t('auth-forget-password')}
              </Link>
            </div>
            <Button className="w-full bg-black dark:bg-white hover:bg-black dark:hover:bg-white " disabled={loading} type="submit" size="lg">
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
                  <span className='text-white dark:text-black'>{t('auth-sign-in')}</span>{' '}
                  <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5 text-white dark:text-black" />
                </>
          )}
              
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-black dark:text-white lg:mt-8 lg:text-start">
        {t('auth-dont-have-an-account')}{' '}
        <Link
          href={routes.signUp1}
          className="font-semibold text-black dark:text-white transition-colors "
        >
        {t('auth-sign-up')}
        </Link>
      </Text>
    </>
  );
}
