'use client'
// import SignInForm from '@/app/[lang]/(hydrogen)/signin/sign-in-form';
import SignInForm from '@/app/[lang]/(hydrogen)/signin/sign-in-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import Image from 'next/image';
import UnderlineShape from '@components/shape/underline';
import { metaObject } from '@/config/site.config';
import { useTranslation } from '@/app/i18n/client';

// export const metadata = {
//   ...metaObject('Sign In'),
// };

const SignIn: React.FC =({lang}: { lang?: string }) => {
  const { t }=useTranslation(lang!,'auth')

  return (
    <AuthWrapperOne
    
      title={
        <>
        <div className="dark:text-white text-[#000] ">

           {t('auth-welcome-back')}{' '}
          <span className="relative inline-block dark:text-white text-black ">
            {t('auth-sign-in-to')}
            <UnderlineShape className="absolute  text-greenColor dark:text-greenColor -bottom-2 start-0 h-2.5 w-24 md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}
          {t('auth-continue')}
        </div>
        </>
      }
      description={t('auth-sign-up-description')}
      bannerTitle={t('auth-sign-up-banner-title')}
      bannerDescription={t('auth-sign-up-banner-description')}
      isSocialLoginActive={false}
      pageImage={
        <div className="relative mx-auto   aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
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
      <SignInForm lang={lang!} />
    </AuthWrapperOne>
  );
}
export default SignIn
