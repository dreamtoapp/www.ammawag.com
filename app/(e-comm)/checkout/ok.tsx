"use client";
import { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../../components/ui/input-otp";

// Dynamically import CartSummary to improve performance
const CartSummary = dynamic(() => import("../cart/component/CartSummary"), {
  ssr: false,
});

export default function ConfirmPage() {
  const [isClient, setIsClient] = useState(false);
  const [useGeolocation, setUseGeolocation] = useState(true);
  const [manualAddress, setManualAddress] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [savedAddress, setSavedAddress] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: true, maximumAge: 0 },
      userDecisionTimeout: 5000,
    });

  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  useEffect(() => {
    setIsClient(true);
    if (isLogin) {
      setSavedAddress("123 شارع الملك فهد، الرياض، السعودية");
      setSelectedAddress("123 شارع الملك فهد، الرياض، السعودية");
      setUserName("أحمد");
    } else {
      setSavedAddress(null);
      setSelectedAddress(null);
      setUserName(null);
    }
  }, [isLogin]);

  useEffect(() => {
    if (isClient && !isLogin && coords) {
      setCoordinates({ lat: coords.latitude, lng: coords.longitude });
      setSelectedAddress(
        `خط العرض: ${coords.latitude}, خط الطول: ${coords.longitude}`
      );
    }
  }, [isClient, coords, isLogin]);

  const handleSelectAddress = (address: string) => {
    setSelectedAddress(address);
    setShowAddressDialog(false);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
    return phoneRegex.test(phone);
  };

  const handleCheckout = () => {
    if (!selectedAddress) {
      alert("يرجى اختيار عنوان التوصيل قبل المتابعة.");
      return;
    }

    if (!isLogin && (!userName || !userPhone)) {
      alert("يرجى إدخال الاسم ورقم الهاتف للمتابعة.");
      return;
    }

    if (!isLogin && !validatePhone(userPhone || "")) {
      alert("يرجى إدخال رقم هاتف صحيح.");
      return;
    }

    if (!isLogin && !agreeToTerms) {
      alert("يرجى الموافقة على الشروط والأحكام للمتابعة.");
      return;
    }

    if (!isLogin && !otpVerified) {
      setShowOtpDialog(true);
      return;
    }

    alert(`تم تأكيد الطلب! العنوان المختار: ${selectedAddress}`);
  };

  const handleVerifyOtp = () => {
    // هنا يمكنك إضافة منطق التحقق من OTP
    // على سبيل المثال، يمكنك إرسال الرمز إلى الخادم والتحقق منه
    if (otp === "123456") {
      // هذا رمز وهمي للتوضيح
      setOtpVerified(true);
      setShowOtpDialog(false);
      alert("تم التحقق من الرمز بنجاح!");
    } else {
      alert("الرمز غير صحيح، يرجى المحاولة مرة أخرى.");
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md lg:max-w-3xl shadow-lg rounded-lg border border-gray-200">
        <CardContent className="p-6 pb-20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            تأكيد الطلب
          </h2>
          {isLogin ? (
            <p className="text-lg text-gray-700 font-medium text-center mb-4">
              مرحبًا، {userName} 👋
            </p>
          ) : (
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
              {!isGeolocationAvailable || !isGeolocationEnabled ? (
                <p className="text-red-500 text-sm text-center mt-2">
                  لا يمكن الوصول إلى موقعك الحالي. يرجى تمكين خدمات الموقع.
                </p>
              ) : (
                <p className="text-green-500 text-sm text-center mt-2">
                  يتم استخدام موقعك الحالي كعنوان التوصيل الافتراضي.
                </p>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
            <CartSummary />
            <div>
              <p className="font-medium text-gray-700">عنوان التوصيل:</p>
              <div className="p-4 bg-gray-50 border rounded-lg mb-4">
                <p className="text-gray-600">
                  {selectedAddress || "لم يتم تحديد عنوان بعد"}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowAddressDialog(true)}
                  className="mt-2 w-full"
                >
                  اختيار عنوان مختلف
                </Button>
              </div>
              {selectedAddress && (
                <iframe
                  src={`https://www.google.com/maps?q=${
                    selectedAddress.includes("خط العرض")
                      ? `${coordinates.lat},${coordinates.lng}`
                      : encodeURIComponent(selectedAddress)
                  }&output=embed&z=18&maptype=satellite`}
                  width="100%"
                  height="250"
                  className="rounded-lg mt-3 border border-gray-300 shadow-sm"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
          {!isLogin && (
            <div className="mt-4">
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-500"
                />
                <span>
                  أوافق على{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTermsDialog(true);
                    }}
                    className="text-blue-500 underline"
                  >
                    الشروط والأحكام
                  </a>{" "}
                  وسياسة الخصوصية.
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                الموافقة ضرورية لتأكيد الطلب.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="fixed bottom-0 left-0 w-full bg-white p-5 shadow-md flex flex-col items-center border-t border-gray-300 backdrop-blur-sm gap-3">
        <Button
          onClick={handleCheckout}
          disabled={!isLogin && !agreeToTerms}
          className="w-full max-w-md lg:max-w-3xl py-3 font-medium text-lg transition-opacity disabled:opacity-50"
        >
          المتابعة إلى الدفع
        </Button>
      </div>
      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>اختيار عنوان التوصيل</DialogTitle>
          </DialogHeader>
          {isLogin && savedAddress && (
            <Button
              variant="outline"
              onClick={() => handleSelectAddress(savedAddress)}
              className="w-full mb-2"
            >
              استخدم العنوان المسجل: {savedAddress}
            </Button>
          )}
          {useGeolocation && coordinates.lat && coordinates.lng && (
            <Button
              variant="outline"
              onClick={() =>
                handleSelectAddress(
                  `خط العرض: ${coordinates.lat}, خط الطول: ${coordinates.lng}`
                )
              }
              className="w-full mb-2"
            >
              استخدم موقعي الحالي
            </Button>
          )}
          <Input
            type="text"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            placeholder="أدخل عنوانًا يدويًا"
            className="mt-2 w-full border border-gray-300 rounded-md p-2"
          />
          <Button
            onClick={() => handleSelectAddress(manualAddress)}
            className="w-full mt-2"
          >
            استخدام هذا العنوان
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>الشروط والأحكام وسياسة الخصوصية</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-700">
            هذه هي الشروط والأحكام الوهمية الخاصة بنا. يرجى قراءتها بعناية:
            <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
              <li>يجب عليك الموافقة على الشروط لاستخدام الخدمة.</li>
              <li>لن نشارك بياناتك الشخصية مع أي طرف ثالث.</li>
              <li>جميع الطلبات تخضع لسياسات الإرجاع والاستبدال.</li>
            </ul>
          </div>
          <Button
            onClick={() => setShowTermsDialog(false)}
            className="w-full mt-4"
          >
            إغلاق
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent
          className="max-w-sm flex flex-col items-center"
          dir="ltr"
        >
          <DialogHeader>
            <DialogTitle>التحقق من الرمز المؤقت (OTP)</DialogTitle>
          </DialogHeader>

          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <Button onClick={handleVerifyOtp} className="w-full mt-2">
            التحقق
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
