const Card = ({ thumbnail, videos }) => {
  return <img className="card" src={thumbnail.url} alt={videos.title} />;
};

export default Card;
