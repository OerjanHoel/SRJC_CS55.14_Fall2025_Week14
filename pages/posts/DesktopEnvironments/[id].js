import Layout from '../../../components/layout'; // Imports the layout from components folder
import { getDesktopEnvironmentPostData, getAllDesktopEnvironmentPostIds } from '../../../lib/post-data'; // Desktop-environment helpers
import Head from 'next/head'; // Imports head from Next.js
import utilStyles from '../../../styles/utils.module.css'; // Imports the CSS from utils.module.css file

// Gets the static paths for the blog posts
export async function getStaticPaths() {
  // getAllDesktopEnvironmentPostIds returns an array like [{ params: { id: '...' } }, ...]
  const paths = await getAllDesktopEnvironmentPostIds();
  return {
    // If the path is not found it won't fall back
    paths,
    fallback: false,
  };
}

// Exports the Static Props for a single post
export async function getStaticProps({ params }) {
  // fetch single desktop-environment object by id
  const postData = await getDesktopEnvironmentPostData(params.id);
  // Pass post data to the page via props
  return {
    props: {
      postData,
    },
  };
}

// Render a single post. The JSON object from the API uses keys like `distro_name` and `description`.
export default function Post({ postData }) {
  // postData uses keys defined in post-data.js for desktop environments
  const title = postData.de_name || postData.title || 'Untitled';
  const contentHtml = postData.de_content || postData.content || '';
  const releaseYear = postData.de_release_year || null;
  const externalUrl = postData.de_url || null;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        {releaseYear && <p className={utilStyles.lightText}>Released: {releaseYear}</p>}
        {externalUrl && (
          <p>
            <a href={externalUrl} target="_blank" rel="noopener noreferrer">Official site</a>
          </p>
        )}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
}
