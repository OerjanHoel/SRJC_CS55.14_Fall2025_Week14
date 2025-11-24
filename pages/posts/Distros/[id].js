import Layout from '../../../components/layout'; // Imports the layout from components folder
import { getPostData, getAllPostIds } from '../../../lib/post-data'; // Distro helpers
import Head from 'next/head'; // Imports head from Next.js
import utilStyles from '../../../styles/utils.module.css'; // Imports the CSS from utils.module.css file

// Gets the static paths for the blog posts
export async function getStaticPaths() {
  // getAllPostIds returns an array like [{ params: { id: '...' } }, ...]
  const paths = await getAllPostIds();
  return {
    // If the path is not found it won't fall back
    paths,
    fallback: false,
  };
}

// Exports the Static Props for a single post
export async function getStaticProps({ params }) {
  // fetch single post object by id
  const postData = await getPostData(params.id);
  // Pass post data to the page via props
  return {
    props: {
      postData,
    },
    // Added revalidate to refresh the posts when new post is made on wordpress page
    revalidate: 10,
  };
}

// Render a single post. The JSON object from the API uses keys like `distro_name` and `description`.
export default function Post({ postData }) {
  // postData fields are mapped by lib/post-data.js
  const title = postData.distro_name || postData.title || 'Untitled';
  const contentHtml = postData.description || postData.content || '';
  const developmentCountry = postData.development_country || null;
  const originalDevelopers = postData.original_developers || null;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        {developmentCountry && <p className={utilStyles.lightText}>Development country: {developmentCountry}</p>}
        {originalDevelopers && <p className={utilStyles.lightText}>Original developers: {originalDevelopers}</p>}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
}
