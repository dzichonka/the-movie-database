import { Component } from 'react';
import type { Movie } from '../../types/api-types';

type CardProps = { data: Movie };
class Card extends Component<CardProps> {
  render() {
    const { title, release_date, poster_path, popularity } = this.props.data;
    return (
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <h2>{title}</h2>
        <p>Release Date: {release_date}</p>
        <p>Popularity: {popularity}</p>
      </div>
    );
  }
}
export default Card;
