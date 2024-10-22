'use client'
import Image from 'next/image';
import UnderlineShape from '@components/shape/underline';
import SignUpForm from './sign-up-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import { metaObject } from '@/config/site.config';
import { useTranslation } from '@/app/i18n/client';

// export const metadata = {
//   ...metaObject('Sign Up 1'),
// };

const SignUp: React.FC =({lang}: { lang?: string }) => {
    const {t}=useTranslation(lang!,'auth')
  return (
    <AuthWrapperOne
      title={
        <>
        <div className="dark:text-white text-black ">
            {t('auth-join-us-and-never-miss')}{' '}
            <span className="relative dark:text-white text-black  inline-block">
              {t('auth-sign-up')}
              <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-28 text-greenColor xl:-bottom-1.5 xl:w-36" />
            </span>
        </div>
        </>
      }
      description={t('auth-sign-up-description')}
      bannerTitle={t('auth-sign-up-banner-title')}
      bannerDescription={t('auth-sign-up-banner-description')}
      isSocialLoginActive={false}
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <Image
            src={
              'https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-up.webp'
            }
            alt="Sign Up Thumbnail"
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
      }
    >
      <SignUpForm lang={lang!} />
    </AuthWrapperOne>
  );
}
export default SignUp

 
