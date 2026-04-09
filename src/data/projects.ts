export interface Project {
	name: string;
	emoji: string;
	description: string;
	url: string;
	npm?: string;
	internal?: boolean;
	tags: string[];
	lastUpdated?: string;
}

export const projects: Project[] = [
	{
		name: 'The Treehouse',
		emoji: '🌳',
		description: 'A backyard build, documented as it happens',
		url: '/treehouse',
		internal: true,
		tags: ['woodworking'],
		lastUpdated: 'Apr 6',
	},
	{
		name: 'openvex-js',
		emoji: '🛡️',
		description: 'JavaScript library for creating and managing OpenVEX documents',
		url: 'https://github.com/edezekiel/openvex-js',
		tags: ['security', 'vex'],
	},
	{
		name: 'inject-mocks',
		emoji: '🧪',
		description: 'Simplify Angular unit testing with automatic mock injection',
		url: 'https://www.npmjs.com/package/@ngx-unit-test/inject-mocks',
		tags: ['angular', 'testing'],
	},
	{
		name: 'get-ssh-config',
		emoji: '🔑',
		description: 'CLI and Node.js library to parse and query SSH config files',
		url: 'https://github.com/edezekiel/get-ssh-config',
		npm: 'https://www.npmjs.com/package/get-ssh-config',
		tags: ['cli', 'npm'],
	},
	{
		name: 'safe-date-parse',
		emoji: '📅',
		description: 'Robust date parsing that avoids common JavaScript Date pitfalls',
		url: 'https://github.com/edezekiel/safe-date-parse',
		tags: ['utility'],
	},
	{
		name: 'dotfiles',
		emoji: '⚙️',
		description: 'Personal development environment configuration and setup scripts',
		url: 'https://github.com/edezekiel/dotfiles',
		tags: ['devtools'],
	},
];
