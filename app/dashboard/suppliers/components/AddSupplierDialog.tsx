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
import { createOrUpdateSupplier } from "../actions/supplierActions";
import { z } from "zod"; // Import Zod
import { supplierSchema } from "../logic/validation";
import InputField from "../../../../components/InputField";
import ImageUploadField from "../../../../components/ImageUploadField";
import { Loader2 } from "lucide-react"; // Import a loading spinner icon

export default function AddSupplierDialog() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false); // State to track loading

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
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Preview the uploaded image
      setErrors((prevErrors) => ({ ...prevErrors, logo: "" })); // Clear logo error
    } else {
      setLogoFile(undefined);
      setPreviewUrl(null);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true); // Start loading

      // Validate form data using Zod
      supplierSchema.parse(formData);

      // Ensure a logo file is provided
      if (!logoFile) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          logo: "Logo is required.",
        }));
        setLoading(false); // Stop loading if validation fails
        return;
      }

      // If validation passes, submit the form
      await createOrUpdateSupplier(null, formData, logoFile);
      window.location.reload();

      // Reset form and close dialog (optional)
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      setLogoFile(undefined);
      setPreviewUrl(null);
      setErrors({});
    } catch (error: any) {
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err: z.ZodIssue) => {
          fieldErrors[err.path[0]] = err.message;
        });

        // Find the first error and display it
        const firstErrorKey = Object.keys(fieldErrors)[0];
        setErrors({ [firstErrorKey]: fieldErrors[firstErrorKey] });
      } else {
        // Log other errors (e.g., API errors)
        console.error("Error adding supplier:", error.message);
      }
    } finally {
      // Ensure loading state is reset regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Supplier</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-h-[500px]">
        <DialogHeader>
          <DialogTitle>Add Supplier</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Supplier Details</TabsTrigger>
            <TabsTrigger value="logo">Logo Upload</TabsTrigger>
          </TabsList>

          {/* Form Content */}
          <form className="space-y-4">
            {/* Supplier Details Tab */}
            <TabsContent value="details">
              <div className="space-y-4">
                <InputField
                  name="name"
                  label="Supplier Name"
                  placeholder="Enter supplier name"
                  value={formData.name}
                  onChange={handleChange}
                  tooltip="The name of the supplier or company."
                  error={errors.name}
                />
                <InputField
                  name="email"
                  label="Email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  tooltip="The contact email for the supplier."
                  error={errors.email}
                />
                <InputField
                  name="phone"
                  label="Phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  tooltip="The contact phone number for the supplier."
                  error={errors.phone}
                />
                <InputField
                  name="address"
                  label="Address"
                  placeholder="Enter physical address"
                  value={formData.address}
                  onChange={handleChange}
                  tooltip="The physical address of the supplier."
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
              </div>
            </TabsContent>
          </form>

          {/* Single Error Message */}
          <div className="mt-4">
            {Object.entries(errors).map(([field, message]) => (
              <p key={field} className="text-sm text-red-500">
                {message}
              </p>
            ))}
          </div>

          {/* Submit Button with Loader */}
          <div className="flex justify-end mt-4">
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
                "Save Supplier"
              )}
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
