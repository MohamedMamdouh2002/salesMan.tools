import { BASE_URL } from '@/config/base-url';

import { FeatureCard,AccordionFeature } from "@/types";
import toast from "react-hot-toast";

export async function getFeatureCard(): Promise<FeatureCard[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/Feature/GetTopFeatures`,{

      // headers:{
      //   'Accept-Language': lang!, 
      // }
    });
    const data: FeatureCard[] = await response.json();
    return data;
  } 
  catch (err) {
    console.error("Failed to fetch Feature:", err);
    return null;
  }
}
export async function getFeatureAccordion(): Promise<AccordionFeature[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/Feature/GetAll` );
    const data: AccordionFeature[] = await response.json();
    return data;
  } 
  catch (err) {
    console.error("Failed to fetch Feature:", err);
    return null;
  }
}

export async function deleteFeatureAccordion(deleteId: string,setIsUpdate: (value: boolean) => void){
  try {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${BASE_URL}/api/Feature/Delete/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,

      },
    });

    if (response.ok) {
      toast.success('DeletedSuccess');
      setIsUpdate(true)
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || 'حدث خطأ أثناء الحذف.');
    }
  } catch (error) {
    toast.error('حدث خطأ يرجى المحاولة مرة أخرى.');
  }
}