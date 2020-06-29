import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import JobItem from './JobItem';
import { getJobs } from '../../actions/job';
import ReactPaginate from 'react-paginate';

const Jobs = ({
  getJobs,
  job: { jobs, pageLength, currentPage },
  isCompany,
}) => {
  useEffect(() => {
    getJobs('', 0);
  }, [getJobs]);

  var [search, setText] = useState('');

  const handlePageClick = (data) => {
    let selected = data.selected + 1;

    getJobs(search, selected);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Jobs</h1>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          getJobs(search, 1);
        }}
      >
        <div>
          <input
            className='search-text'
            name='text'
            placeholder='Search'
            value={search}
            onChange={(e) => setText(e.target.value)}
          ></input>
          {'   '}
          <input type='submit' className='btn btn-primary' value='Submit' />
        </div>
      </form>

      <p className='lead'>
        <i className='' /> Companies Job Offers
      </p>

      {isCompany && (
        <Link to='/create-job'>
          <button type='button' className='btn btn-success'>
            Create a Job Offer
          </button>
        </Link>
      )}
      <div className='jobs'>
        {jobs.map((job) => (
          <JobItem key={job._id} job={job} />
        ))}
      </div>
      <div className='react-paginate'>
        <ReactPaginate
          initialPage={0}
          forcePage={(currentPage === undefined ? 1 : currentPage) - 1}
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

Jobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  isCompany: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  job: state.job,
  isCompany: state.auth.isCompany,
});

export default connect(mapStateToProps, { getJobs })(Jobs);
