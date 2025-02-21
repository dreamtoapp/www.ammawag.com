// app/(ecommerce)/layout.tsx

import Header from "./homepage/component/Header";

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header is shared across all e-commerce pages */}
      <Header />
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
}
