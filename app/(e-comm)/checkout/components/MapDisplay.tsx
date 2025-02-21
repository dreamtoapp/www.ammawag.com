// components/MapDisplay.tsx
"use client";

export default function MapDisplay({
  coordinates,
}: {
  coordinates: { lat: number | null; lng: number | null };
}) {
  if (!coordinates.lat || !coordinates.lng) {
    return (
      <p className="text-red-500 text-sm text-center mt-2">
        لم يتم تحديد الموقع بعد.
      </p>
    );
  }

  return (
    <iframe
      src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&output=embed&z=18&maptype=satellite`}
      width="100%"
      height="250"
      className="rounded-lg mt-3 border border-gray-300 shadow-sm"
      allowFullScreen
    ></iframe>
  );
}
