import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addApply } from '../../actions/job';

const ApplyForm = ({ addApply, jobId, job: { job } }) => {
  const [cv, setCv] = useState('');
  const [cvname, setCvname] = useState('');

  const onChange = (e) => {
    setCv(e.target.files[0]);
    setCvname(e.target.files[0].name);
  };

  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addApply(jobId, cv);
        }}
      >
        <div className='custom-file'>
          <input
            type='file'
            className='custom-file-input'
            id='cv'
            onChange={onChange}
          />
          <label className='custom-file-label' htmFor='customFile'>
            {cvname}
          </label>
        </div>

        <input type='submit' className='btn btn-success my-1'></input>
      </form>
    </Fragment>
  );
};

ApplyForm.propTypes = {
  addApply: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  isCompany: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  job: state.job,
  isCompany: state.auth.isCompany,
});

export default connect(mapStateToProps, { addApply })(ApplyForm);
