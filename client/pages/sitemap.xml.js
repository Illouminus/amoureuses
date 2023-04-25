import axios from "axios";


function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
        <loc>https://www.lesamoureuses.paris/</loc>
        <lastmod>2023-04-16T11:19:10+01:00</lastmod>
        <priority>1.0</priority>
    </url>
     <url>
        <loc>https://www.lesamoureuses.paris/carte</loc>
        <lastmod>2023-04-16T11:19:10+01:00</lastmod>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.lesamoureuses.paris/degustations</loc>
        <lastmod>2023-04-16T11:19:10+01:00</lastmod>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.lesamoureuses.paris/blog</loc>
        <lastmod>2023-04-16T11:19:10+01:00</lastmod>
        <priority>1.0</priority>
    </url>
     ${posts
        .map(({ _id }) => {
            return `
       <url>
           <loc>${`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${_id}`}</loc>
            <priority>0.5</priority>
       </url>
     `;
        })
        .join('')}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/get-blogs`
    );
    const blogs = await response.data;

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(blogs);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;
