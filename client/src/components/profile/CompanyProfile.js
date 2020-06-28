import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ComapanyTop from './ComapanyTop';
import CompanyAbout from './CompanyAbout';
import { getCompanyProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';

const CompanyProfile = ({
  match,
  companyprofile: { companyprofile, loading },
  auth,
  getCompanyProfileById,
}) => {
  useEffect(() => {
    getCompanyProfileById(match.params.id);
  }, [getCompanyProfileById, match.params.id]);

  return (
    <Fragment>
      {companyprofile === null || loading ? (
        <Spinner></Spinner>
      ) : (
        <Fragment>
          <Link to='/company-profiles' className='btn btn-light'>
            Back To Companies
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === companyprofile.user._id && (
              <Link to='/edit-company-profile' className='btn btn-dark'>
                {' '}
                Edit Company Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ComapanyTop companyprofile={companyprofile} />
            <CompanyAbout companyprofile={companyprofile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

CompanyProfile.propTypes = {
  getCompanyProfileById: PropTypes.func.isRequired,
  companyprofile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  companyprofile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getCompanyProfileById })(
  CompanyProfile
);
