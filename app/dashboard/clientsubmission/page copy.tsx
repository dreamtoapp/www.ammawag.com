// app/dashboard/contact/page.tsx
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { fetchContactSubmissions } from "./actions/action";
import { Suspense } from "react";
import ReplyDialog from "./component/Replay";

// Server component: Fetches and passes data to the client
export default async function ContactPage() {
  const submissions = await fetchContactSubmissions();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Submissions</h1>

      {/* Table to Display Submissions */}
      <Suspense fallback={<div>Loading...</div>}>
        {submissions.length}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Received At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.name}</TableCell>
                <TableCell>{submission.email}</TableCell>
                <TableCell>{submission.subject}</TableCell>
                <TableCell>{submission.message}</TableCell>
                <TableCell>
                  {new Date(submission.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <ReplyDialog submission={submission} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Suspense>
    </div>
  );
}
