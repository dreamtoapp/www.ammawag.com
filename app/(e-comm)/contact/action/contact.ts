// app/contact/action/contact.ts
"use server";
import { revalidatePath } from "next/cache";
import db from "../../../../lib/prisma";
import { pusher } from "../../../../lib/pusher";

export type SubmitFormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  prevState: SubmitFormState,
  formData: FormData
): Promise<SubmitFormState> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Save data to the database using Prisma
    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    // Trigger a Pusher event
    await pusher.trigger("contact-submissions", "new-submission", {
      id: submission.id,
      name: submission.name,
      email: submission.email,
      subject: submission.subject,
      message: submission.message,
      createdAt: submission.createdAt.toISOString(),
    });

    // Revalidate the dashboard path
    revalidatePath("/dashboard/contact");
    console.log("Dashboard revalidated");

    return {
      success: true,
      message: "تم إرسال الرسالة بنجاح!",
    };
  } catch (error) {
    console.error("خطأ في إرسال نموذج الاتصال:", error);
    return {
      success: false,
      message: "فشل في إرسال الرسالة. حاول مرة أخرى.",
    };
  }
}
