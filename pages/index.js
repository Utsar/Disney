import { gql, GraphQLClient } from "graphql-request";

const token = process.env.GRAPHSMC_TOKEN;
const url =
  "https://api-eu-west-2.graphcms.com/v2/cl1gclawa41lx01xfefn49zu3/master";

export const getStaticProps = async () => {
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const query = gql`
    query {
      videos {
        createdAt
        id
        title
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

  const data = await graphQLClient.request(query);
  const videos = data.videos;
  return {
    props: {
      videos,
    },
  };
};
const Home = ({ videos }) => {
  console.log(videos);
  return <div>hello</div>;
};
export default Home;
