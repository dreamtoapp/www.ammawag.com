// app/dashboard/settings/SocialMediaTab.tsx
"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaSnapchat,
  FaGlobe,
} from "react-icons/fa";

interface SocialMediaTabProps {
  initialData: {
    twitter?: string | null;
    linkedin?: string | null;
    instagram?: string | null;
    tiktok?: string | null;
    facebook?: string | null;
    snapchat?: string | null;
    website?: string | null;
  };
}

export default function SocialMediaTab({ initialData }: SocialMediaTabProps) {
  return (
    <section className="space-y-4 w-full">
      <h2 className="text-xl font-semibold text-white p-1 bg-slate-400 font-cairo">
        وسائل التواصل
      </h2>
      <div className="space-y-6">
        {/* Social Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Twitter */}

          <div className="flex items-center space-x-4">
            <FaTwitter className="text-blue-500" />
            {/* Twitter's new logo */}
            <Input
              id="twitter"
              name="twitter"
              defaultValue={initialData.twitter || ""}
              placeholder="https://twitter.com/company"
              className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* LinkedIn */}
          <div className="flex items-center space-x-4">
            <FaLinkedin className="text-blue-700" />

            <Input
              id="linkedin"
              name="linkedin"
              defaultValue={initialData.linkedin || ""}
              placeholder="https://linkedin.com/company"
              className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Instagram */}
          <div className="flex items-center space-x-4">
            <FaInstagram className="text-pink-500" />

            <Input
              id="instagram"
              name="instagram"
              defaultValue={initialData.instagram || ""}
              placeholder="https://instagram.com/company"
              className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* TikTok */}
          <div className="flex items-center space-x-4">
            <FaTiktok className="text-black" />

            <Input
              id="tiktok"
              name="tiktok"
              defaultValue={initialData.tiktok || ""}
              placeholder="https://tiktok.com/@company"
              className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Facebook */}
          <div className="flex items-center space-x-4">
            <FaFacebook className="text-blue-800" />

            <Input
              id="facebook"
              name="facebook"
              defaultValue={initialData.facebook || ""}
              placeholder="https://facebook.com/company"
              className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Snapchat */}
          <div className="flex items-center space-x-4">
            <FaSnapchat className="text-yellow-500" />

            <Input
              id="snapchat"
              name="snapchat"
              defaultValue={initialData.snapchat || ""}
              placeholder="https://snapchat.com/add/company"
              className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Website */}
          {/* <div className="flex items-center space-x-4">
          <FaGlobe className="text-gray-600" />
          <Input
            id="website"
            name="website"
            defaultValue={initialData.website || ""}
            placeholder="https://example.com"
            className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div> */}
        </div>
      </div>
    </section>
  );
}
