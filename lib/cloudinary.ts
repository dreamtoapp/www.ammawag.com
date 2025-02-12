// lib/cloudinary.ts
import cloudinary from "cloudinary";

// Configure Cloudinary using environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Ensures that the specified folder exists in Cloudinary.
 * If the folder does not exist, it will be created.
 * @param folderName - The name of the folder to check/create.
 */
async function ensureFolderExists(folderName: string) {
  try {
    // Attempt to create the folder
    await cloudinary.v2.api.create_folder(folderName);
    console.log(`Folder '${folderName}' created successfully.`);
  } catch (error: any) {
    if (error.http_code === 409 && error.message.includes("already exists")) {
      console.log(`Folder '${folderName}' already exists.`);
    } else {
      console.error(
        `Unexpected error ensuring folder '${folderName}' exists:`,
        error
      );
      throw new Error(
        `Failed to ensure folder '${folderName}' exists: ${
          error.message || "Unknown error"
        }`
      );
    }
  }
}

/**
 * Uploads an image file to Cloudinary.
 * @param file - The image file to upload.
 * @returns An object containing the secure URL and public ID of the uploaded image.
 */
export async function uploadImageToCloudinary(file: File) {
  const folderName = process.env.CLOUDINARY_FOLDER || "amwag";
  const uploadPresetName =
    process.env.CLOUDINARY_UPLOAD_PRESET || "amwag_preset";

  // Ensure the folder exists
  await ensureFolderExists(folderName);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPresetName); // Use the manually created preset
  formData.append("folder", folderName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary API Error:", errorData);
      throw new Error(
        `Cloudinary upload failed: ${
          errorData.error?.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    if (!data.secure_url || !data.public_id) {
      throw new Error(
        "Failed to retrieve secure URL or public ID from Cloudinary."
      );
    }

    // Generate an optimized URL
    const optimizedUrl = cloudinary.v2.url(data.public_id, {
      width: 80,
      height: 80,
      crop: "fill",
      quality: "auto",
      format: "webp",
    });

    console.log("Cloudinary Upload Response:", data); // Log the full response for debugging
    return {
      secure_url: optimizedUrl, // Return the optimized URL
      public_id: data.public_id, // Return the public ID
    };
  } catch (error: any) {
    console.error("Error uploading image to Cloudinary:", error.message);
    throw new Error("Failed to upload image to Cloudinary.");
  }
}

export default cloudinary.v2;
