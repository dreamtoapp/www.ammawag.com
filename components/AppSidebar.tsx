import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Text from "./Text";

// Define navigation groups as data
const NAVIGATION_GROUPS = [
  {
    title: "الرئسية",
    links: [
      { label: "الموردين", href: "/dashboard/suppliers" },
      { label: "المنتجات", href: "/dashboard/product-management" },
      { label: "الطلبيات", href: "/dashboard/orders" },
    ],
  },
  {
    title: "اداري",
    links: [
      { label: "السواقين", href: "/dashboard/drivers" },
      { label: "العروض", href: "/dashboard/promotions" },
      { label: "معلومات عامة", href: "/dashboard/general-info" },
    ],
  },
];

// Reusable Navigation Link Component
function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block w-full py-2 px-3 text-sm rounded-md hover:bg-blue-400 hover:text-white transition-colors"
    >
      <Text variant="p" locale="ar" className="text-gray-800" cairoFont>
        {label}
      </Text>
    </Link>
  );
}

export function AppSidebar() {
  return (
    <Sidebar className="bg-gray-100 text-gray-800" side="right">
      {/* Header */}
      <SidebarHeader className="bg-blue-600 p-4 flex justify-center items-center border-b">
        <Image
          src="/assets/logo.png"
          alt="امواج للمياة الصحية"
          width={180}
          height={100}
          priority
        />
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="p-4 space-y-2">
        {NAVIGATION_GROUPS.map((group, index) => (
          <SidebarGroup key={index} className="bg-gray-100">
            {/* Group Title */}
            <Text
              className="font-semibold text-sm mb-2 text-gray-700"
              variant="p"
              locale="ar"
              cairoFont
            >
              {group.title}
            </Text>

            {/* Navigation Links */}
            <div className="space-y-1">
              {group.links.map((link, idx) => (
                <NavItem key={idx} href={link.href} label={link.label} />
              ))}
            </div>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t">
        <Button variant="outline" className="w-full">
          <Text
            className="font-semibold text-sm mb-2 text-gray-700"
            variant="p"
            locale="ar"
            cairoFont
          >
            تسجيل الخروج
          </Text>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
