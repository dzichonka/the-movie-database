import { Component } from 'react';
import type { Movie } from '../../types/api-types';

type CardProps = { data: Movie };

class Card extends Component<CardProps> {
  render() {
    const { title, release_date, poster_path, popularity } = this.props.data;
    return (
      <div className="card">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : '/no-image.png'
          }
          alt={title}
          width="200"
        />
        <h2>{title}</h2>
        <p>Release Date: {release_date}</p>
        <p>Popularity: {popularity}</p>
      </div>
    );
  }
}
export default Card;
