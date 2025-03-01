"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

// Define the Offer type
interface Offer {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string | null;
  title: string;
  description: string;
  active: boolean;
  productIds: string[];
  buttonText?: string;
  link?: string;
}

// Define the props for OfferSlider
interface OfferSliderProps {
  offers: Offer[];
}

// Helper Component for Image with Error Handling
const ImageWithErrorHandling = ({ src, alt }: { src: string; alt: string }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="relative w-full h-full">
      {imageError ? (
        // Fallback Image if External Image Fails
        <Image
          src="/fallback-image.jpg"
          alt={alt}
          fill
          className="object-cover"
          loading="lazy"
        />
      ) : (
        // External Image
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          quality={80}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};

const OfferSlider: React.FC<OfferSliderProps> = ({ offers }) => {
  return (
    <div className="relative h-[80vh] min-h-[500px] overflow-hidden">
      {/* Swiper Component */}
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="h-full"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id}>
            <div className="h-full flex items-center justify-center relative">
              {/* Background Image with Error Handling */}
              <div className="absolute inset-0">
                <ImageWithErrorHandling
                  src={offer.imageUrl || "/fallback-image.jpg"}
                  alt={`Background image for ${offer.title}`}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              {/* Content Box */}
              <Card className="relative w-full max-w-3xl mx-auto text-center p-8 md:p-12 rounded-xl shadow-2xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md z-10 border border-white/30">
                <CardHeader>
                  <CardTitle className="text-5xl md:text-6xl font-extrabold text-primary mb-4 tracking-tight">
                    {offer.title}
                  </CardTitle>
                  <CardDescription className="text-xl md:text-2xl text-gray-800 mb-6 leading-relaxed">
                    {offer.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-10 py-5 text-xl md:text-2xl font-semibold rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
                        aria-label={`Order ${offer.title} now`}
                        onClick={() => {
                          if (offer.link) {
                            window.location.href = offer.link;
                          }
                        }}
                      >
                        {offer.buttonText || "Order Now"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to order {offer.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Main Component with Toggle
const OfferSection: React.FC<OfferSliderProps> = ({ offers }) => {
  const [showOffers, setShowOffers] = useState(true);

  const toggleOffers = () => {
    setShowOffers((prev) => !prev);
  };

  return (
    <section className="relative">
      <div className="flex justify-end mb-4">
        <Button
          onClick={toggleOffers}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {showOffers ? "اخفاء" : "عرض"}
        </Button>
      </div>
      {showOffers && <OfferSlider offers={offers} />}
    </section>
  );
};

export default OfferSection;
