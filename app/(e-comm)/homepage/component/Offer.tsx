"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules"; // Removed Navigation
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

// Dummy offers data with real image URLs
const dummyOffers = [
  {
    id: 1,
    title: "عرض الصيف",
    description: "خصم 50% على جميع مجموعات الصيف. عرض لفترة محدودة!",
    buttonText: "اطلب الآن",
    link: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1587614387466-0a2b74f9f3f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Real image URL
  },
  {
    id: 2,
    title: "عودة إلى المدرسة",
    description: "خصومات خاصة على مستلزمات المدرسة والإكسسوارات.",
    buttonText: "اطلب الآن",
    link: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Real image URL
  },
  {
    id: 3,
    title: "عرض فلاش",
    description: "آخر فرصة للحصول على صفقات رائعة على العناصر المختارة.",
    buttonText: "اطلب الآن",
    link: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Real image URL
  },
];

const OfferSlider = () => {
  return (
    <section className="relative bg-gray-50">
      <div className="relative h-[80vh] min-h-[500px]">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]} // Removed Navigation
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          className="h-full"
        >
          {dummyOffers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <div className="h-full flex items-center justify-center relative">
                {/* Image background */}
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy" // Lazy load images for better performance
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                {/* Content Box */}
                <Card className="relative w-full max-w-2xl mx-4 md:mx-auto text-center p-6 md:p-8 rounded-lg shadow-xl bg-white/10 backdrop-blur-sm z-10 border border-white/20">
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
                      asChild
                      className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg md:text-xl font-semibold rounded-lg transition duration-300"
                    >
                      <a href={offer.link}>{offer.buttonText}</a>
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

export default OfferSlider;
