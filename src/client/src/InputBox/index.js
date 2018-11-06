import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import InputForm from './InputForm';
import LastPost from './LastPost';

const mutation = gql`
  mutation AddPost($author: String!, $comment: String!) {
    addPost(author: $author, comment: $comment) {
      author
      comment
    }
  }
`;

function InputBox() {
  return (
    <Mutation mutation={mutation}>
      {(addPost, { data }) => (
        <div>
          <h3>Publish a post:</h3>

          <InputForm onClick={(post) => {
            addPost({ variables: post });
          }} />

          {data && data.addPost && (
            <LastPost
              author={data.addPost.author}
              comment={data.addPost.comment}
            />
          )}
        </div>
      )}
    </Mutation>
  );
}

export default InputBox;
