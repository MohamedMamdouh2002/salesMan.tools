import { BASE_URL } from "@/config/site.config";
import { InfoAccordion } from "@/types";
import toast from "react-hot-toast";

export async function getInfoAccordion(): Promise<InfoAccordion[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/Section/GetAll`);
    const data: InfoAccordion[] = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch accordion:", err);
    return null;
  }
}

export async function deleteInfoAccordion(deleteId: string,setIsUpdate: (value: boolean) => void) {
  try {
    const response = await fetch(`${BASE_URL}/api/Section/Delete/${deleteId}`, {
      method: 'DELETE',
      headers: {
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