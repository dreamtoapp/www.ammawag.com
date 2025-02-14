"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil } from "lucide-react";
import { createOrUpdateSupplier } from "../actions/supplierActions";
import { z } from "zod"; // Import Zod
import { supplierSchema } from "../logic/validation";
import InputField from "@/components/InputField"; // Reusable InputField
import ImageUploadField from "@/components/ImageUploadField"; // Reusable ImageUploadField
import { Loader2 } from "lucide-react"; // Import a loading spinner icon

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
  const [imageLoading, setImageLoading] = useState(false); // State for image loading
  const [submitLoading, setSubmitLoading] = useState(false); // State for form submission

  // Handle changes in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageLoading(true); // Start image loading
      setLogoFile(file);

      // Simulate image loading delay (optional, for better UX)
      setTimeout(() => {
        setPreviewUrl(URL.createObjectURL(file)); // Preview the uploaded image
        setImageLoading(false); // Stop image loading
      }, 500);

      setErrors((prevErrors) => ({ ...prevErrors, logo: "" })); // Clear logo error
    } else {
      setLogoFile(undefined);
      setPreviewUrl(supplier.logo || null); // Reset to the original logo
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true); // Start loading
      // Validate form data using Zod
      supplierSchema.parse(formData);

      // Ensure a logo file is provided
      if (!logoFile && !supplier.logo) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          logo: "Logo is required.",
        }));
        setSubmitLoading(false); // Stop loading if validation fails
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

        // Find the first error and display it
        const firstErrorKey = Object.keys(fieldErrors)[0];
        setErrors({ [firstErrorKey]: fieldErrors[firstErrorKey] });
      } else {
        console.error("Error updating supplier:", error.message);
      }
      setSubmitLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-h-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Supplier</DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <Tabs defaultValue="details" className="w-full">
          {/* Fixed Tabs List */}
          <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-white z-10">
            <TabsTrigger value="details">Supplier Details</TabsTrigger>
            <TabsTrigger value="logo">Logo Upload</TabsTrigger>
          </TabsList>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[350px] mt-4 space-y-4">
            {/* Supplier Details Tab */}
            <TabsContent value="details">
              <div className="space-y-4">
                <InputField
                  name="name"
                  label="Supplier Name"
                  placeholder="Enter supplier name"
                  value={formData.name}
                  onChange={handleChange}
                  // tooltip="The name of the supplier or company."
                  error={errors.name}
                />
                <InputField
                  name="email"
                  label="Email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  // tooltip="The contact email for the supplier."
                  error={errors.email}
                />
                <InputField
                  name="phone"
                  label="Phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  // tooltip="The contact phone number for the supplier."
                  error={errors.phone}
                />
                <InputField
                  name="address"
                  label="Address"
                  placeholder="Enter physical address"
                  value={formData.address}
                  onChange={handleChange}
                  // tooltip="The physical address of the supplier."
                  error={errors.address}
                />
              </div>
            </TabsContent>

            {/* Logo Upload Tab */}
            <TabsContent value="logo">
              <div className="flex flex-col h-full">
                <ImageUploadField
                  label="Logo"
                  previewUrl={previewUrl}
                  onChange={handleFileChange}
                  error={errors.logo}
                />
                {imageLoading && (
                  <div className="flex justify-center items-center mt-4">
                    <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
                  </div>
                )}
              </div>
            </TabsContent>
          </div>

          {/* Single Error Message */}
          <div className="mt-4">
            {Object.entries(errors).map(([field, message]) => (
              <p key={field} className="text-sm text-red-500">
                {message}
              </p>
            ))}
          </div>

          {/* Fixed Submit Button */}
          <div className="absolute bottom-0 bg-white py-4 border-t border-gray-200">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={submitLoading} // Disable button while loading
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {submitLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
