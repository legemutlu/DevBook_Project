import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { getCurrentCompanyProfile, deleteAccount } from '../../actions/profile';

const DashboardCompany = ({
  getCurrentCompanyProfile,
  auth: { user },
  companyprofile: { companyprofile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentCompanyProfile();
  }, [getCurrentCompanyProfile]);
  return loading && companyprofile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Company Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
        {companyprofile === null ? (
          <span></span>
        ) : (
          <span>, {companyprofile.location}</span>
        )}
      </p>
      {companyprofile !== null ? (
        <Fragment>
          <DashboardActions />
          <br />
          <button className='btn btn-danger' onClick={() => deleteAccount()}>
            <i className='fas fa-user'></i>Delete My Account
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet create a profile, please add some info</p>
          <Link to='/create-company-profile' className='btn btn-primary my-1'>
            Crete Company Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

DashboardCompany.propTypes = {
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  companyprofile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  companyprofile: state.profile,
});
export default connect(mapStateToProps, {
  getCurrentCompanyProfile,
  deleteAccount,
})(DashboardCompany);
