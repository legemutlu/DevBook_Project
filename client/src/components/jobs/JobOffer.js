import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createJob } from '../../actions/job';

const JobOffer = ({ createJob, history }) => {
  const [formData, setFormData] = useState({
    website: '',
    description: '',
  });

  const { website, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Job Offer</h1>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          createJob(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            name='website'
            placeholder='Website'
            value={website}
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/jobs'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

JobOffer.propTypes = {
  createJob: PropTypes.func.isRequired,
};

export default connect(null, { createJob })(withRouter(JobOffer));
