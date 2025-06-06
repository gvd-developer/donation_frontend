"use client";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  UnstyledAccordionTrigger,
} from "@/components/ui/accordion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { RiDoubleQuotesL } from "react-icons/ri";
import { DonateButton } from "./misc/donate-button";
import DecorationProp from "@/assets/images/prop-2.svg";
import { getLandingDetails } from "../server/get-landing-details";
import { Image } from "@/components/image";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import { ProseInnerHtmlContainer } from "@/components/prose-container";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function QuotesAboutSection({ data }) {
  return (
    <div className="bg-landing-tertiary pt-12 md:pt-16 pb-4">
      <div className="space-y-12 md:space-y-16 max-w-7xl mx-auto px-4">
        <QuotesSection quoteSection={data.quoteSection} />
        <AboutSection aboutSection={data.aboutSection} />
      </div>
    </div>
  );
}

function QuotesSection({ quoteSection }) {
  return (
    <div className="space-y-8">
      <h1 className="text-landing-primary font-extrabold text-center text-4xl md:text-5xl">
        {quoteSection.title}
      </h1>

      <div className="border-4 border-landing-primary p-4 md:p-7 rounded-xl max-w-4xl mx-auto relative">
        <ProseInnerHtmlContainer
          html={quoteSection.text}
          className="text-landing-foreground font-medium text-sm md:text-base"
        />

        <div className="bg-landing-tertiary text-landing-primary text-4xl absolute left-4 -top-5">
          <RiDoubleQuotesL />
        </div>

        <div className="bg-landing-tertiary text-landing-primary text-4xl absolute right-4 -bottom-4 rotate-180">
          <RiDoubleQuotesL />
        </div>
      </div>
    </div>
  );
}

function AboutSection({ aboutSection }) {
  return (
    <div>
      <Image
        loadingAnimation={false}
        className="block mx-auto"
        src={DecorationProp}
        alt=""
      />

      <div className="grid md:grid-cols-2 gap-6 my-8 md:my-12">
        <div className="w-full max-h-max my-auto overflow-hidden rounded-xl min-h-28 shadow-landing-primary/60 shadow-lg">
          <div className="aspect-w-16 aspect-h-9 relative">
            {aboutSection.isVideo ? (
              <YouTubeEmbed videoId={aboutSection.video} autoplay={true} />
            ) : (
              <Slider slides={aboutSection.images} />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-3xl md:text-4xl">
            {aboutSection.title}
          </h2>

          <div className="space-y-4">
            <ProseInnerHtmlContainer
              className="text-landing-foreground text-sm md:text-base"
              html={aboutSection.text.firstpara}
            />

            {aboutSection.text.readMore && (
              <Accordion collapsible>
                <AccordionItem value="item-1" className="border-none group">
                  <AccordionContent className="text-sm md:text-base">
                    <ProseInnerHtmlContainer
                      className="text-current"
                      html={aboutSection.text.readMore}
                    />
                  </AccordionContent>

                  <UnstyledAccordionTrigger className="font-bold hover:underline justify-start">
                    <div className="block group-data-[state=open]:hidden">
                      Read More
                    </div>

                    <div className="hidden group-data-[state=open]:block">
                      Read Less
                    </div>
                  </UnstyledAccordionTrigger>
                </AccordionItem>
              </Accordion>
            )}
          </div>

          <DonateButton />
        </div>
      </div>

      <Image
        loadingAnimation={false}
        className="block mx-auto rotate-180 mb-8 md:mb-12"
        src={DecorationProp}
        alt=""
      />
    </div>
  );
}

function Slider({ slides }) {
  if (!Array.isArray(slides)) return null;
  return (
    <Swiper
      className="w-full h-full swiper-bullet-active:!bg-primary swiper-bullet:opacity-100 swiper-bullet:bg-white swiper-bullet:w-4 swiper-bullet-active:!w-8 swiper-bullet:!rounded-md"
      spaceBetween={0}
      keyboard={true}
      mousewheel={{
        forceToAxis: true,
      }}
      pagination={{
        enabled: true,
        clickable: true,
      }}
      modules={[Keyboard, Mousewheel, Pagination, Autoplay]}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        waitForTransition: true,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="min-h-full h-full w-full">
          <div className="w-full h-full relative">
            <Image
              alt=""
              fill
              className="w-full h-full object-cover"
              src={BASE_URL + slide}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

