"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  fetchCompanySettings,
  newCompnay,
  updateCompnay,
} from "./actions/actions";
import GeneralTab from "./component/GeneralTab";
import ContactTab from "./component/ContactTab";
import SocialMediaTab from "./component/SocialMediaTab";
import TaxTab from "./component/TaxTab";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define CompanySettings type
interface CompanySettings {
  id: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string | null;
  profilePicture?: string | null;
  bio?: string | null;
  taxNumber?: string | null;
  taxQrImage?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  facebook?: string | null;
  snapchat?: string | null;
  website?: string | null;
  defaultShiftId?: string | null;
  defaultShift?: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
  } | null;
}

export default function SettingsPage() {
  const [initialData, setInitialData] = useState<CompanySettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const data = await fetchCompanySettings();
      setInitialData(
        data || {
          id: "",
          fullName: "",
          email: "",
          phoneNumber: null,
          profilePicture: null,
          bio: null,
          taxNumber: null,
          taxQrImage: null,
          twitter: null,
          linkedin: null,
          instagram: null,
          tiktok: null,
          facebook: null,
          snapchat: null,
          website: null,
          defaultShiftId: null,
          defaultShift: null,
        }
      );
    } catch (error) {
      console.error("Error fetching company settings:", error);
      toast.error("فشل تحميل الإعدادات.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const subMitForm = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      if (!initialData?.id) {
        await newCompnay(formData);
        toast.success("تم إنشاء الشركة بنجاح!");
      } else {
        await updateCompnay(formData, initialData.id);
        toast.success("تم تحديث إعدادات الشركة بنجاح!");
      }
    } catch (error) {
      console.error("Error saving company settings:", error);
      toast.error("فشل حفظ الإعدادات.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-cairo ">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800">
            إعدادات الشركة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={subMitForm} className="space-y-6">
            {/* ScrollArea Wrapper with Height & Overflow */}
            <ScrollArea
              className="h-[60vh] overflow-auto border rounded-lg p-4 "
              dir="rtl"
              type="always"
            >
              <AnimatePresence>
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 flex-col w-full">
                      <GeneralTab initialData={initialData!} />
                      <ContactTab initialData={initialData!} />
                      <SocialMediaTab initialData={initialData!} />
                      <TaxTab initialData={initialData!} />
                    </div>
                  </>
                )}
              </AnimatePresence>
            </ScrollArea>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg font-medium transition duration-300 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  جارٍ الحفظ...
                </>
              ) : initialData?.id ? (
                "حفظ التغييرات"
              ) : (
                "تأسيس جديد"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
