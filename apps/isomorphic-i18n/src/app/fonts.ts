import { Alexandria, Almarai, Hahmlet, Inter, Lexend_Deca ,Poppins } from 'next/font/google';

export const inter = Inter({
  weight: ['100','200','300','400','500','600' ,'700','800','900'], 
   subsets: ['latin'], 
   variable: '--font-inter' });

export const lexendDeca = Lexend_Deca({
  weight: ['100','200','300','400','500','600' ,'700','800','900'], 
  subsets: ['latin'],
  variable: '--font-lexend',
});


export const poppins = Poppins({
  weight: ['100','200','300','400','500','600' ,'700','800','900'], 
  style: ['normal', 'italic'],
  variable: '--font-poppins', 
  subsets: ['latin'],
});
export const hahmlet = Hahmlet({
  weight: ['100','200','300','400','500','600' ,'700','800'], 
  style: ['normal'],
  variable: '--font-poppins', 
  subsets: ['latin' , 'latin-ext' , 'vietnamese'],
});
export const alex = Alexandria({
  weight: ['100','200','300','400','500','600' ,'700','800','900'], 
  style: ['normal'],
  variable: '--font-alex', 
  subsets: ['arabic','latin' , 'latin-ext' , 'vietnamese'],
});
