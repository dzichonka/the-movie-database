import { Component } from 'react';
import Card from '../Card/Card';
import type { Movie } from '../../types/api-types';

type ResultProps = { data: Movie[] };
class Result extends Component<ResultProps> {
  render() {
    return (
      <div className="wrapper">
        {this.props.data.length === 0 && <h2>nothing founds</h2>}
        {this.props.data.length > 0 &&
          this.props.data.map((movie) => (
            <div key={movie.id}>
              <Card data={movie} />
            </div>
          ))}
      </div>
    );
  }
}
export default Result;
