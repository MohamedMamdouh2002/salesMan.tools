import { useAdminContext } from "@/app/components/context/adminContext";
import { BASE_URL } from "@/config/site.config";
import { Faq } from "@/types";
import toast from "react-hot-toast";

export async function getFaq(): Promise<Faq[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/FAQ/GetAll`);
    const data: Faq[] = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch FAQ:", err);
    return null;
  }
}
export async function deleteFAQ(deleteId: string,setIsUpdate: (value: boolean) => void) {

  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`${BASE_URL}/api/FAQ/Delete/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,

      },
    });

    if (response.ok) {
      // Handle successful delete
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
