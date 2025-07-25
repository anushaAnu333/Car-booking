import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Limit to 4 files maximum
    const filesToProcess = files.slice(0, 4);
    const uploadPromises = filesToProcess.map(async (file) => {
      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2);
      const publicId = `car_${timestamp}_${randomId}`;

      // Upload to Cloudinary
      const result = await uploadToCloudinary(buffer, {
        folder: "carrental/cars",
        public_id: publicId,
        width: 800,
        height: 600,
        crop: "limit",
        quality: "auto",
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      };
    });

    const uploadResults = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      images: uploadResults,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { publicIds } = await request.json();

    if (!publicIds || !Array.isArray(publicIds)) {
      return NextResponse.json(
        { error: "Invalid public IDs provided" },
        { status: 400 }
      );
    }

    // Delete images from Cloudinary
    const { deleteFromCloudinary } = await import("@/lib/cloudinary");
    const deletePromises = publicIds.map((publicId) =>
      deleteFromCloudinary(publicId)
    );
    await Promise.all(deletePromises);

    return NextResponse.json({
      success: true,
      message: "Images deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete images" },
      { status: 500 }
    );
  }
}
