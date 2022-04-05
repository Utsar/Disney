import { gql, GraphQLClient } from "graphql-request";
import { useState } from "react";

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const token = process.env.GRAPHSMC_TOKEN;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const pageSlug = pageContext.query.slug;

  const query = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
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
  const [watching, setWatching] = useState(false);
  return (
    <>
      {!watching && (
        <img
          className="videoImage"
          src={video.thumbnail.url}
          alt={video.title}
        />
      )}
      {!watching && (
        <div className="info">
          <p>{video.tags.join(", ")}</p>
          <p>{video.description}</p>
          <a href="/">
            <p>go back</p>
          </a>
          <button
            className="playButton"
            onClick={() => {
              watching ? setWatching(false) : setWatching(true);
            }}
          >
            PLAY
          </button>
        </div>
      )}
      {watching && (
        <video
          src={video.mp4.url}
          type="video/mp4"
          width="100%"
          controls
        ></video>
      )}
      <div
        className="infoFooter"
        onClick={() => (watching ? setWatching(false) : null)}
      ></div>
    </>
  );
};

export default Video;
