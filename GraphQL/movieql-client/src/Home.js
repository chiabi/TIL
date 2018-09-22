import React from 'react';
import { Query } from 'react-apollo';
import { HOME_PAGE } from './queries';

const Home = () => (
  <Query query={HOME_PAGE}>
    {({ loading, data, error }) => {
      if (loading) return 'loading';
      if (error) return 'something happened';
      return data.movies.map(movie => (
        <div key={movie.id}>
          <h2>
            {movie.title} / {movie.rating}
          </h2>
          <div>
            <img src={movie.medium_cover_image} alt="" />
          </div>
        </div>
      ));
    }}
  </Query>
);

export default Home;
