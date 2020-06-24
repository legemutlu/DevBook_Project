import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addView, deleteJob } from '../../actions/job';

const JobItem = ({
  auth,
  job: { _id, name, description, website, date, user, views },
  addView,
  deleteJob,
  showActions,
  isCompany,
}) => {
  return (
    <div>
      <div className='job bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/company/${user}`}>
            <img className='round-img my-1' src={user.avatar} alt='' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{description}</p>
          {!showActions && <p className='my-1'>{website}</p>}
          <p className='job-date'>
            {<Moment format='DD/MM/YYYY'>{date}</Moment>}
          </p>
          <p className='job-date'>
            Job Views: {views.length > 0 && <span>{views.length}</span>}
          </p>
          {showActions && (
            <Fragment>
              <Link
                to={`/jobs/${_id}`}
                className='btn btn-primary'
                onClick={(e) => addView(_id)}
              >
                View Offer
              </Link>
            </Fragment>
          )}
          {!auth.loading && user === auth.user._id && (
            <Fragment>
              <button
                type='button'
                onClick={(e) => deleteJob(_id)}
                className='btn btn-danger'
              >
                Delete Your Job Offer
                <i className='fas fa-times'></i>
              </button>
              <Link className='btn btn-light my-1' to={`/jobs/${_id}/update`}>
                Update Job Offer
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

JobItem.defaultProps = {
  showActions: true,
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addView: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  isCompany: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  isCompany: state.auth.isCompany,
});
export default connect(mapStateToProps, { addView, deleteJob })(JobItem);
