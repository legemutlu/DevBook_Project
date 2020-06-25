import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import ReactPaginate from 'react-paginate';

const Profiles = ({ getProfiles, profile: { profiles, loading, pageLength, currentPage } }) => {
  useEffect(() => {
    getProfiles("",0);
  }, [getProfiles]);

  var [search, setText] = useState('');

  console.log("pageLength" + pageLength)




  const handlePageClick = data => {
    let selected = data.selected + 1;
    console.log("b" + search)
    console.log("d" + selected)


    getProfiles(search, selected);

  };



  return (
    <Fragment>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <Fragment>
          <h1 className="larger text-primary">Developers</h1>

  

          <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit search " + search);
            getProfiles(search, 1);
          }}
        >
          <input
            name="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setText(e.target.value)}
          ></input>

          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>


        


          <p className="lead">
            <i className="fab fa-connectdevelop"></i>Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile}></ProfileItem>
              ),
              
              )
              
            ) : (
              <h4>No Profiles Found...</h4>
            )}
      <div className="react-paginate">

<ReactPaginate
          initialPage={0}
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={ (pageLength === undefined ? 1 : pageLength)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
</div>


          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
