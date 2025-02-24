"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { fetchCompany, saveCompany } from "./actions/actions";
import {
  Globe,
  MapPin,
  Phone,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import { useGeolocated } from "react-geolocated";

interface Company {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  bio: string;
  taxNumber: string;
  taxQrImage: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  snapchat: string;
  website: string;
  address: string;
  latitude: string;
  longitude: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function SettingsPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    const loadCompany = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCompany();
        if (data) {
          setCompany(data);
          setLatitude(data.latitude || "");
          setLongitude(data.longitude || "");
        }
      } catch (error) {
        console.error("Error loading company:", error);
        toast.error("فشل تحميل بيانات الشركة.");
      } finally {
        setIsLoading(false);
      }
    };
    loadCompany();
  }, []);

  useEffect(() => {
    if (coords) {
      setLatitude(coords.latitude.toString());
      setLongitude(coords.longitude.toString());
    }
  }, [coords]);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);

      // Validate required fields
      const requiredFields = ["fullName", "email", "phoneNumber", "address"];
      const newErrors: { [key: string]: string } = {};
      requiredFields.forEach((field) => {
        if (!formData.get(field)) {
          newErrors[field] = `يرجى إدخال ${field}.`;
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      formData.set("latitude", latitude);
      formData.set("longitude", longitude);
      await saveCompany(formData);
      toast.success("تم حفظ بيانات الشركة بنجاح!");
    } catch (error) {
      console.error("Error saving company:", error);
      toast.error("فشل حفظ بيانات الشركة.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6 text-center">إعدادات الشركة</h1>
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <form action={handleSubmit} className="space-y-6">
          {/* General Section */}
          <Card>
            <CardHeader>
              <CardTitle>المعلومات العامة</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">الاسم الكامل</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={company?.fullName}
                  placeholder="أدخل الاسم الكامل"
                  className="mt-1"
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={company?.email}
                  placeholder="أدخل البريد الإلكتروني"
                  className="mt-1"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="bio">الوصف</Label>
                <Input
                  id="bio"
                  name="bio"
                  defaultValue={company?.bio}
                  placeholder="أدخل الوصف"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات الاتصال</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={company?.phoneNumber}
                  placeholder="أدخل رقم الهاتف"
                  className="mt-1"
                  aria-invalid={!!errors.phoneNumber}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="profilePicture">صورة الشعار</Label>
                <Input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media Section */}
          <Card>
            <CardHeader>
              <CardTitle>وسائل التواصل الاجتماعي</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="twitter">
                  <Twitter className="inline-block mr-2" /> تويتر
                </Label>
                <Input
                  id="twitter"
                  name="twitter"
                  defaultValue={company?.twitter}
                  placeholder="أدخل رابط تويتر"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">
                  <Linkedin className="inline-block mr-2" /> لينكد إن
                </Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  defaultValue={company?.linkedin}
                  placeholder="أدخل رابط لينكد إن"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="facebook">
                  <Facebook className="inline-block mr-2" /> فيسبوك
                </Label>
                <Input
                  id="facebook"
                  name="facebook"
                  defaultValue={company?.facebook}
                  placeholder="أدخل رابط فيسبوك"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="instagram">
                  <Instagram className="inline-block mr-2" /> إنستغرام
                </Label>
                <Input
                  id="instagram"
                  name="instagram"
                  defaultValue={company?.instagram}
                  placeholder="أدخل رابط إنستغرام"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Section */}
          <Card>
            <CardHeader>
              <CardTitle>الموقع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">العنوان</Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={company?.address}
                  placeholder="أدخل العنوان"
                  className="mt-1"
                  aria-invalid={!!errors.address}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {isGeolocationAvailable && isGeolocationEnabled ? (
                    <>
                      خط العرض: {latitude}
                      <br />
                      خط الطول: {longitude}
                    </>
                  ) : (
                    "تحديد الموقع غير متاح أو غير مفعل."
                  )}
                </p>
                {!coords && (
                  <Button
                    type="button"
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            setLatitude(position.coords.latitude.toString());
                            setLongitude(position.coords.longitude.toString());
                          },
                          (error) => {
                            console.error("Error getting geolocation:", error);
                            toast.error("فشل تحديد الموقع.");
                          }
                        );
                      }
                    }}
                    className="mt-2"
                  >
                    تحديد الموقع يدويًا
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 transition"
            disabled={isSubmitting}
            aria-label="حفظ التغييرات"
          >
            {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </form>
      )}
    </div>
  );
}
