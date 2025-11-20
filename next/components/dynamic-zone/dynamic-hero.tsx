'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

import { Button } from '@/components/elements/button';
import { strapiImage } from '@/lib/strapi/strapiImage';

interface ButtonProps {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface MessageProps {
  ordenr: number;
  text: string;
}

interface Media {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface DynamicHeroProps {
  data: {
    id: string;
    media: Media;
    description: string;
    buttons: ButtonProps[];
    url: string;
  };
}

export const DynamicHero = ({
  media,
  description,
  buttons,
}: {
  media: any;
  description: string;
  buttons: any[];
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    // Copy the ref value into a local variable so the cleanup closure
    // uses the same node reference that was observed. This prevents the
    // ESLint warning about the ref changing between effect run and cleanup.
    const node = heroRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  const mediaUrl = strapiImage(media.url);

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase();
  };

  const getMimeType = (extension: string | undefined) => {
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'ogg':
        return 'video/ogg';
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'gif':
        return 'image/gif';
      case 'webp':
        return 'image/webp';
      default:
        return '';
    }
  };

  const videoExtensions = ['mp4', 'webm', 'ogg'];
  const fileExtension = mediaUrl ? getFileExtension(mediaUrl) : undefined;
  const isVideo = fileExtension
    ? videoExtensions.includes(fileExtension)
    : false;
  const mimeType = getMimeType(fileExtension);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {isVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={mediaUrl || ''} type={mimeType} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={mediaUrl || ''}
          alt={media.alternativeText || 'Hero background'}
          layout="fill"
          objectFit="cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-secondary">
        <div
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 max-w-4xl text-center transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <TypeAnimation
            sequence={[720, description]}
            wrapper="h3"
            speed={45}
            style={{
              display: 'contents',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              letterSpacing: '1px',
              lineHeight: '1.2',
            }}
          />
        </div>
        <div
          className={`flex flex-wrap justify-center gap-4 transition-opacity duration-1000 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {buttons.map((button: ButtonProps, index: number) => (
            <Button
              key={index}
              href={button.url}
              variant="primary"
              className="text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {button.text}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};
