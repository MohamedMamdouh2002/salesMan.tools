import { BASE_URL } from '@/config/base-url';

import { DocType ,Doc, DocumentationId} from "@/types";
import toast from "react-hot-toast";

export async function getDocumentationCategory(): Promise<DocType[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/DocumentationCategory/GetAll`,{

      // headers:{
      //   'Accept-Language': lang, 
      // }
    });
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
    let response = await fetch(`${BASE_URL}/api/Documentatoin/GetAll`,{

      // headers:{
      //   'Accept-Language': lang, 
      // }
    });
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
    let response = await fetch(`${BASE_URL}/api/Documentatoin/GetDocumentationById/${id}`,{

      // headers:{
      //   'Accept-Language': lang, 
      // }
    });
    const data: DocumentationId = await response.json();
    return data;
  } 
  catch (err) {
    console.error("Failed to fetch Documentation:", err);
    return null;
  }
}

export async function deleteCategory(deleteId: string,setIsUpdate: (value: boolean) => void) {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await fetch(`${BASE_URL}/api/DocumentationCategory/Delete/${deleteId}`, {
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
export async function deleteCategoryDetails(deleteId: string, setIsUpdate: (value: boolean) => void) {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await fetch(`${BASE_URL}/api/DocumentationSubCategory/Delete/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      toast.success('Deleted successfully');
      setIsUpdate(true);
    } else {
      const errorData = await response.json();
      if (errorData.statusCode === 404) {
        toast.error('Data not found.11');
      } else {
        toast.error(errorData.message || 'An error occurred while deleting.');
      }
    }
  } catch (error) {
    toast.error('An error occurred. Please try again.');
  }
}