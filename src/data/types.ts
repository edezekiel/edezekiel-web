import type { ImageMetadata } from 'astro';

export const PALETTE_KEYS = [
	'--bg-primary',
	'--bg-secondary',
	'--bg-card',
	'--text-primary',
	'--text-secondary',
	'--accent',
	'--accent-light',
	'--accent-warm',
	'--border',
] as const;

export type PaletteMap = Record<(typeof PALETTE_KEYS)[number], string>;

export interface TimelineEntry {
	id: string;
	date: Date;
	endDate?: Date;
	title: string;
	description: string;
	image?: ImageMetadata;
	links?: { label: string; url: string }[];
}

export interface ArchiveEra extends TimelineEntry {
	eraNumber: number;
	palette: PaletteMap;
	colors: string[];
	techStack: string[];
}
