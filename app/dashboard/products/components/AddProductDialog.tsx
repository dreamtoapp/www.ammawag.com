// app/dashboard/products/components/AddProductDialog.tsx
"use client"; // Mark as a Client Component

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { z } from "zod"; // Import Zod
import { createOrUpdateProduct } from "../actions/Actions";
import { productSchema } from "../logic/validation"; // Import Zod schema for product

interface AddProductDialogProps {
  supplierId: string; // Explicitly define supplierId as a prop
}

export default function AddProductDialog({
  supplierId,
}: AddProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    size: "",
    imageUrl: "", // Will store the uploaded image URL
  });
  const [imageFile, setImageFile] = useState<File | undefined>(undefined); // File selected by the user
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Preview URL for the uploaded image
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [uploading, setUploading] = useState(false); // Loading state for image upload

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert price to a number if the field is "price"
    const parsedValue = name === "price" ? parseFloat(value) || 0 : value;

    setFormData({ ...formData, [name]: parsedValue });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Preview the uploaded image
      setErrors((prevErrors) => ({ ...prevErrors, imageUrl: "" })); // Clear image error
    } else {
      setImageFile(undefined);
      setPreviewUrl(null);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Convert price to a number before validation
      const parsedFormData = {
        ...formData,
        price: parseFloat(formData.price.toString()) || 0,
      };

      // Ensure an image file is provided
      if (!imageFile) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          imageUrl: "Product image is required.",
        }));
        return;
      }

      // Validate form data using Zod
      productSchema.parse(parsedFormData);

      // Call the createOrUpdateProduct function
      await createOrUpdateProduct(
        null,
        { ...parsedFormData, supplierId },
        imageFile
      );

      window.location.reload(); // Refresh the page after adding
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Map Zod errors to a key-value object
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err: z.ZodIssue) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error adding product:", error.message);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <Input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Price Field */}
          <div>
            <Input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price}</p>
            )}
          </div>

          {/* Size Field */}
          <div>
            <Input
              name="size"
              placeholder="Size (e.g., 1L, 500ml)"
              value={formData.size}
              onChange={handleChange}
            />
            {errors.size && (
              <p className="text-sm text-red-500">{errors.size}</p>
            )}
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Preview:</p>
                <Image
                  src={previewUrl}
                  alt="Product Preview"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
            )}
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="button" onClick={handleSubmit} disabled={uploading}>
            {uploading ? "Uploading..." : "Add Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
