import React from "react";

import { Link } from "next-view-transitions";
import { BlurImage } from "./blur-image";

import { strapiImage } from "@/lib/strapi/strapiImage";
import { Image } from "@/types/types";

<<<<<<< HEAD
export const Logo = ({ image, locale, company }: { image?: Image, locale?: string, company?: string }) => {
=======
export const Logo = ({ image, locale }: { image?: Image, locale?: string }) => {
>>>>>>> upstream/main
  if (image) {
    return (
      <Link
        href={`/${locale || 'en'}`}
        className="font-normal flex space-x-2 items-center text-sm mr-4  text-black   relative z-20"
      >
        <BlurImage
          src={strapiImage(image?.url)}
          alt={image.alternativeText}
          width={200}
          height={200}
          className="h-10 w-10 rounded-xl mr-2"
        />

<<<<<<< HEAD
        <span className="text-white font-bold">{company ? company : "Gamified"}</span>
=======
        <span className="text-white font-bold">LaunchPad</span>
>>>>>>> upstream/main
      </Link>
    );
  }

  return;
};
