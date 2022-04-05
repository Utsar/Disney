import { gql, GraphQLClient } from "graphql-request";
import Navbar from "../components/Navbar";
import Section from "../components/Section";

const token = process.env.GRAPHSMC_TOKEN;
const url = process.env.ENDPOINT;

export const getStaticProps = async () => {
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const videosQuery = gql`
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

  const accountQuery = gql`
    query {
      account(where: { id: "cl1gdnydg1z4d0bl7qwjf3lzp" }) {
        username
        avatar {
          url
        }
      }
    }
  `;

  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;

  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;
  return {
    props: {
      videos,
      account,
    },
  };
};
const Home = ({ videos, account }) => {
  // get random videos to display
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  // filter videos by genre
  const filter = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  // filter videos by seen
  const unSeenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null);
  };
  console.log(
    "not seen",
    videos.filter((video) => video.seen == false || video.null)
  );
  return (
    <>
      <Navbar account={account} />
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>
        <div className="video-feed">
          <Section
            genre={"Recommended for You"}
            videos={unSeenVideos(videos)}
          />
          <Section genre={"Comedy"} videos={filter(videos, "comedy")} />
          <Section genre={"True Story"} videos={filter(videos, "true story")} />
          <Section genre={"TV Show"} videos={filter(videos, "tv show")} />
          <Section genre={"Thriller"} videos={filter(videos, "thriller")} />
          <Section genre={"Classic"} videos={filter(videos, "classic")} />
          <Section genre={"Drama"} videos={filter(videos, "drama")} />
          <Section
            genre={"Documentary"}
            videos={filter(videos, "documentary")}
          />
        </div>
      </div>
    </>
  );
};
export default Home;
