import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import JobItem from '../jobs/JobItem';
import ApplyForm from './ApplyForm';
import ApplyItem from '../job/ApplyItem';
import { getJob } from '../../actions/job';

const Job = ({ auth, getJob, job: { job, loading }, match, isCompany }) => {
  useEffect(() => {
    getJob(match.params.id);
  }, [getJob, match.params.id]);

  return loading || job === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/jobs' className='btn'>
        Back To Job Offers
      </Link>
      <JobItem job={job} showActions={false} />
      {!isCompany &&
        !auth.loading &&
        !job.applies.find((apply) => apply.user === auth.user._id) && (
          <ApplyForm jobId={job._id} />
        )}
      <div className='applies'>
        {isCompany && !auth.loading && job.user === auth.user._id && (
          <h1>Applies</h1>
        )}
        {job.applies.map((apply) => (
          <ApplyItem key={apply._id} apply={apply} jobId={job._id} />
        ))}
      </div>
    </Fragment>
  );
};

Job.propTypes = {
  getJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  apply: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  isCompany: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  auth: state.auth,
  isCompany: state.auth.isCompany,
});

export default connect(mapStateToProps, { getJob })(Job);
