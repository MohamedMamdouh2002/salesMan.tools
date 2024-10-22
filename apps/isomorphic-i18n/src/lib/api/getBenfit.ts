import { BASE_URL } from "@/config/site.config";
import { Benfit } from "@/types";
import toast from "react-hot-toast";

export async function getBenfit(): Promise<Benfit[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/Benefit/GetAll`);
    const data: Benfit[] = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch Benfit:", err);
    return null;
  }
}
export async function deleteBenfit(deleteId: string,setIsUpdate: (value: boolean) => void) {
  try {
    const response = await fetch(`${BASE_URL}/api/Benefit/Delete/${deleteId}`, {
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