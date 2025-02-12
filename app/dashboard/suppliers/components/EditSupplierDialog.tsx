// app/dashboard/suppliers/components/EditSupplierDialog.tsx
"use client";
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
import { createOrUpdateSupplier } from "../actions/Actions";
import { z } from "zod"; // Import Zod
import { supplierSchema } from "../logic/validation";
import { Pencil } from "lucide-react";

interface EditSupplierDialogProps {
  supplier: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    logo: string | null; // Logo URL (optional)
    publicId: string | null; // Public ID (optional)
  };
}

export default function EditSupplierDialog({
  supplier,
}: EditSupplierDialogProps) {
  const [formData, setFormData] = useState({
    name: supplier.name,
    email: supplier.email,
    phone: supplier.phone,
    address: supplier.address,
  });
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    supplier.logo || null
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Preview the uploaded image
      setErrors((prevErrors) => ({ ...prevErrors, logo: "" })); // Clear logo error
    } else {
      setLogoFile(undefined);
      setPreviewUrl(supplier.logo || null); // Reset to the original logo
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate form data using Zod
      supplierSchema.parse(formData);

      // If no new logo is uploaded, ensure the existing logo is retained
      if (!logoFile && !supplier.logo) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          logo: "Logo is required.",
        }));
        return;
      }

      // If validation passes, submit the form
      await createOrUpdateSupplier(supplier.id, formData, logoFile);
      window.location.reload(); // Refresh the page after updating
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Map Zod errors to a key-value object
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err: z.ZodIssue) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error updating supplier:", error.message);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Supplier</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <Input
              name="name"
              placeholder="Supplier Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <Input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <Input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          {/* Logo Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Logo
            </label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Preview:</p>
                <Image
                  src={previewUrl}
                  alt="Logo Preview"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
            )}
            {errors.logo && (
              <p className="text-sm text-red-500">{errors.logo}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="button" onClick={handleSubmit}>
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
