import type { CouponType } from "@/config/enums";

export interface Coupon {
  id: string;
  name: string;
  type: CouponType;
  slug: string;
  amount?: string;
  code?: string;
}

export interface Address {
  customerName?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  street?: string;
}

export interface GoogleMapLocation {
  lat?: number;
  lng?: number;
  street_number?: string;
  route?: string;
  street_address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  formattedAddress?: string;
}

export interface ProductColor {
  name?: string;
  code?: string;
}

export interface CartItem {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image: string;
  color?: ProductColor | null;
  price: number;
  salePrice?: number;
  quantity: number;
  size: number;
  stock?: number;
  discount?: number;
}

export interface Product {
  id: number;
  slug?: string;
  title: string;
  description?: string;
  price: number;
  sale_price?: number;
  thumbnail: string;
  colors?: ProductColor[];
  sizes?: number[];
}

export interface PosProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
  size: number;
  discount?: number;
}
export interface CalendarEvent {
  id?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  title: string;
  description?: string;
  location?: string;
}

export interface FlightingCardProps {
  id: number;
  image: string;
  title: string;
  price: string;
  meta?: {
    model: string;
    hours: string;
    stop: string;
  };
  class: string;
  bucket: {
    luggage?: string;
    bag?: string;
  };
  airlines?: string;
  routes?: {
    arrivalDate: Date | string;
    arrivalTime: Date | string;
    departureDate: Date | string;
    departureTime: Date | string;
    departureCityCode: string;
    departureCity: string;
    departureTerminal: string;
    arrivalCityCode: string;
    arrivalCity: string;
    arrivalTerminal: string;
    layover: {
      layoverCityCode: string;
      layoverCity: string;
      layoverTerminal: string;
      layoverTime: string;
    }[];
  };
  cheapest?: boolean;
  best?: boolean;
  quickest?: boolean;
}

//  
// 
// 
export type Header = {
  
  title: string;
  description: string;

};
export type Faq = {
  id: string;
  question: string;
  answer: string;
  questionAr: string;
  answerAr: string;
  userName: string;
  avatar: string;
};
export type FeatureCard = {
  id: string;
  name: string;
  description: string;
  userName: string;
  avatar: string;
  featureId: string;
  imageUrl:any;
 
};
interface SubFeatures {
  name: string;
  description: string;
  image: File;
  nameAr:string;
  descriptionAr:string;
  id: string;
}

export type AccordionFeature = {
  id: string;
  name: string;
  nameAr:string;
  descriptionAr:string;
  description: string;
  imageUrl: string;
  subFeatures:SubFeatures[];
  userName: string;
  avatar: string;
};

export type subscriptionFeatures={
  name: string;
  planHover: string;
}
export type sub ={
  id: string;
  name: string;
  nameAr: string;
  price: string;
  discountPercentage: number;
  billingCycle:string;
  planBenefitDescription: string;
  priceAfterDiscount: number;
  userName: string;
  avatar: string;

  subscriptionFeatures: {
    name: string;
    planHover: string;
  }[];
}
// export type subItemyear ={
//   id: number;
//   top: React.ReactNode;
//   header: string;
//   PriceBeforeDiscount: number;
//   price: number;
//   discount: string;
//   duration: string;
//   bttn: React.ReactNode;
//   icon: React.ReactNode;
//   feature: {
//     plan: string;
//     planHover: string;
//   }[];
// }

export type DocType = {
  id: string;
  name: string;
  nameAr: string;
  imageUrl: string;
  documentationSubCategories: {
    // imageUrl: any;
    // menu: any;
    name: string;
    nameAr: string;
    documentationCategoryId:string;
    id:string
  }[];
  userName: string;
  avatar:string;
};
export type Doc = {
  subItemId: string;
  documentationSubCategories:DocType[];
  id: string;
  name: string;
  imageUrl: string;
  description:string
  videoDuration:number
  userName: string;
  avatar:string;
};
export type Benfit = {
  id: string;
  name: string;
  nameAr: string;
  imageUrl: string;
  description:string;
  descriptionAr:string;
  userName: string;
  avatar:string;
};
export type Platform = {
  name: string;
  id: string;
};
export type showData = {
    userName: string;
    keyWord:string;
    phoneNumber: string,
    categoryId: string,
    cityId: string,
    socialMediaPlatformId: string,
    id: string

};

interface DescriptionPoint {
  map(arg0: (point: string, index: number) => import("react").JSX.Element): import("react").ReactNode | Iterable<import("react").ReactNode>;
  text: string; // أو أي خاصية أخرى تريد استخدامها
}
export type MobileSection ={
  name: string;
  content: string;
  description: string;
  nameAr: string;
  contentAr: string;
  descriptionAr: string;
  imageUrl: string;
  // descriptionPoints: DescriptionPoint; // استخدام الوصف كـ array من الـ strings
  id: string;
  userName: string;
  avatar:string;
}


interface SectionItem {
  name: string;
  description: string;
  nameAr: string;
  descriptionAr: string;
  videoUrl: string;
  id: string;
  userName: string;
  avatar:string;
}

export interface InfoAccordion {
  id:string;
  title: string;
  content: string;
  titleAr: string;
  contentAr: string;
  sectionItems: SectionItem[];
  userName: string;
  avatar:string;
}


export interface DocumentationSection {
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  documentationId: string;
  id: string;
}

export interface DocumentationId {
  name: string;
  nameAr: string;
  videoDuration: string;
  description: string;
  descriptionAr: string;
  imageUrl: string;
  videoUrl: string;
  documentationSubCategoryId: string;
  documentationSections: DocumentationSection[];
  documentationSubCategoryName: string;
  userName: string;
  avatar:string;  
  id: string;
}

 export interface SubscriptionFeature{
    id: string;
    name: string,
    description: string,
    nameAr: string,
    descriptionAr: string,
    userName: string;
    avatar:string;
}
 export interface BillingCycle{
    id: string;
    name: string,

}