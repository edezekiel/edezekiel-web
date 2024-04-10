import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		xmlns: {
      media: "http://search.yahoo.com/mrss/",
      atom: "http://www.w3.org/2005/Atom",
    },
		customData: `<media:content
			type="image/svg"
			width="32"
			height="32"
			medium="image"
			title="Ed Ezekiel"
			url="${context.site + 'favicon.svg'}" />
		`,
		items: posts.slice().reverse().map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}
