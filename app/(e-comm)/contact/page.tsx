// app/contact/ContactForm.tsx
"use client";
import React from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { submitContactForm } from "./action/contact";

const ContactForm: React.FC = () => {
  // Define the initial state
  const initialState = {
    success: false,
    message: "",
  };

  // Use useActionState with the refactored submitContactForm
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  // Display toast notifications when the state changes
  React.useEffect(() => {
    if (state.message) {
      state.success ? toast.success(state.message) : toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold mb-4 text-center">تواصل معنا</h1>
      <form action={formAction} className="space-y-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            الاسم
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="أدخل اسمك"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            البريد الإلكتروني
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="أدخل بريدك الإلكتروني"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>

        {/* Subject Field */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            الموضوع
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="أدخل الموضوع"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            الرسالة
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            placeholder="أدخل رسالتك"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            disabled={isPending}
          >
            {isPending ? "جاري الإرسال..." : "إرسال الرسالة"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
