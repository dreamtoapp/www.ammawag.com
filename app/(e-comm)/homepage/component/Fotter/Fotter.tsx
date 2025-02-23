"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "lucide-react";
import { Home, Tag, Users, Phone } from "lucide-react"; // Import icons
import Link from "next/link";
import QuickLinks from "./QuickLinks";
import Newsletter from "./Newsletter";
import SocialMedia from "./SocialMedia";
import Copyright from "./Copyright";
import ContactInfo from "./ContactInfo";
import AboutUs from "./AboutUs";

interface FooterProps {
  aboutus?: string;
  email?: string;
  phone?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  socialMedia?: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
}

const Footer = ({
  aboutus,
  email,
  phone,
  address,
  latitude,
  longitude,
  socialMedia,
}: FooterProps) => {
  return (
    <footer className="bg-background text-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AboutUs aboutus={aboutus} />
          <QuickLinks />
          <ContactInfo
            email={email}
            phone={phone}
            address={address}
            latitude={latitude}
            longitude={longitude}
          />

          <Newsletter />
        </div>

        <Separator className="my-6" />

        <SocialMedia />

        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
