import React from 'react';
import { Query } from 'react-apollo';
import { MOVIE_DETAILS } from './queries';

const Detail = ({
  match: {
    params: { movieId },
  },
}) => (
  <Query query={MOVIE_DETAILS} variables={{ movieId }}>
    {({ loading, data, error }) => {
      if (loading) return 'loading';
      if (error) return 'error';
      const { title, rating, description_intro } = data.movie;
      return (
        <React.Fragment>
          <h2>
            {title} / {rating}
          </h2>
          <p>{description_intro}</p>
        </React.Fragment>
      );
    }}
  </Query>
);

export default Detail;
