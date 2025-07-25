import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

export const uploadToCloudinary = async (
  file: Buffer | string,
  options: {
    folder?: string;
    public_id?: string;
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
  } = {}
): Promise<CloudinaryUploadResult> => {
  try {
    const uploadOptions = {
      folder: options.folder || "carrental/cars",
      public_id: options.public_id,
      overwrite: true,
      resource_type: "image" as const,
      quality: options.quality || "auto",
      width: options.width,
      height: options.height,
      crop: options.crop || "limit",
    };

    const result = await cloudinary.uploader.upload(
      typeof file === "string"
        ? file
        : `data:image/png;base64,${file.toString("base64")}`,
      uploadOptions
    );

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};

export const getOptimizedImageUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  } = {}
): string => {
  return cloudinary.url(publicId, {
    width: options.width,
    height: options.height,
    crop: options.crop || "fill",
    quality: options.quality || "auto",
    format: options.format || "auto",
  });
};

export default cloudinary;
