import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import JobItem from './JobItem'; // ----> PostItem ---> create a job for show
import { getJobs } from '../../actions/job';

const Jobs = ({ getJobs, job: { jobs }, isCompany }) => {
  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return (
    <Fragment>
      <h1 className='large text-primary'>Jobs</h1>
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
