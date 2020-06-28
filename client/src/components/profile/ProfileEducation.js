import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, current, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <strong>Degree:</strong> {degree}
      </p>
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment>-{' '}
        {!to ? 'Now' : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>Fieldofstudy:</strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {};

export default ProfileEducation;
