import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import ReactPaginate from 'react-paginate';

const Posts = ({ getPosts, post: { posts, allPostsLength, currentPage, sortMethod } , match}) => {
  useEffect(() => {
    getPosts(match.params.hashtag, "", 0, currentPage);
  }, [getPosts, match.params.hashtag]);

  var [search, setText, sort, sortValue] = useState('');


  sort = sortMethod

  if (sortMethod === 0)
  {
    sortValue = "dateDescend"
  }
  
  else if (sortMethod === 1)
  {
    sortValue = "dateAscend"
  }
  
  else if (sortMethod === 2)
  {
    sortValue = "readerDescend"
  }
  
  else if (sortMethod === 3)
  {
    sortValue = "readerAscend"
  }


  console.log("currentPage "+ currentPage)








  var title = match.params.hashtag === undefined ? "Posts" : "Posts on #"+match.params.hashtag


  const onChange = (e) =>
  {
    sort = 0
    switch (e.target.value) {
      case "dateDescend":
        sort = 0
        break;
      case "dateAscend":
        sort = 1;
        break;
      case "readerDescend":
        sort = 2;
        break;
      case "readerAscend":
        sort = 3;
        break;
    }
    getPosts(match.params.hashtag, search, sort, 1);
  }

  const handlePageClick = data => {
    let selected = data.selected + 1;
    console.log("a" + match.params.hashtag)
    console.log("b" + search)
    console.log("c" + sort)
    console.log("d" + selected)


    getPosts(match.params.hashtag, search, sort, selected);

  };




  return (
    <Fragment>
      <h1 className="large text-primary">{title}</h1>

      <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit search " + search);
            getPosts(match.params.hashtag, search, sort, 1);
          }}
        >
          <input
            name="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <select name="sort" value={sortValue} onChange={(e) => onChange(e)}>
            <option value="dateDescend">Newest to Oldest</option>
            <option value="dateAscend">Oldest to Newest</option>
            <option value="readerDescend">Reader by Descend</option>
            <option value="readerAscend">Reader by Ascend</option>
          </select>


          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>

      <PostForm hashtag={match.params.hashtag}/>
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>


      <div className="react-paginate">
        <ReactPaginate
          initialPage={0}
          forcePage={(currentPage === undefined ? 1 : currentPage)-1}
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={ (allPostsLength === undefined ? 1 : allPostsLength)}
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

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  searchValue : PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
