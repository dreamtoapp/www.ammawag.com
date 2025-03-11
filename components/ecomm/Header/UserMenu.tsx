"use client";
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
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [hasPhone, setHasPhone] = useState(false);

  useEffect(() => {
    const checkPhone = () => {
      const storedPhone = localStorage.getItem("phone");
      setHasPhone(!!storedPhone);
    };

    checkPhone();
    window.addEventListener("storage", checkPhone);
    return () => window.removeEventListener("storage", checkPhone);
  }, []);

  const handleDisabledClick = () => {
    alert("يجب تسجيل الدخول أو إدخال رقم الهاتف لاستخدام هذه الميزة.");
  };

  const getDisabledState = () => {
    return !isLoggedIn && !hasPhone;
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
        {/* Profile */}
        <DropdownMenuItem
          disabled={getDisabledState()}
          onClick={getDisabledState() ? handleDisabledClick : undefined}
        >
          {/* <Link
            href={isLoggedIn || hasPhone ? "/profile" : "#"}
            className="flex items-center gap-2 w-full"
          >
            <UserIcon size={16} />
            <span>ملفي الشخصي</span>
          </Link> */}
        </DropdownMenuItem>
        {/* Orders */}
        <DropdownMenuItem
          disabled={getDisabledState()}
          onClick={getDisabledState() ? handleDisabledClick : undefined}
        >
          <Link
            href={{
              pathname: isLoggedIn || hasPhone ? "/orders" : "/",
            }}
            className="flex items-center gap-2 w-full"
          >
            <ShoppingCart size={16} />
            <span>الطلبات</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={getDisabledState()}
          onClick={getDisabledState() ? handleDisabledClick : undefined}
        >
          <Link
            href={{
              pathname: isLoggedIn || hasPhone ? "/activity" : "/",
            }}
            className="flex items-center gap-2 w-full"
          >
            <Activity size={16} />
            <span>عرض الحركات</span>
          </Link>
        </DropdownMenuItem>
        {/* Rest of the menu items remain the same */}
        <DropdownMenuSeparator />
        {/* Theme Toggle */}
        <DropdownMenuItem>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
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
        {/* Language Toggle */}
        <DropdownMenuItem>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 w-full"
          >
            {isArabic ? "🇬🇧 EN" : "🇸🇦 العربية"}
            <span>{isArabic ? "English" : "العربية"}</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* // check if the use login */}
        {hasPhone ? (
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
            <DropdownMenuItem>
              <Link
                href={{ pathname: "/login" }}
                className="flex items-center gap-2 w-full"
              >
                <LogIn size={16} />
                <span>تسجيل الدخول</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                href={{ pathname: "/register" }}
                className="flex items-center gap-2 w-full"
              >
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
