"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AddOfferPage() {
  const router = useRouter();

  const handleAddPromotion = async (formData: FormData) => {
    try {
      // Validate and transform form data
      const productIds =
        formData.get("productIds")?.toString().split(",") || [];
      const price = parseFloat(formData.get("price")?.toString() || "0");
      const discountPrice = parseFloat(
        formData.get("discountPrice")?.toString() || "0"
      );

      const payload = {
        title: formData.get("title")?.toString() || "بدون عنوان",
        description: formData.get("description")?.toString() || "لا يوجد وصف",
        imageUrl: formData.get("imageUrl")?.toString() || null,
        price: isNaN(price) ? null : price,
        discountPrice: isNaN(discountPrice) ? null : discountPrice,
        active: true, // Default value for active
        productIds: productIds.filter(Boolean), // Remove empty strings
      };

      console.log("Payload:", payload);
      // await addPromotion(payload); // Uncomment when ready to send data
      window.location.href = "/offers"; // Redirect to the offers list after adding
    } catch (error) {
      console.error("خطأ في إضافة العرض:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-background min-h-screen">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        إضافة عرض جديد
      </h1>

      {/* Card Section */}
      <Card className="shadow-lg border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-primary font-semibold">
            تفاصيل العرض
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleAddPromotion} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-foreground mb-2"
              >
                العنوان
              </label>
              <Input
                id="title"
                name="title"
                placeholder="العنوان"
                required
                className="border-input focus:border-primary focus:ring-primary bg-background text-foreground"
              />
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-foreground mb-2"
              >
                الوصف
              </label>
              <Input
                id="description"
                name="description"
                placeholder="الوصف"
                required
                className="border-input focus:border-primary focus:ring-primary bg-background text-foreground"
              />
            </div>

            {/* Image URL Field */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-foreground mb-2"
              >
                رابط الصورة
              </label>
              <Input
                id="imageUrl"
                name="imageUrl"
                placeholder="رابط الصورة"
                className="border-input focus:border-primary focus:ring-primary bg-background text-foreground"
              />
            </div>

            {/* Price Fields (Highlighted and Inline) */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                الأسعار
              </label>
              <div className="flex items-center space-x-4">
                {/* Original Price */}
                <div className="flex-1">
                  <label
                    htmlFor="price"
                    className="block text-xs font-medium text-muted-foreground mb-1"
                  >
                    السعر الأصلي
                  </label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="السعر الأصلي"
                    className="border-input focus:border-primary focus:ring-primary bg-background text-foreground"
                  />
                </div>

                {/* Discounted Price */}
                <div className="flex-1">
                  <label
                    htmlFor="discountPrice"
                    className="block text-xs font-medium text-muted-foreground mb-1"
                  >
                    السعر بعد الخصم
                  </label>
                  <Input
                    id="discountPrice"
                    name="discountPrice"
                    type="number"
                    placeholder="السعر بعد الخصم"
                    className="border-input focus:border-primary focus:ring-primary bg-background text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Product IDs Field */}
            <div>
              <label
                htmlFor="productIds"
                className="block text-sm font-medium text-foreground mb-2"
              >
                معرّفات المنتجات (مفصولة بفاصلة)
              </label>
              <Input
                id="productIds"
                name="productIds"
                placeholder="معرّفات المنتجات (مفصولة بفاصلة)"
                required
                className="border-input focus:border-primary focus:ring-primary bg-background text-foreground"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between space-x-4">
              {/* Submit Button */}
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium w-full"
              >
                إضافة العرض
              </Button>

              {/* View All Offers Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  router.push("/dashboard/promotions/showalloffers");
                }}
                className="border-border hover:bg-muted text-secondary-foreground w-full"
              >
                مشاهدة جميع العروض
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
