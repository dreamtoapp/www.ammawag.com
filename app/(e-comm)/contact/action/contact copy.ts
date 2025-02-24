// app/actions/contact.ts
"use server";

import { revalidatePath } from "next/cache";
import db from "../../../../lib/prisma";

export type SubmitFormState = {
  success: boolean;
  message: string;
  submission?: {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
  };
};

export async function submitContactForm(
  prevState: SubmitFormState,
  formData: FormData,
  ...args: any[]
): Promise<SubmitFormState> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // حفظ البيانات في قاعدة البيانات باستخدام Prisma
    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    revalidatePath("/dashboard/clientsubmission");

    return {
      success: true,
      message: "تم إرسال الرسالة بنجاح!",
      submission: {
        id: submission.id,
        name: submission.name,
        email: submission.email,
        subject: submission.subject,
        message: submission.message,
        createdAt: submission.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("خطأ في إرسال نموذج الاتصال:", error);
    return {
      success: false,
      message: "فشل في إرسال الرسالة. حاول مرة أخرى.",
    };
  }
}
