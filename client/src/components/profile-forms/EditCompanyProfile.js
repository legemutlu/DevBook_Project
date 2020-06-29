import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  createCompanyProfile,
  getCurrentCompanyProfile,
} from '../../actions/profile';
import { connect } from 'react-redux';

const EditCompanyProfile = ({
  companyprofile: { companyprofile, loading },
  createCompanyProfile,
  getCurrentCompanyProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    location: '',
    bio: '',
    youtube: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  });

  const {
    name,
    website,
    location,
    bio,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = formData;

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentCompanyProfile();
    setFormData({
      name: loading || !companyprofile.name ? ' ' : companyprofile.name,
      website:
        loading || !companyprofile.website ? ' ' : companyprofile.website,
      location:
        loading || !companyprofile.location ? ' ' : companyprofile.location,
      bio: loading || !companyprofile.bio ? ' ' : companyprofile.bio,
      twitter:
        loading || !companyprofile.social ? ' ' : companyprofile.social.twitter,
      facebook:
        loading || !companyprofile.social
          ? ' '
          : companyprofile.social.facebook,
      linkedin:
        loading || !companyprofile.social
          ? ' '
          : companyprofile.social.linkedin,
      youtube:
        loading || !companyprofile.social ? ' ' : companyprofile.social.youtube,
      instagram:
        loading || !companyprofile.social
          ? ' '
          : companyprofile.social.instagram,
    });
  }, [loading, getCurrentCompanyProfile]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createCompanyProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Company Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Company Name</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            City & state suggested (eg. Istanbul)
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            {' '}
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' value='Submit' />
        <Link className='btn btn-light my-1' to='/dashboard-company'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditCompanyProfile.propTypes = {
  createCompanyProfile: PropTypes.func.isRequired,
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  companyprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  companyprofile: state.profile,
});

export default connect(mapStateToProps, {
  createCompanyProfile,
  getCurrentCompanyProfile,
})(withRouter(EditCompanyProfile));
