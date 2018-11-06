import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  query PostList {
    posts {
      author
      comment
    }
  }
`;

function PostList() {
  return (
    <Fragment>
      <h3>Existing posts:</h3>
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <div>Loading PostList…</div>
            );
          }

          if (error) {
            return (
              <div>
                Could not load PostList.
                Error: {JSON.stringify(error)}
              </div>
            );
          }

          const { posts } = data;

          return (
            <dl>
              {posts.map(({ author, comment }, index) => (
                <Fragment key={`postlist-fragment-${index}`}>
                  <dt>{author}:</dt>
                  <dd>{comment}</dd>
                </Fragment>
              ))}
            </dl>
          );
        }}
      </Query>
    </Fragment>
  );
}

export default PostList;
