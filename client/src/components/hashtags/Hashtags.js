import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HashtagItem from './HashtagItem';
import { getHashtags } from '../../actions/hashtag';
import ReactPaginate from 'react-paginate';

const Hashtags = ({
  getHashtags,
  hashtag: { hashtags, pageLength, currentPage },
}) => {
  useEffect(() => {
    getHashtags('', 0);
  }, [getHashtags]);

  var [search, setText] = useState('');

  const handlePageClick = (data) => {
    let selected = data.selected + 1;
    getHashtags(search, selected);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Hashtags</h1>
      <p className='lead'>
        <i className='fas fa-hashtag' /> Find Hashtag
      </p>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submit search ' + search);
          getHashtags(search, 1);
        }}
      >
        <input
          className='search-text'
          name='text'
          placeholder='Search in hashtags'
          value={search}
          onChange={(e) => setText(e.target.value)}
        ></input>
        {'  '}
        <input type='submit' className='btn btn-primary' value='Submit' />
      </form>
      <div className='hashtag-page'>
        {hashtags.map((hashtag) => (
          <HashtagItem key={hashtag._id} hashtag={hashtag} />
        ))}
      </div>

      <div className='react-paginate'>
        <ReactPaginate
          initialPage={0}
          forcePage={currentPage - 1}
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageLength === undefined ? 1 : pageLength}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </Fragment>
  );
};

Hashtags.propTypes = {
  getHashtags: PropTypes.func.isRequired,
  hashtag: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  hashtag: state.hashtag,
});

export default connect(mapStateToProps, { getHashtags })(Hashtags);
