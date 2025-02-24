"use client";
import React from "react";
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

const OfferSlider: React.FC<OfferSliderProps> = ({ offers }) => {
  return (
    <section className="relative">
      <div className="relative h-[80vh] min-h-[500px] overflow-hidden">
        {/* Swiper Component */}
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                    alt={offer.title || "Offer Image"}
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                {/* Content Box */}
                <Card className="relative w-full max-w-2xl mx-auto text-center p-6 md:p-8 rounded-lg shadow-xl bg-white/10 backdrop-blur-sm z-10 border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-4">
                      {offer.title}
                    </CardTitle>
                    <CardDescription className="text-lg md:text-xl text-gray-200 mb-6">
                      {offer.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg md:text-xl font-semibold rounded-lg transition duration-300"
                      aria-label={`Order ${offer.title}`}
                      onClick={() => {
                        if (offer.link) {
                          window.location.href = offer.link;
                        }
                      }}
                    >
                      {offer.buttonText || "اطلب الان"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

// Helper Component for Image with Error Handling
const ImageWithErrorHandling = ({ src, alt }: { src: string; alt: string }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="relative w-full h-full">
      {imageError ? (
        // Fallback Image if External Image Fails
        <Image
          src="/fallback-image.jpg" // Replace with your local fallback image path
          alt={alt}
          fill
          className="object-cover"
        />
      ) : (
        // External Image
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          quality={75}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImageError(true)} // Handle image load errors
        />
      )}
    </div>
  );
};

export default OfferSlider;
