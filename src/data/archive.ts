import era0 from '../assets/archive/era-0.png';
import era1 from '../assets/archive/era-1.png';
import era2 from '../assets/archive/era-2.png';
import era3 from '../assets/archive/era-3.png';
import era4 from '../assets/archive/era-4.png';
import era5 from '../assets/archive/era-5.png';
import type { ArchiveEra } from './types';

export const eras: ArchiveEra[] = [
	{
		id: 'era-0',
		eraNumber: 0,
		date: new Date('2018-10-05'),
		title: 'The FTP Era',
		description:
			"Where it all started. Hand-written HTML and CSS, uploaded to Bluehost via FTP. Zilla Slab font, red links, and a lamp banner header. Ed's Bootcamp Blog.",
		image: era0,
		colors: ['#e73431', '#E9EBEE'],
		techStack: ['HTML', 'CSS', 'Bluehost', 'FTP'],
		links: [{ label: 'GitHub', url: 'https://github.com/edezekiel/edezekiel-blog' }],
		palette: {
			'--bg-primary': '#E9EBEE',
			'--bg-secondary': '#d5d8dc',
			'--bg-card': '#ffffff',
			'--text-primary': '#000000',
			'--text-secondary': '#555555',
			'--accent': '#e73431',
			'--accent-light': '#ff5a57',
			'--accent-warm': '#e73431',
			'--border': '#08090d',
		},
	},
	{
		id: 'era-1',
		eraNumber: 1,
		date: new Date('2019-02-06'),
		endDate: new Date('2019-08-01'),
		title: 'React + Rails',
		description:
			'Full-stack rebuild with a React frontend and Rails API. Had its own login system and a live-preview article editor. Deployed across Netlify and Heroku.',
		image: era1,
		colors: ['#0066cc', '#ffffff'],
		techStack: ['React', 'Rails', 'Netlify', 'Heroku'],
		links: [
			{
				label: 'Frontend',
				url: 'https://github.com/edezekiel/frontend-react-rails-blog',
			},
			{
				label: 'Backend',
				url: 'https://github.com/edezekiel/backend-react-rails-blog',
			},
		],
		palette: {
			'--bg-primary': '#ffffff',
			'--bg-secondary': '#f5f5f5',
			'--bg-card': '#ffffff',
			'--text-primary': '#333333',
			'--text-secondary': '#666666',
			'--accent': '#0066cc',
			'--accent-light': '#3399ff',
			'--accent-warm': '#0066cc',
			'--border': '#dddddd',
		},
	},
	{
		id: 'era-2',
		eraNumber: 2,
		date: new Date('2019-11-01'),
		endDate: new Date('2021-06-24'),
		title: 'The Purple Gatsby Era',
		description:
			'First Gatsby site. Purple header with an astronaut SVG, Montserrat font, Prism syntax highlighting. Built during the Flatiron bootcamp era.',
		image: era2,
		colors: ['#6b37bf', '#fcfaff'],
		techStack: ['Gatsby v2', 'Netlify', 'Prism'],
		links: [
			{
				label: 'GitHub',
				url: 'https://github.com/edezekiel/gatsby-netlify-blog',
			},
			{
				label: 'Wayback',
				url: 'https://web.archive.org/web/20191120071517/https://www.edezekiel.com/',
			},
		],
		palette: {
			'--bg-primary': '#fcfaff',
			'--bg-secondary': '#f0eaf8',
			'--bg-card': '#ffffff',
			'--text-primary': '#000000',
			'--text-secondary': '#555555',
			'--accent': '#6b37bf',
			'--accent-light': '#8b5fcf',
			'--accent-warm': '#6b37bf',
			'--border': '#6b37bf',
		},
	},
	{
		id: 'era-3',
		eraNumber: 3,
		date: new Date('2021-06-24'),
		endDate: new Date('2023-12-31'),
		title: 'Dark Mode Gatsby',
		description:
			'Complete rewrite to Gatsby v3 with a dark theme. CSS Modules, VSCode-based syntax highlighting, Times serif font. Cut dependencies from 28 to 16.',
		image: era3,
		colors: ['#7f5af0', '#16161a'],
		techStack: ['Gatsby v3', 'CSS Modules', 'gatsby-remark-vscode'],
		links: [
			{
				label: 'GitHub',
				url: 'https://github.com/edezekiel/ed-ezekiel-gatsby-blog',
			},
			{
				label: 'Wayback',
				url: 'https://web.archive.org/web/20210612222904/https://edezekiel.com/',
			},
		],
		palette: {
			'--bg-primary': '#16161a',
			'--bg-secondary': '#1e1e24',
			'--bg-card': '#29293e',
			'--text-primary': '#ffffff',
			'--text-secondary': '#94a1b2',
			'--accent': '#7f5af0',
			'--accent-light': '#e068fd',
			'--accent-warm': '#e068fd',
			'--border': '#383a61',
		},
	},
	{
		id: 'era-4',
		eraNumber: 4,
		date: new Date('2024-01-01'),
		endDate: new Date('2026-01-01'),
		title: 'The Digital Garden',
		description:
			'Migrated from Gatsby to Astro v4. Clean light theme, Atkinson Hyperlegible font, blue accents. Hosted on Cloudflare Pages. A fresh start.',
		image: era4,
		colors: ['#2337ff', '#ffffff'],
		techStack: ['Astro v4', 'Cloudflare Pages', 'Atkinson'],
		links: [
			{
				label: 'Wayback',
				url: 'https://web.archive.org/web/20240417234542/https://edezekiel.com/',
			},
		],
		palette: {
			'--bg-primary': '#ffffff',
			'--bg-secondary': '#f8f9fb',
			'--bg-card': '#ffffff',
			'--text-primary': '#22293a',
			'--text-secondary': '#607396',
			'--accent': '#2337ff',
			'--accent-light': '#4d5eff',
			'--accent-warm': '#2337ff',
			'--border': '#e5e7f0',
		},
	},
	{
		id: 'era-5',
		eraNumber: 5,
		date: new Date('2026-01-01'),
		title: 'The Forest Era',
		description:
			'The current incarnation. Astro v5, Rivian Green dark theme, hedgehog animations, treehouse project page. Nature-anchored and still growing.',
		image: era5,
		colors: ['#7c9a5e', '#1a1f1a'],
		techStack: ['Astro v5', 'Rivian Green', 'hedgehog animations'],
		links: [
			{ label: 'GitHub', url: 'https://github.com/edezekiel/edezekiel-web' },
			{ label: 'Live', url: 'https://edezekiel.com/' },
		],
		palette: {
			'--bg-primary': '#1a1f1a',
			'--bg-secondary': '#232923',
			'--bg-card': '#2a322a',
			'--text-primary': '#e8ebe4',
			'--text-secondary': '#9ca89a',
			'--accent': '#7c9a5e',
			'--accent-light': '#a3c47d',
			'--accent-warm': '#c4a35a',
			'--border': '#3a443a',
		},
	},
];
