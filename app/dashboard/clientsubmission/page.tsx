// app/dashboard/contact/page.tsx
import { Suspense } from "react";
import { fetchSubmissions } from "./actions/fetchSubmissions";
import RealTimeTable from "./component/RealTimeTable";

export default async function ContactPage() {
  const submissions = await fetchSubmissions();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">رسائل العملاء</h1>
      {/* Pass initial submissions to the client-side RealTimeTable */}
      <Suspense fallback={<div>Loading...</div>}>
        <RealTimeTable initialSubmissions={submissions} />
      </Suspense>
    </div>
  );
}
