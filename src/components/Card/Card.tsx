import type { Movie } from '../../types/api-types';

type CardProps = { data: Movie };

const Card = ({ data }: CardProps) => {
  const { title, release_date, poster_path, overview } = data;
  return (
    <div className="card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : '/no-image-icon.png'
        }
        alt={title}
        width="200"
        height="300"
        style={poster_path ? { objectFit: 'cover' } : { objectFit: 'contain' }}
      />
      <h2>{title}</h2>
      <p>{release_date.slice(0, 4)}</p>
      <p>{overview}</p>
    </div>
  );
};
export default Card;
