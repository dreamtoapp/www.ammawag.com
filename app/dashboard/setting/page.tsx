"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { fetchCompany, saveCompany } from "./actions/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Mail,
  Phone,
  User,
  Globe,
  MapPin,
  Link,
  CreditCard,
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
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

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

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
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

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (coords) {
      setLatitude(coords.latitude.toString());
      setLongitude(coords.longitude.toString());
    }
  }, [coords]);

  return (
    <div className="flex justify-center items-center min-h-screen font-cairo p-4 bg-gray-50">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            إعدادات الشركة
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[75vh] overflow-hidden">
          <form action={handleSubmit} className="flex flex-col gap-4">
            <ScrollArea className="flex-1 overflow-y-auto max-h-[60vh] px-4">
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-10 w-full" />
                  ))}
                  {/* هيكل عظمي للخريطة */}
                  <Skeleton className="h-[200px] w-full" />
                </div>
              ) : (
                <div className="flex flex-col gap-6 w-full">
                  {/* General Section */}
                  <div className="space-y-4 ">
                    <h3 className="text-xl font-semibold border-b pb-2 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      المعلومات العامة
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">الاسم الكامل</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="الاسم الكامل"
                        defaultValue={company?.fullName || ""}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="البريد الإلكتروني"
                        defaultValue={company?.email || ""}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">الوصف</Label>
                      <Input
                        id="bio"
                        name="bio"
                        placeholder="الوصف"
                        defaultValue={company?.bio || ""}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b pb-2 flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      معلومات الاتصال
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="رقم الهاتف"
                        defaultValue={company?.phoneNumber || ""}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profilePicture">صورة الشعار</Label>
                      <Input
                        id="profilePicture"
                        name="profilePicture"
                        placeholder="رابط صورة الشعار"
                        defaultValue={company?.profilePicture || ""}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Social Media Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b pb-2 flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      وسائل التواصل الاجتماعي
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="twitter">تويتر</Label>
                        <Input
                          id="twitter"
                          name="twitter"
                          placeholder="رابط تويتر"
                          defaultValue={company?.twitter || ""}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">لينكد إن</Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          placeholder="رابط لينكد إن"
                          defaultValue={company?.linkedin || ""}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instagram">إنستغرام</Label>
                        <Input
                          id="instagram"
                          name="instagram"
                          placeholder="رابط إنستغرام"
                          defaultValue={company?.instagram || ""}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="facebook">فيسبوك</Label>
                        <Input
                          id="facebook"
                          name="facebook"
                          placeholder="رابط فيسبوك"
                          defaultValue={company?.facebook || ""}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="snapchat">سناب شات</Label>
                        <Input
                          id="snapchat"
                          name="snapchat"
                          placeholder="رابط سناب شات"
                          defaultValue={company?.snapchat || ""}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tax Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b pb-2 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      المعلومات الضريبية
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                      <Input
                        id="taxNumber"
                        name="taxNumber"
                        placeholder="الرقم الضريبي"
                        defaultValue={company?.taxNumber || ""}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxQrImage">
                        صورة رمز الاستجابة السريعة الضريبي
                      </Label>
                      <Input
                        id="taxQrImage"
                        name="taxQrImage"
                        placeholder="رابط صورة رمز الاستجابة السريعة الضريبي"
                        defaultValue={company?.taxQrImage || ""}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b pb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      الموقع
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="address">العنوان</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="العنوان"
                        defaultValue={company?.address || ""}
                        className="w-full"
                      />
                    </div>
                    {isGeolocationAvailable && isGeolocationEnabled ? (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          خط العرض: {latitude}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          خط الطول: {longitude}
                        </p>
                        {/* عرض الخريطة باستخدام Google Maps */}
                        {latitude && longitude && (
                          <iframe
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                            allowFullScreen
                          ></iframe>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        تحديد الموقع غير متاح أو غير مفعل.
                      </p>
                    )}
                    <Input
                      name="latitude"
                      type="hidden"
                      value={latitude}
                      readOnly
                    />
                    <Input
                      name="longitude"
                      type="hidden"
                      value={longitude}
                      readOnly
                    />
                  </div>
                </div>
              )}
            </ScrollArea>
            {/* زر "حفظ التغييرات" يظهر دائمًا */}
            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  جاري الحفظ...
                </>
              ) : (
                "حفظ التغييرات"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
