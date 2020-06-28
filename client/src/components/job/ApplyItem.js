import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteApply } from '../../actions/job';

const ApplyItem = ({
  jobId,
  job: { job },
  apply: { _id, name, user, date, cv, avatar },
  auth,
  deleteApply,
  isCompany,
}) => {
  return !isCompany ? (
    !auth.loading && user === auth.user._id ? (
      <Fragment>
        <h1>Your Apply</h1>
        <div className='job bg-white p-1 my-1'>
          <div>
            <Link to={`/profile/${user}`}>
              <img className='round-img my-1' src={avatar} alt='' />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p>{cv.filename}</p>
            <p className='job-date'>
              Applied on <Moment format='DD/MM/YYYY'>{date}</Moment>
            </p>
            <button
              onClick={() => deleteApply(jobId, _id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment></Fragment>
    )
  ) : !auth.loading && job.user === auth.user._id ? (
    <Fragment>
      <div className='job bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img className='round-img my-1' src={avatar} alt='' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p>{cv.filename}</p>
          <p className='job-date'>
            Applied on <Moment format='DD/MM/YYYY'>{date}</Moment>
          </p>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteApply(jobId, _id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
};

ApplyItem.propTypes = {
  jobId: PropTypes.object.isRequired,
  apply: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
  isCompany: PropTypes.object.isRequired,
  deleteApply: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  job: state.job,
  isCompany: state.auth.isCompany,
});

export default connect(mapStateToProps, { deleteApply })(ApplyItem);
