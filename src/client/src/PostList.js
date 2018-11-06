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
              <Fragment>
                <dt key={`postlist-dt-${index}`}>
                  {author}:
                </dt>
                <dd key={`postlist-dd-${index}`}>
                  {comment}
                </dd>
              </Fragment>
            ))}
          </dl>
        );
      }}
    </Query>
  );
}

export default PostList;
