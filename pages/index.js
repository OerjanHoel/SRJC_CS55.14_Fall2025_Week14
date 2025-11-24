import Head from 'next/head'; // Imports head from Next.js
import Link from 'next/link'; // Imports link from Next.js
import Layout, { siteTitle } from '../components/layout'; // Imports layout and sisteTitle from layout.js. siteTitle a variable in layout.js
import utilStyles from '../styles/utils.module.css'; // Imports CSS from utils.module.css file
import { getSortedPostsData, getSortedDesktopEnvironmentData, getSortedPackageManagerData } from '../lib/post-data'; // Imports sorted functions for each category

// Function creates the static html for our blog posts
export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  const desktopEnvs = await getSortedDesktopEnvironmentData();
  const packageManagers = await getSortedPackageManagerData();
  return {
    props: {
      allPostsData,
      desktopEnvs,
      packageManagers,
    },
    // Added revalidate to refresh the posts when new post is made on wordpress page
    revalidate: 10,
  };
}
// Function creates Home based on the importet 
// compnonents from next.js and layout.js file
// Compnents are JSX elements
export default function Home({ allPostsData, desktopEnvs, packageManagers }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          This website uses the 'got' node package to retrive the JSON data from the WordPress posts,
          residing in the WP Database. The data is then parsed and displayed as a list of blog articles. 
          The posts are created in WordPress with ACF custom fields for 'distro_name' and 'description'. 
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Learn more about Linux</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, distro_name }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/Distros/${id}`}>{distro_name}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Desktop Environments</h2>
        <ul className={utilStyles.list}>
          {desktopEnvs.map(({ id, de_name }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/DesktopEnvironments/${id}`}>{de_name}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Package Managers</h2>
        <ul className={utilStyles.list}>
          {packageManagers.map(({ id, pm_name }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/PackageManagers/${id}`}>{pm_name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}