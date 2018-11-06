import React from 'react';

function LastPost({author, comment}) {
  return (
    <div>
      <h3>Last Post:</h3>
      <dl>
        <dt>Author:</dt>
        <dd>{author}</dd>
        <dt>Comment:</dt>
        <dd>{comment}</dd>
      </dl>
    </div>
  );
}

export default LastPost;
