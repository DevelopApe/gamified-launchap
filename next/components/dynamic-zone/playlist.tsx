'use client';

import React from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface PlaylistProps {
  heading?: string;
  audio: {
    id: string;
    url: string;
    name: string;
  }[];
}

export const Playlist = ({ heading, audio }: PlaylistProps) => {
  return (
    <div className="playlist-container">
      {heading && <h2 className="text-2xl font-bold mb-4">{heading}</h2>}
      <div className="playlist">
        {audio.map((track) => (
          <div key={track.id} className="audio-item mb-4">
            <p className="text-sm font-medium">{track.name}</p>
            <audio controls controlsList="nodownload" className="w-full">
              <source src={`${BASE_URL}${track.url}`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};
