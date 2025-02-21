// components/Checkout/TermsDialog.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function TermsDialog({
  showTermsDialog,
  setShowTermsDialog,
}: {
  showTermsDialog: boolean;
  setShowTermsDialog: (value: boolean) => void;
}) {
  return (
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
  );
}
