import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div>
      <div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something to Community</h3>
        </div>
        <form
          class="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text });
            setText(' ');
          }}
        >
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  posts: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
