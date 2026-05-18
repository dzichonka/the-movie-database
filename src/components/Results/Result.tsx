import Card from '../Card/Card';
import type { Movie } from '../../types/api-types';

type ResultProps = { data: Movie[] };

const Result = ({ data }: ResultProps) => {

    return (
      <div className="wrapper">
        {data.length === 0 && <h2>nothing founds</h2>}
        {data.length > 0 &&
          data.map((movie) => (
            <div key={movie.id}>
              <Card data={movie} />
            </div>
          ))}
      </div>
    );
}
export default Result;
