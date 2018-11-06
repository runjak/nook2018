import React, { Fragment } from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const subscription = gql`
  subscription PostAdded {
    postAdded {
      author
      comment
    }
  }
`;

function PostStream() {
  return (
    <Fragment>
      <h3>Live Post Streaming:</h3>
      <dl>
        <Subscription subscription={subscription}>
          {({ data, loading }) => {
            if (loading) {
              return '…';
            }

            const { author, comment } = data.postAdded;

            return (
              <Fragment>
                <dt>{author}:</dt>
                <dt>{comment}</dt>
              </Fragment>
            );
          }}
        </Subscription>
      </dl>
    </Fragment>
  );
}

export default PostStream;
