// app/(ecommerce)/layout.tsx
import { TooltipProvider } from "../../components/ui/tooltip";
import { companyInfo } from "./homepage/actions/companyDetail";
import Fotter from "../../components/ecomm/Fotter/Fotter";
import Header from "../../components/ecomm/Header/Header";

// import Header from "./homepage/component/Header";

export default async function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const companyData = await companyInfo();
  return (
    <TooltipProvider>
      {/* Header is shared across all e-commerce pages */}
      <Header />
      <main className="container mx-auto p-4">{children}</main>
      <Fotter
        aboutus={companyData?.bio}
        email={companyData?.email}
        phone={companyData?.phoneNumber}
        address={companyData?.address}
        latitude={companyData?.latitude}
        longitude={companyData?.longitude}
      />
    </TooltipProvider>
  );
}
