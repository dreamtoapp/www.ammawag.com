// app/components/AppSidebar.tsx
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
import Text from "@/components/Text";
import {
  Home,
  Truck,
  Package,
  Users,
  Percent,
  Settings,
  LogOut,
  ListOrdered,
  ShoppingBasket,
  Timer,
} from "lucide-react";

// Define navigation groups as data
const NAVIGATION_GROUPS = [
  {
    title: "الرئسية",
    links: [
      {
        label: "الطلبيات",
        href: "/dashboard",
        icon: <ListOrdered className="h-5 w-5 text-muted-foreground ml-2" />,
      },
      {
        label: "الموردين",
        href: "/dashboard/suppliers",
        icon: <ShoppingBasket className="h-5 w-5 text-muted-foreground ml-2" />,
      },
      {
        label: "المنتجات",
        href: "/dashboard/porductmangment",
        icon: <Package className="h-5 w-5 text-muted-foreground ml-2" />,
      },
    ],
  },
  {
    title: "اداري",
    links: [
      {
        label: "السواقين",
        href: "/dashboard/drivers",
        icon: <Truck className="h-5 w-5 text-muted-foreground ml-2" />,
      },
      {
        label: "العروض",
        href: "/dashboard/promotions",
        icon: <Percent className="h-5 w-5 text-muted-foreground ml-2" />,
      },
      {
        label: "الوردبات",
        href: "/dashboard/shifts",
        icon: <Timer className="h-5 w-5 text-muted-foreground ml-2" />,
      },
      {
        label: "الاعدادت",
        href: "/dashboard/setting",
        icon: <Settings className="h-5 w-5 text-muted-foreground ml-2" />,
      },
    ],
  },
];

// Reusable Navigation Link Component
function NavItem({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center w-full py-2 px-3 text-sm rounded-md hover:bg-blue-400 hover:text-white transition-colors"
    >
      {/* Icon */}
      <span className="mr-2">{icon}</span>
      {/* Label */}
      <Text
        variant="p"
        locale="ar"
        className="text-gray-800 font-cairo"
        cairoFont
      >
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
                <NavItem
                  key={idx}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                />
              ))}
            </div>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          {/* Logout Icon */}
          <LogOut className="mr-2 h-4 w-4" />
          <Text
            className="font-semibold text-sm text-gray-700"
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
