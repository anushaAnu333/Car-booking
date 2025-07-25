"use client";

import { useState } from "react";
import { Upload, Star, Plus, Link, Trash2, Eye } from "lucide-react";

interface ImageManagerProps {
  images: string[];
  imagePublicIds?: string[];
  onImagesChange: (images: string[], publicIds: string[]) => void;
  maxImages?: number;
}

export default function ImageManager({
  images = [],
  imagePublicIds = [],
  onImagesChange,
  maxImages = 4,
}: ImageManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  // Predefined car images for quick selection
  const stockImages = [
    {
      url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&auto=format",
      name: "Sport Car 1",
    },
    {
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&auto=format",
      name: "Sport Car 2",
    },
    {
      url: "https://images.unsplash.com/photo-1570809834316-4dafaac7ce05?w=800&h=600&fit=crop&auto=format",
      name: "SUV 1",
    },
    {
      url: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&h=600&fit=crop&auto=format",
      name: "SUV 2",
    },
    {
      url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&auto=format",
      name: "Sedan 1",
    },
    {
      url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop&auto=format",
      name: "Electric Car",
    },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    if (validFiles.length === 0) return;

    const availableSlots = maxImages - images.length;
    const filesToProcess = validFiles.slice(0, availableSlots);

    if (filesToProcess.length === 0) {
      alert(
        `Maximum ${maxImages} images allowed. Please remove some images first.`
      );
      return;
    }

    try {
      setUploading(true);

      // Upload to Cloudinary
      const uploadFormData = new FormData();
      filesToProcess.forEach((file) => {
        uploadFormData.append("files", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      if (result.success && result.images) {
        const newImageUrls = result.images.map((img: any) => img.url);
        const newPublicIds = result.images.map((img: any) => img.publicId);

        const updatedImages = [...images, ...newImageUrls];
        const updatedPublicIds = [...imagePublicIds, ...newPublicIds];

        onImagesChange(updatedImages, updatedPublicIds);
        alert(`Successfully uploaded ${filesToProcess.length} image(s)!`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const addImageByUrl = (imageUrl: string) => {
    if (!imageUrl.trim()) return;

    if (images.length >= maxImages) {
      alert(`Maximum ${maxImages} images allowed.`);
      return;
    }

    const updatedImages = [...images, imageUrl.trim()];
    const updatedPublicIds = [...imagePublicIds, ""]; // No public ID for URL images

    onImagesChange(updatedImages, updatedPublicIds);
    setUrlInput("");
    setShowUrlInput(false);
  };

  const removeImage = async (indexToRemove: number) => {
    const publicIdToDelete = imagePublicIds[indexToRemove];

    // If it's a Cloudinary image, delete it
    if (publicIdToDelete) {
      try {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            publicIds: [publicIdToDelete],
          }),
        });
      } catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
      }
    }

    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    const updatedPublicIds = imagePublicIds.filter(
      (_, index) => index !== indexToRemove
    );

    onImagesChange(updatedImages, updatedPublicIds);
  };

  const setAsPrimary = (indexToSetAsPrimary: number) => {
    if (indexToSetAsPrimary < images.length) {
      const reorderedImages = [
        images[indexToSetAsPrimary],
        ...images.filter((_, index) => index !== indexToSetAsPrimary),
      ];
      const reorderedPublicIds = [
        imagePublicIds[indexToSetAsPrimary] || "",
        ...imagePublicIds.filter((_, index) => index !== indexToSetAsPrimary),
      ];

      onImagesChange(reorderedImages, reorderedPublicIds);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Car Images ({images.length}/{maxImages})
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <Link className="w-4 h-4" />
            <span>Add URL</span>
          </button>
        </div>
      </div>

      {/* Current Images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="relative w-full h-24 rounded-lg overflow-hidden border-2 border-gray-200">
                {index === 0 && (
                  <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded z-10 flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Primary</span>
                  </div>
                )}
                <img
                  src={imageUrl}
                  alt={`Car image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/cars/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-1">
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => setAsPrimary(index)}
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 flex items-center space-x-1"
                        title="Set as primary">
                        <Star className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => window.open(imageUrl, "_blank")}
                      className="bg-gray-500 text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
                      title="View full size">
                      <Eye className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                      title="Remove image">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* URL Input */}
      {showUrlInput && (
        <div className="border border-gray-300 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Image URL
          </label>
          <div className="flex space-x-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/car-image.jpg"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addImageByUrl(urlInput);
                }
              }}
            />
            <button
              type="button"
              onClick={() => addImageByUrl(urlInput)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setShowUrlInput(false);
                setUrlInput("");
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* File Upload Area */}
      {images.length < maxImages && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}>
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-medium">
              {uploading
                ? "Uploading..."
                : "Drop images here or click to upload"}
            </span>
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB (Max {maxImages} images)
          </p>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              e.target.files && handleFiles(Array.from(e.target.files))
            }
            className="hidden"
            id="image-upload"
            disabled={uploading}
          />
          <label
            htmlFor="image-upload"
            className={`mt-2 inline-block cursor-pointer px-4 py-2 rounded-lg transition ${
              uploading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}>
            {uploading ? "Uploading..." : "Choose Files"}
          </label>
        </div>
      )}

      {/* Stock Images */}
      <div className="border border-gray-300 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">
            Quick Select Stock Images
          </h4>
          <span className="text-xs text-gray-500">Click to add</span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {stockImages.map((stock, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer transition"
              onClick={() => addImageByUrl(stock.url)}>
              <img
                src={stock.url}
                alt={stock.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 flex items-center justify-center transition">
                <Plus className="w-6 h-6 text-white opacity-0 hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {images.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <Upload className="mx-auto h-8 w-8 mb-2" />
          <p className="text-sm">
            No images added yet. Upload or add image URLs above.
          </p>
        </div>
      )}
    </div>
  );
}
