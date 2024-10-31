import { BASE_URL } from '@/config/base-url';

import { BillingCycle, sub, SubscriptionFeature} from "@/types";
import toast from "react-hot-toast";

export async function getSubscribtionYear(): Promise<sub[] | null> {
  let response = await fetch(`${BASE_URL}/api/SubscriptionPlan/GetMostPopularYearPlans`);
  try {
    const data: sub[] = await response.json();
    return data;
  } 
  catch (err) {
    console.error("Failed to fetch Feature:", err);
    return null;
  }
}
export async function getSubscribtionMonth(): Promise<sub[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/SubscriptionPlan/GetMostPopularMonthPlans`);
    const data: sub[] = await response.json();
    return data;
  } 
  catch (err) {
    console.error("Failed to fetch Feature:", err);
    return null;
  }
}
export async function getBillingCycle(): Promise<BillingCycle[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/BillingCycle/GetAll
`);
    const data: BillingCycle[] = await response.json();
    return data;
  } 
  catch (err) {
    console.error("Failed to fetch Feature:", err);
    return null;
  }
}
export async function getSubscriptionFeature(): Promise<SubscriptionFeature[] | null> {
  try {
  const response = await fetch(`${BASE_URL}/api/SubscriptionFeature/GetAll`);
    const data: SubscriptionFeature[] = await response.json();
    return data;
  } 
  catch (err) {
    console.error("Failed to fetch Feature:", err);
    return null;
  }
}


export async function deleteSubscriptionFeature(deleteId: string,setIsUpdate: (value: boolean) => void) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${BASE_URL}/api/SubscriptionFeature/Delete/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
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
export async function deleteSubscriptionPlan(deleteId: string,setIsUpdate: (value: boolean) => void) {
  try {
    const accessToken = localStorage.getItem('accessToken');    
    const response = await fetch(`${BASE_URL}/api/SubscriptionPlan/Delete/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
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