import type { ImageMetadata } from 'astro';

export interface TimelineEntry {
  id: string;
  date: Date;
  endDate?: Date;
  title: string;
  description: string;
  image?: ImageMetadata;
  images?: ImageMetadata[];
  metadata?: Record<string, string>;
  links?: { label: string; url: string }[];
}

export interface ArchiveEra extends TimelineEntry {
  eraNumber: number;
  palette: {
    '--bg-primary': string;
    '--bg-secondary': string;
    '--bg-card': string;
    '--text-primary': string;
    '--text-secondary': string;
    '--accent': string;
    '--accent-light': string;
    '--accent-warm': string;
    '--border': string;
  };
  colors: string[];
  techStack: string[];
}
