import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost, hashtag }) => {
  const [text, setText] = useState('');

  console.log("PostForm " + hashtag)

  var title = (hashtag === undefined || hashtag.length === 0) ? "" : "on #"+hashtag


  return (
    <div>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something to Community {title}</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text, hashtag });
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
          <input type="submit" className="btn btn-primary" value="Submit" />
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
