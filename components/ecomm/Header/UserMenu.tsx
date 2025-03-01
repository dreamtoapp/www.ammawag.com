"use client"; // Mark this as a Client Component

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  User as UserIcon,
  ShoppingCart,
  Heart,
  Activity,
  LogIn,
  UserPlus,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes"; // Import useTheme

// Define the UserMenuProps type
interface UserMenuProps {
  isLoggedIn: boolean;
  user: { name: string; avatar?: string };
  isArabic: boolean;
  toggleLanguage: () => void;
}

export default function UserMenu({
  isLoggedIn,
  user,
  isArabic,
  toggleLanguage,
}: UserMenuProps) {
  const { theme, setTheme } = useTheme(); // Use the useTheme hook
  const isDark = theme === "dark"; // Determine if the theme is dark

  const handleDisabledClick = () => {
    alert("يجب تسجيل الدخول لاستخدام هذه الميزة.");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="فتح قائمة المستخدم"
          className="p-2 rounded-full hover:bg-primary/10 transition-all"
        >
          {isLoggedIn ? (
            <Avatar>
              <AvatarImage src={user.avatar || ""} alt={user.name} />
              <AvatarFallback>{user.name?.[0]}</AvatarFallback>
            </Avatar>
          ) : (
            <UserIcon size={16} className="text-primary" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-background border border-border"
      >
        {/* ملف المستخدم */}
        <DropdownMenuItem
          disabled={!isLoggedIn}
          onClick={!isLoggedIn ? handleDisabledClick : undefined}
        >
          <Link
            href={isLoggedIn ? "/profile" : "#"}
            className="flex items-center gap-2 w-full"
          >
            <UserIcon size={16} />
            <span>ملفي الشخصي</span>
          </Link>
        </DropdownMenuItem>

        {/* الطلبات */}
        <DropdownMenuItem
          disabled={!isLoggedIn}
          onClick={!isLoggedIn ? handleDisabledClick : undefined}
        >
          <Link
            href={isLoggedIn ? "/orders" : "#"}
            className="flex items-center gap-2 w-full"
          >
            <ShoppingCart size={16} />
            <span>الطلبات</span>
          </Link>
        </DropdownMenuItem>

        {/* المفضلة */}
        <DropdownMenuItem
          disabled={!isLoggedIn}
          onClick={!isLoggedIn ? handleDisabledClick : undefined}
        >
          <Link
            href={isLoggedIn ? "/favorites" : "#"}
            className="flex items-center gap-2 w-full"
          >
            <Heart size={16} />
            <span>المفضلة</span>
          </Link>
        </DropdownMenuItem>

        {/* عرض الحركات */}
        <DropdownMenuItem
          disabled={!isLoggedIn}
          onClick={!isLoggedIn ? handleDisabledClick : undefined}
        >
          <Link
            href={isLoggedIn ? "/activity" : "#"}
            className="flex items-center gap-2 w-full"
          >
            <Activity size={16} />
            <span>عرض الحركات</span>
          </Link>
        </DropdownMenuItem>

        {/* فاصل */}
        <DropdownMenuSeparator />

        {/* تغيير الثيم */}
        <DropdownMenuItem>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")} // Toggle theme
            className="flex items-center gap-2 w-full"
          >
            {isDark ? (
              <Sun size={16} className="text-primary" />
            ) : (
              <Moon size={16} className="text-primary" />
            )}
            <span>
              {isDark ? "تبديل إلى الوضع النهاري" : "تبديل إلى الوضع الليلي"}
            </span>
          </button>
        </DropdownMenuItem>

        {/* تغيير اللغة */}
        <DropdownMenuItem>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 w-full"
          >
            {isArabic ? "🇬🇧 EN" : "🇸🇦 العربية"}
            <span>{isArabic ? "English" : "العربية"}</span>
          </button>
        </DropdownMenuItem>

        {/* فاصل */}
        <DropdownMenuSeparator />

        {/* تسجيل الخروج أو تسجيل الدخول */}
        {isLoggedIn ? (
          <DropdownMenuItem>
            <button
              onClick={() => alert("تسجيل الخروج")}
              className="flex items-center gap-2 w-full text-destructive"
            >
              <LogOut size={16} />
              <span>تسجيل الخروج</span>
            </button>
          </DropdownMenuItem>
        ) : (
          <>
            {/* تسجيل الدخول */}
            <DropdownMenuItem>
              <Link href="/login" className="flex items-center gap-2 w-full">
                <LogIn size={16} />
                <span>تسجيل الدخول</span>
              </Link>
            </DropdownMenuItem>

            {/* التسجيل */}
            <DropdownMenuItem>
              <Link href="/register" className="flex items-center gap-2 w-full">
                <UserPlus size={16} />
                <span>التسجيل</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
