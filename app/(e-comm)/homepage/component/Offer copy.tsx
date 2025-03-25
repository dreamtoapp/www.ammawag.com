"use client";
import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { EyeIcon, EyeOff } from "lucide-react";

// Type Definitions for Offer and OfferSliderProps
interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  active: boolean;
  productIds: string[];
  buttonText?: string;
  link?: string;
}

interface OfferSliderProps {
  offers: Offer[];
}

// Image component with proper error handling
const ImageWithErrorHandling: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div className="relative w-full max-w-[720px] mx-auto aspect-[720/550] rounded-xl overflow-hidden">
    <Image
      src={imageError ? "/fallback-image.jpg" : src}
      alt={alt}
      fill
      className="rounded-xl object-cover"
      priority
      onError={handleImageError}
      sizes="(max-width: 768px) 100vw, 720px"
    />
  </div>
  );
};

// Slider component for displaying offers
const OfferSlider: React.FC<OfferSliderProps> = ({ offers }) => {
  return (
    <div className="relative h-[600px] min-h-[500px] max-h-[500px] overflow-hidden bg-orange-400 flex items-center justify-center">
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
              <div className="absolute inset-0">
                <ImageWithErrorHandling
                  src={offer.imageUrl || "/fallback-image.jpg"}
                  alt={`Background image for ${offer.title}`}
                />
              </div>
              {/* Add Offer Details here if needed */}
              <div className="absolute bottom-10 left-10 text-white z-10 max-w-sm sm:max-w-md">
                <h2 className="text-3xl font-semibold sm:text-4xl">{offer.title}</h2>
                <p className="text-lg mt-2 sm:text-xl">{offer.description}</p>
                
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Main Offer Section Component
const OfferSection: React.FC<OfferSliderProps> = ({ offers }) => {
  const [showOffers, setShowOffers] = useState(true);

  // Toggle visibility of the offers
  const toggleOffers = () => {
    setShowOffers((prev) => !prev);
  };

  return (
    <section className="relative py-8 px-4 bg-gray-50">
     
      {showOffers && <OfferSlider offers={offers} />}
      <div className="flex justify-end mb-4">
        <Button
          onClick={toggleOffers}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {showOffers ? <EyeOff size={24} /> : <EyeIcon size={24} />}
        </Button>
      </div>
    </section>
  );
};

export default OfferSection;
