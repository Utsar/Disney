import { gql, GraphQLClient } from "graphql-request";

export const getServerSideProps = async (pageContext) => {
  const token = process.env.GRAPHSMC_TOKEN;
  const url =
    "https://api-eu-west-2.graphcms.com/v2/cl1gclawa41lx01xfefn49zu3/master";

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // get the video by slug ref
  const pageSlug = pageContext.query.slug;
  const query = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
        createdAt
        id
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;
  const variables = {
    pageSlug,
  };
  const data = await graphQLClient.request(query, variables);
  const video = data.video;
  return {
    props: {
      video,
    },
  };
};

const Video = ({ video }) => {
  console.log(video);
  return <div>Video</div>;
};

export default Video;
