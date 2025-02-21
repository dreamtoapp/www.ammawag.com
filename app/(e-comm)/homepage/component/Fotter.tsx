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

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-muted-foreground text-sm">
              Discover our journey and what drives us forward. We are dedicated
              to providing high-quality services to our customers.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Services", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-muted-foreground text-sm">info@example.com</p>
            <p className="text-muted-foreground text-sm">+1 (123) 456-7890</p>
            <p className="text-muted-foreground text-sm">
              123 Street, City, Country
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <form className="flex flex-col space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
                aria-label="Email for newsletter subscription"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 transition-colors duration-300">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-6" />

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          {[
            { icon: <FacebookIcon size={20} />, link: "#", label: "Facebook" },
            {
              icon: <InstagramIcon size={20} />,
              link: "#",
              label: "Instagram",
            },
            { icon: <TwitterIcon size={20} />, link: "#", label: "Twitter" },
            { icon: <LinkedinIcon size={20} />, link: "#", label: "LinkedIn" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.link}
              aria-label={social.label}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground mt-6">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved. Developed by
          <a
            href="https://your-portfolio-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline ml-1"
          >
            Your Name
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
