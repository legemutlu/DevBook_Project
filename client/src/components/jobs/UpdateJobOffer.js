import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateJob, getJob } from '../../actions/job';

const UpdateJobOffer = ({
  updateJob,
  history,
  job: { job, loading },
  getJob,
  auth,
  match,
}) => {
  const [formData, setFormData] = useState({
    website: '',
    description: '',
  });

  const { website, description } = formData;

  useEffect(() => {
    getJob(match.params.id);
    setFormData({
      website: loading || !job.website ? ' ' : job.website,
      description: loading || !job.description ? ' ' : job.description,
    });
  }, [getJob, loading]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJob(job._id, formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Update Job Offer</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <textarea
            name='website'
            placeholder='Website'
            value={website}
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => onChange(e)}
            required
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

UpdateJobOffer.propTypes = {
  updateJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getJob: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  job: state.job,
  auth: state.auth,
});

export default connect(mapStatetoProps, { updateJob, getJob })(
  withRouter(UpdateJobOffer)
);
