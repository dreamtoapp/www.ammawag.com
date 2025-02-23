// app/dashboard/contact/RealTimeTable.tsx
"use client";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "@/components/Notification";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// Define the Submission type
export type Submission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string; // Pre-formatted date string
};

// Props for RealTimeTable
type RealTimeTableProps = {
  initialSubmissions: Submission[]; // Define the type for the prop
};

export default function RealTimeTable({
  initialSubmissions,
}: RealTimeTableProps) {
  const [submissions, setSubmissions] =
    useState<Submission[]>(initialSubmissions);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    // Subscribe to the Pusher channel
    const channel = pusher.subscribe("contact-submissions");
    channel.bind("new-submission", (newSubmission: Submission) => {
      // Format the date before adding it to the state
      const formattedSubmission = {
        ...newSubmission,
        createdAt: format(
          new Date(newSubmission.createdAt),
          "dd/MM/yyyy HH:mm:ss",
          {
            locale: ar,
          }
        ),
      };

      setSubmissions((prevSubmissions) => [
        ...prevSubmissions,
        formattedSubmission,
      ]);

      // Show a notification for the new submission
      setNotification(`رسالة جديدة من ${newSubmission.name}`);
      setTimeout(() => setNotification(null), 5000); // Auto-dismiss after 5 seconds
    });

    // Cleanup on unmount
    return () => {
      pusher.unsubscribe("contact-submissions");
    };
  }, []);

  return (
    <div className="p-6 relative">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <Notification
            key="notification"
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

      {/* Table */}
      <h1 className="text-2xl font-bold mb-4 text-right">الرسائل الواردة</h1>

      {/* Total Messages Count */}
      <div className="mb-4 text-right">
        <span className="text-gray-700 font-medium">
          إجمالي الرسائل: {submissions.length}
        </span>
      </div>

      <Table>
        {/* Styled Table Header */}
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-right font-bold text-gray-800">
              الاسم
            </TableHead>
            <TableHead className="text-right font-bold text-gray-800">
              البريد الإلكتروني
            </TableHead>
            <TableHead className="text-right font-bold text-gray-800">
              الموضوع
            </TableHead>
            <TableHead className="text-right font-bold text-gray-800">
              الرسالة
            </TableHead>
            <TableHead className="text-right font-bold text-gray-800">
              تاريخ الاستلام
            </TableHead>
            <TableHead className="text-right font-bold text-gray-800">
              الإجراءات
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          <AnimatePresence>
            {submissions.map((submission, index) => (
              <motion.tr
                key={submission.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <TableCell className="text-right">{submission.name}</TableCell>
                <TableCell className="text-right">{submission.email}</TableCell>
                <TableCell className="text-right">
                  {submission.subject}
                </TableCell>
                <TableCell className="text-right">
                  {submission.message}
                </TableCell>
                <TableCell className="text-right">
                  {submission.createdAt}
                </TableCell>
                <TableCell className="text-right">
                  {/* Reply Button */}
                  <Button variant="outline" className="w-full">
                    رد
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}
