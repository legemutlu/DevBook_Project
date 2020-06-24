import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, isCompany, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/events'>
          {''}
          <span className='hide-sm'>Events</span>
        </Link>
      </li>
      <li>
        <Link to='/jobs'>
          {''}
          <span className='hide-sm'>Jobs</span>
        </Link>
      </li>
      <li>
        <Link to='/dev-profiles'>
          {''}
          <span className='hide-sm'>Developers</span>
        </Link>
      </li>
      <li>
        <Link to='/company-profiles'>
          {''}
          <span className='hide-sm'>Companies</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          {''}
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/calendar'>
          {''}
          <span className='hide-sm'>Calendar</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>
          {''}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          {''}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  const companyLinks = (
    <ul>
      <li>
        <Link to='/events'>
          {''}
          <span className='hide-sm'>Events</span>
        </Link>
      </li>
      <li>
        <Link to='/jobs'>
          {''}
          <span className='hide-sm'>Jobs</span>
        </Link>
      </li>
      {/* // Dropdown Menu ( Profiles ) */}
      <li>
        <Link to='/dev-profiles'>
          {''}
          <span className='hide-sm'>Developers</span>
        </Link>
      </li>
      <li>
        <Link to='/company-profiles'>
          {''}
          <span className='hide-sm'>Companies</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          {''}
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/calendar'>
          {''}
          <span className='hide-sm'>Calendar</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard-company'>
          <i className='fas fa-user'></i>
          {''}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          {''}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevBook
        </Link>
      </h1>
      {!loading && (
        <Fragment>
          {isAuthenticated ? (
            <Fragment>{!isCompany ? authLinks : companyLinks}</Fragment>
          ) : (
            guestLinks
          )}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
