// components/Checkout/UserForm.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UserForm({
  userName,
  setUserName,
  userPhone,
  setUserPhone,
  setIsLogin,
}: {
  userName: string;
  setUserName: (value: string) => void;
  userPhone: string;
  setUserPhone: (value: string) => void;
  setIsLogin: (value: boolean) => void;
}) {
  return (
    <div className="mb-4 space-y-4">
      <p className="text-lg text-gray-700 font-medium text-center">
        أنت تتصفح كزائر 🌐
      </p>
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="اسمك الكامل"
          value={userName || ""}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full"
        />
        <Input
          type="tel"
          placeholder="رقم هاتفك"
          value={userPhone || ""}
          onChange={(e) => setUserPhone(e.target.value)}
          className="w-full"
        />
      </div>
      <Button
        variant="outline"
        onClick={() => setIsLogin(true)}
        className="w-full mt-2"
      >
        تسجيل الدخول أو إنشاء حساب
      </Button>
    </div>
  );
}
