"use client";
import { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

// Define the User type
interface User {
  name: string;
  avatar?: string; // Optional
}

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Login state
  const [user, setUser] = useState<User>({ name: "John Doe", avatar: "" }); // User data
  const [isDark, setIsDark] = useState<boolean>(false); // Theme state
  const [isArabic, setIsArabic] = useState<boolean>(false); // Language state

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md shadow-md py-3 md:py-4 px-4 md:px-6 flex justify-between items-center border-b border-border h-[70px]">
      {/* Logo */}
      <Logo />
      {/* Navigation Links (Hidden on Mobile) */}
      <div className="hidden md:flex">
        <NavLinks />
      </div>
      {/* Right Actions (Cart, User Avatar) */}
      <div className="flex items-center gap-4 md:gap-6">
        <CartIcon />
        {/* User Avatar or Login/Register Menu */}
        <UserMenu
          isLoggedIn={isLoggedIn}
          user={user}
          isDark={isDark}
          toggleTheme={() => setIsDark(!isDark)}
          isArabic={isArabic}
          toggleLanguage={() => setIsArabic(!isArabic)}
        />
        {/* Mobile Menu Button */}
        <MobileMenu />
      </div>
    </header>
  );
}
