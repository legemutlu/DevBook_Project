import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const CompanyAbout = ({
  companyprofile: {
    bio,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
          <div className='line'></div>
        </Fragment>
      )}
    </div>
  );
};

CompanyAbout.propTypes = {
  companyprofile: PropTypes.object.isRequired,
};

export default CompanyAbout;
