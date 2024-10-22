import { BASE_URL } from "@/config/site.config";
import { DocType ,Doc, DocumentationId} from "@/types";
import toast from "react-hot-toast";

export async function getDocumentationCategory(): Promise<DocType[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/DocumentationCategory/GetAll`);
    const data: DocType[] = await response.json();
    return data;
  } 
  catch (err) {
    console.error("Failed to fetch Feature:", err);
    return null;
  }
}

export async function getDocumentatoin(id?: string): Promise<Doc[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/Documentatoin/GetAll`);
    const data: Doc[] = await response.json();
    return data;
  } 
  catch (err) {
    console.error("Failed to fetch Feature:", err);
    return null;
  }
}

export async function getDocumentatoinId(id?: string): Promise<DocumentationId | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/Documentatoin/GetDocumentationById/${id}`);
    const data: DocumentationId = await response.json();
    return data;
  } 
  catch (err) {
    console.error("Failed to fetch Documentation:", err);
    return null;
  }
}

export async function deleteCategory(deleteId: string,setIsUpdate: (value: boolean) => void) {
  try {
    const response = await fetch(`${BASE_URL}/api/DocumentationCategory/Delete/${deleteId}`, {
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
export async function deleteCategoryDetails(deleteId: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/Feature/Delete/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      toast.success('تم الحذف بنجاح!');
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || 'حدث خطأ أثناء الحذف.');
    }
  } catch (error) {
    toast.error('حدث خطأ يرجى المحاولة مرة أخرى.');
  }
}