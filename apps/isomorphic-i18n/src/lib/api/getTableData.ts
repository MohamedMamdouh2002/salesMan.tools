import { BASE_URL } from '@/config/base-url';

import { Platform, showData } from "@/types";

// وظائف لجلب البيانات
export async function getPlatform(): Promise<Platform[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/SocialMediaPlatform/GetAll`);
    const data: Platform[] = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch platform:", err);
    return null;
  }
}

export async function getLocation(): Promise<Platform[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/City/GetAll`);
    const data: Platform[] = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch city:", err);
    return null;
  }
}

export async function getCategory(): Promise<Platform[] | null> {
  try {
    let response = await fetch(`${BASE_URL}/api/Category/GetAll`);
    const data: Platform[] = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch Category:", err);
    return null;
  }
}

// وظيفة لجلب بيانات البحث باستخدام المعرفات
export async function getTableSearch({
  categoryId,
  cityId,
  socialMediaPlatformId,
}: {
  categoryId?: string;
  cityId?: string;
  socialMediaPlatformId?: string;
}): Promise<showData[] | null> {
  try {
    let response = await fetch(
      `${BASE_URL}/api/KeywordComment/FilterKeywords?socialMediaPlatformId=${socialMediaPlatformId}&cityId=${cityId}&categotyId=${categoryId}`
    );
    const data: showData[] = await response.json();
    console.log('====================================');
    console.log("data: ", data);
    console.log('====================================');
    return data;
  } catch (err) {
    console.error("Failed to fetch search:", err);
    return null;
  }
}


// وظيفة لدمج جميع البيانات واستخدامها
export async function fetchAndSearch(): Promise<void> {
  try {
    // جلب البيانات
    const platforms = await getPlatform();
    const cities = await getLocation();
    const categories = await getCategory();
    
    // افترض أنك تريد استخدام أول عنصر من كل مجموعة كمعرف
    const socialMediaPlatformId = platforms?.[0]?.id; // استخدم id المناسب بناءً على بياناتك
    const cityId = cities?.[0]?.id; // استخدم id المناسب بناءً على بياناتك
    const categoryId = categories?.[0]?.id; // استخدم id المناسب بناءً على بياناتك

    // استخدام المعرفات في البحث
    const searchResults = await getTableSearch({ categoryId, cityId, socialMediaPlatformId });

    console.log(searchResults);
  } catch (err) {
    console.error("Failed to fetch and search:", err);
  }
}

// export async function getShowTable(): Promise<showData[] | null> {
//   try {
//     let response = await fetch(`${BASE_URL}/api/KeywordComment/GetAll`);
//     const data: showData[] = await response.json();
//     return data;
//   } catch (err) {
//       console.error("Failed to fetch showData:", err);
//     return null;
//   }
// }
// export async function getShowTable({ categoryId, cityId, socialMediaPlatformId }: { categoryId?: string; cityId?: string; socialMediaPlatformId?: string; }): Promise<showData[] | null> {
//   try {
//     let response = await fetch(`${BASE_URL}/api/KeywordComment/FilterKeywords?socialMediaPlatformId=${socialMediaPlatformId}&cityId=${cityId}&categoryId=${categoryId}`);
//     const data: showData[] = await response.json();
//     return data;
//   } catch (err) {
//     console.error("Failed to fetch search:", err);
//     return null;
//   }
// }