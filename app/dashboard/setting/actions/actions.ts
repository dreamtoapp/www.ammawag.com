"use server";
import db from "@/lib/prisma";

const collectData = (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  // Extract and convert form data into a structured object
  const extractData = {
    fullName: String(data.fullName || ""), // Default to empty string if not provided
    bio: String(data.bio || ""), // Default to empty string if not provided
    email: String(data.email || ""), // Default to empty string if not provided
    phoneNumber: String(data.phoneNumber || null), // Nullable field
    twitter: String(data.twitter || null), // Nullable field
    linkedin: String(data.linkedin || null), // Nullable field
    instagram: String(data.instagram || null), // Nullable field
    tiktok: String(data.tiktok || null), // Nullable field
    facebook: String(data.facebook || null), // Nullable field
    snapchat: String(data.snapchat || null), // Nullable field
    taxNumber: String(data.taxNumber || null), // Nullable field
    taxQrImage: String(data.taxQrImage || ""), // Required field, default to empty string
  };
  return extractData;
};

export const newCompnay = async (formData: FormData): Promise<void> => {
  try {
    const companyData = collectData(formData);
    await db.company.create({
      data: companyData, // Pass the extracted data directly
    });
  } catch (error) {
    console.error("Error creating company record:", error);
    throw new Error("Failed to create company record.");
  }
};

export const updateCompnay = async (
  formData: FormData,
  id: string
): Promise<void> => {
  try {
    const companyData = collectData(formData);

    await db.company.update({
      where: { id: id },
      data: companyData, // Pass the extracted data directly
    });

    // Optionally, you can log success messages here
    console.log("Company record Update successfully!");
  } catch (error) {
    console.error("Error creating company record:", error);
    throw new Error("Failed to create company record.");
  }
};

export async function fetchCompanySettings(): Promise<CompanySettings | null> {
  try {
    const company = await db.company.findFirst({});
    return company;
  } catch (error) {
    console.error("Error fetching company settings:", error);
    throw new Error("Failed to fetch company settings.");
  }
}
