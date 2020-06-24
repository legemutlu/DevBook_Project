import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CompanyItem = ({
  companyprofile: {
    user: { _id, name, avatar },
    location,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img className='round-img my-1' src={avatar} alt='' />
      <div>
        <h2>{name}</h2>{' '}
        <p className='my-1'>{location && <span> at {location}</span>}</p>
        <Link to={`/profile/company/${_id}`} className='btn btn-primary'>
          {' '}
          View Profile
        </Link>
      </div>
    </div>
  );
};

CompanyItem.propTypes = { companyprofile: PropTypes.object.isRequired };

export default CompanyItem;
