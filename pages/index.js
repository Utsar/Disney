import { gql, GraphQLClient } from "graphql-request";
import Section from "../components/Section";

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
  // get random videos to display
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  // filter videos by genre
  const filter = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };
  return (
    <>
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>
        <div className="video-feed">
          <Section genre={"Comedy"} videos={filter(videos, "comedy")} />
          <Section genre={"True Story"} />
          <Section genre={"TV Show"} />
          <Section genre={"Thriller"} />
          <Section genre={"Classic"} />
          <Section genre={"Drama"} />
          <Section genre={"Documentary"} />
        </div>
      </div>
    </>
  );
};
export default Home;
