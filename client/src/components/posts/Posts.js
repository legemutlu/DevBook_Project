import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import HashtagItem from '../hashtags/HashtagItem';
import { getHashtags } from '../../actions/hashtag';
import ReactPaginate from 'react-paginate';

const Posts = ({
  getPosts,
  post: { posts, allPostsLength, currentPage, sortMethod },
  getHashtags,
  hashtag: { hashtags },
  match,
}) => {
  useEffect(() => {
    getHashtags('', 0);
  }, [getHashtags]);

  useEffect(() => {
    getPosts(match.params.hashtag, '', 0, currentPage);
  }, [getPosts, match.params.hashtag]);

  var [search, setText, sort, sortValue] = useState('');

  sort = sortMethod;

  if (sortMethod === 0) {
    sortValue = 'dateDescend';
  } else if (sortMethod === 1) {
    sortValue = 'dateAscend';
  } else if (sortMethod === 2) {
    sortValue = 'readerDescend';
  } else if (sortMethod === 3) {
    sortValue = 'readerAscend';
  }

  console.log('currentPage ' + currentPage);

  var title =
    match.params.hashtag === undefined
      ? 'Posts'
      : 'Posts on #' + match.params.hashtag;

  const onChange = (e) => {
    sort = 0;
    switch (e.target.value) {
      case 'dateDescend':
        sort = 0;
        break;
      case 'dateAscend':
        sort = 1;
        break;
      case 'readerDescend':
        sort = 2;
        break;
      case 'readerAscend':
        sort = 3;
        break;
    }
    getPosts(match.params.hashtag, search, sort, 1);
  };

  const handlePageClick = (data) => {
    let selected = data.selected + 1;
    console.log('a' + match.params.hashtag);
    console.log('b' + search);
    console.log('c' + sort);
    console.log('d' + selected);

    getPosts(match.params.hashtag, search, sort, selected);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>{title}</h1>
      <PostForm hashtag={match.params.hashtag} />
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submit search ' + search);
          getPosts(match.params.hashtag, search, sort, 1);
        }}
      >
        <input
          className='search-text'
          name='text'
          placeholder='Search in Post Text'
          value={search}
          onChange={(e) => setText(e.target.value)}
        ></input>
        {'  '}
        <input type='submit' className='btn btn-primary' value='Submit' />
        <select
          className='form-select-category'
          name='sort'
          value={sortValue}
          onChange={(e) => onChange(e)}
        >
          <option value='dateDescend'>Newest to Oldest</option>
          <option value='dateAscend'>Oldest to Newest</option>
          <option value='readerDescend'>Reader by Descend</option>
          <option value='readerAscend'>Reader by Ascend</option>
        </select>
        <br />
      </form>
      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
      <div className='hashtags'>
        {hashtags
          .slice(0, hashtags.length > 5 ? 5 : hashtags.length)
          .map((hashtag) => (
            <HashtagItem key={hashtag._id} hashtag={hashtag} />
          ))}
      </div>
      <footer className='footer'>
        <div className='react-paginate'>
          <ReactPaginate
            initialPage={0}
            forcePage={(currentPage === undefined ? 1 : currentPage) - 1}
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={allPostsLength === undefined ? 1 : allPostsLength}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </footer>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  searchValue: PropTypes.string.isRequired,
  getHashtags: PropTypes.func.isRequired,
  hashtag: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  hashtag: state.hashtag,
});

export default connect(mapStateToProps, { getPosts, getHashtags })(Posts);
