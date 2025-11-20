import Layout from '../../components/layout'; // Imports the layout from components folder
import { getPostData, getAllPostIds } from '../../lib/posts-json'; // Imports the helper that fetches JSON posts
import Head from 'next/head'; // Imports head from Next.js
import utilStyles from '../../styles/utils.module.css'; // Imports the CSS from utils.module.css file

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
  };
}

// Render a single post. The JSON object from the API uses keys like `distro_name` and `description`.
export default function Post({ postData }) {
  // postData may be the API object or the fallback { id, title: 'Not found' }
  const title = postData.acf.distro_name || postData.title || 'Untitled';
  const contentHtml = postData.acf.description || postData.content || 'Fix the code to show content.';

  return (
    // Render the layout for a single post
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        {/* The API returns HTML in `description` — render it as HTML. */}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
}
