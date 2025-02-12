// components/SupplierForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SupplierForm({ supplier, onSubmit }: any) {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    await onSubmit(data);
    reset(); // Clear the form after submission
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        {...register("name")}
        placeholder="Supplier Name"
        defaultValue={supplier?.name || ""}
      />
      <Input
        {...register("email")}
        placeholder="Email"
        defaultValue={supplier?.email || ""}
      />
      <Input
        {...register("phone")}
        placeholder="Phone"
        defaultValue={supplier?.phone || ""}
      />
      <Input
        {...register("address")}
        placeholder="Address"
        defaultValue={supplier?.address || ""}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
