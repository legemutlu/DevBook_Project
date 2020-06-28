import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const HashtagItem = ({ auth, hashtag }) => {
  console.log('gelen hashtag ' + hashtag.hashtag);
  return (
    <div className='hashtag p-1 my'>
      <Link
        to={`/posts/hashtag/${hashtag.hashtag.substring(1)}`}
        className='btn btn-primary'
      >
        <h4>
          {hashtag.hashtag} ({hashtag.value})
        </h4>
      </Link>
    </div>
  );
};

HashtagItem.propTypes = {
  hashtag: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(HashtagItem);
