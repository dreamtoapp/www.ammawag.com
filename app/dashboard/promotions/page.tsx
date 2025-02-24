"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { addPromotion } from "./actions/Actions";
import { useRouter } from "next/navigation";

export default function AddOfferPage() {
  const router = useRouter();
  const handleAddPromotion = async (formData: FormData) => {
    try {
      // Validate and transform form data
      const productIds =
        formData.get("productIds")?.toString().split(",") || [];
      const startDate = formData.get("startDate")?.toString();
      const endDate = formData.get("endDate")?.toString();
      const payload = {
        title: formData.get("title")?.toString() || "بدون عنوان",
        description: formData.get("description")?.toString() || "لا يوجد وصف",
        imageUrl: formData.get("imageUrl")?.toString() || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        discount: parseFloat(formData.get("discount")?.toString() || "0"),
        productIds: productIds.filter(Boolean), // Remove empty strings
      };
      // await addPromotion(payload);
      window.location.href = "/offers"; // Redirect to the offers list after adding
    } catch (error) {
      console.error("خطأ في إضافة العرض:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">إضافة عرض جديد</h1>
      <Card>
        <CardHeader>
          <CardTitle>إضافة عرض جديد</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleAddPromotion} className="space-y-4">
            <Input name="title" placeholder="العنوان" required />
            <Input name="description" placeholder="الوصف" required />
            <Input name="imageUrl" placeholder="رابط الصورة" />
            <Input name="startDate" type="date" required />
            <Input name="endDate" type="date" required />
            <Input name="discount" type="number" placeholder="الخصم" required />
            <Input
              name="productIds"
              placeholder="معرّفات المنتجات (مفصولة بفاصلة)"
              required
            />
            <Button type="submit">إضافة العرض</Button>
            <Button
              type="button"
              variant={"link"}
              onClick={() => {
                router.push("/dashboard/promotions/showalloffers");
              }}
            >
              مشاهدة جميع العروض
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
