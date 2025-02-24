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
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-h-[500px] bg-background text-foreground border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            تعديل المورد
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <Tabs defaultValue="details" className="w-full">
          {/* Fixed Tabs List */}
          <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-background z-10 border-b border-border">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              تفاصيل المورد
            </TabsTrigger>
            <TabsTrigger
              value="logo"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              رفع الشعار
            </TabsTrigger>
          </TabsList>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[350px] mt-4 space-y-4 p-4">
            {/* Supplier Details Tab */}
            <TabsContent value="details">
              <div className="space-y-4">
                <InputField
                  name="name"
                  label="اسم المورد"
                  placeholder="أدخل اسم المورد"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <InputField
                  name="email"
                  label="البريد الإلكتروني"
                  placeholder="أدخل البريد الإلكتروني"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <InputField
                  name="phone"
                  label="رقم الهاتف"
                  placeholder="أدخل رقم الهاتف"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
                <InputField
                  name="address"
                  label="العنوان"
                  placeholder="أدخل العنوان"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                />
              </div>
            </TabsContent>

            {/* Logo Upload Tab */}
            <TabsContent value="logo">
              <div className="flex flex-col h-full">
                <ImageUploadField
                  label="الشعار"
                  previewUrl={previewUrl}
                  onChange={handleFileChange}
                  error={errors.logo}
                />
                {imageLoading && (
                  <div className="flex justify-center items-center mt-4">
                    <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            </TabsContent>
          </div>

          {/* Single Error Message */}
          <div className="mt-4 px-4">
            {Object.entries(errors).map(([field, message]) => (
              <p key={field} className="text-sm text-destructive">
                {message}
              </p>
            ))}
          </div>

          {/* Fixed Submit Button */}
          <div className="w-full bg-background py-4 border-t border-border">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={submitLoading} // Disable button while loading
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {submitLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري
                  الحفظ...
                </>
              ) : (
                "حفظ التغييرات"
              )}
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
