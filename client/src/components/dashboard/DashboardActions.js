import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DashboardActions = ({ isCompany }) => {
  return (
    <div>
      {isCompany ? (
        <div className='dash-buttons'>
          <Link to='/edit-company-profile' className='btn btn-light'>
            <i className='fas fa-user-circle text-primary'></i> Edit Company
            Profile
          </Link>
        </div>
      ) : (
        <div className='dash-buttons'>
          <Link to='/edit-profile' className='btn btn-light'>
            <i className='fas fa-user-circle text-primary'></i> Edit Profile
          </Link>
          <Link to='/add-experience' className='btn btn-light'>
            <i className='fab fa-black-tie text-primary'></i> Add Experience
          </Link>
          <Link to='/add-education' className='btn btn-light'>
            <i className='fas fa-graduation-cap text-primary'></i> Add Education
          </Link>
        </div>
      )}
    </div>
  );
};

DashboardActions.propTypes = {
  isCompany: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isCompany: state.auth.isCompany,
});
export default connect(mapStateToProps)(DashboardActions);
