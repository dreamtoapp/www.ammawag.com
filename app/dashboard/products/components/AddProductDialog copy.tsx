"use client"; // Mark as a Client Component
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod"; // Import Zod
import { createOrUpdateProduct } from "../actions/Actions";
import { productSchema } from "../logic/validation"; // Import Zod schema for product
import { Loader2 } from "lucide-react"; // Import a loading spinner icon
import InputField from "@/components/InputField"; // Reusable InputField
import ImageUploadField from "@/components/ImageUploadField"; // Reusable ImageUploadField

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
  });
  const [imageFile, setImageFile] = useState<File | undefined>(undefined); // File selected by the user
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Preview URL for the uploaded image
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false); // Loading state for form submission

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
      setLoading(true); // Start loading
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
        setLoading(false); // Stop loading if validation fails
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
      setLoading(false); // Stop loading if there's an error
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
          <InputField
            name="name"
            label="Product Name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          {/* Price Field */}
          <InputField
            name="price"
            label="Price"
            type="number"
            placeholder="Enter price"
            value={formData.price.toString()}
            onChange={handleChange}
            error={errors.price}
          />

          {/* Size Field */}
          <InputField
            name="size"
            label="Size"
            placeholder="Enter size (e.g., 1L, 500ml)"
            value={formData.size}
            onChange={handleChange}
            error={errors.size}
          />

          {/* Image Upload Field */}
          <ImageUploadField
            label="Product Image"
            previewUrl={previewUrl}
            onChange={handleFileChange}
            error={errors.imageUrl}
          />

          {/* Submit Button with Loader */}
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading} // Disable button while loading
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
