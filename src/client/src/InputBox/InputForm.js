import React, { Component } from 'react';

class InputBox extends Component {
  state = {
    author: '',
    comment: '',
  };

  updateAuthor = (e) => {
    this.setState({ author: e.target.value });
  };

  updateComment = (e) => {
    this.setState({ comment: e.target.value });
  };

  render() {
    const { onClick: clickHandler } = this.props;
    const { author, comment } = this.state;

    return (
      <div>
        <label>
          Author:
          <input type="text" value={author} onChange={this.updateAuthor} />
        </label>
        <br />
        <label>
          Comment:
          <textarea value={comment} onChange={this.updateComment} />
        </label>
        <br />
        <button
          onClick={() => {
            clickHandler && clickHandler(this.state);

            this.setState({
              author: '',
              comment: '',
            });
          }}
        >
          Send!
        </button>
      </div>
    );
  }
}

export default InputBox;
