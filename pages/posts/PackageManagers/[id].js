import Layout from '../../../components/layout'; // Imports the layout from components folder
import { getPackageManagerPostData, getAllPackageManagerPostIds } from '../../../lib/post-data'; // Package-manager helpers
import Head from 'next/head'; // Imports head from Next.js
import utilStyles from '../../../styles/utils.module.css'; // Imports the CSS from utils.module.css file

// Gets the static paths for the blog posts
export async function getStaticPaths() {
  // getAllPackageManagerPostIds returns an array like [{ params: { id: '...' } }, ...]
  const paths = await getAllPackageManagerPostIds();
  return {
    // If the path is not found it won't fall back
    paths,
    fallback: false,
  };
}

// Exports the Static Props for a single post
export async function getStaticProps({ params }) {
  // fetch single package-manager object by id
  const postData = await getPackageManagerPostData(params.id);
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
  // postData fields are mapped by lib/post-data.js for package managers
  const title = postData.pm_name || postData.title || 'Untitled';
  const contentHtml = postData.pm_content || postData.content || '';
  const releaseDate = postData.pm_release_date || null;
  const pmUrl = postData.pm_url || null;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        {releaseDate && <p className={utilStyles.lightText}>Release date: {releaseDate}</p>}
        {pmUrl && (
          <p>
            <a href={pmUrl} target="_blank" rel="noopener noreferrer">More info</a>
          </p>
        )}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
}
