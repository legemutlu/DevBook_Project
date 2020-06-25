import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CompanyItem from "./CompanyItem";
import { getCompanyProfiles } from "../../actions/profile";
import ReactPaginate from 'react-paginate';

const CompanyProfiles = ({
  getCompanyProfiles,
  companyprofile: { companyprofiles, loading, pageLength, currentPage },
}) => {
  useEffect(() => {
    getCompanyProfiles("",0);
  }, [getCompanyProfiles]);

  var [search, setText] = useState('');

  console.log("pageLength" + pageLength)




  const handlePageClick = data => {
    let selected = data.selected + 1;
    console.log("b" + search)
    console.log("d" + selected)


    getCompanyProfiles(search, selected);

  };


  return (
    <Fragment>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <Fragment>
          <h1 className="larger text-primary">Companies</h1>

          <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit search " + search);
            getCompanyProfiles(search, 1);
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
            companies
          </p>
          <div className="companyprofiles">
            {companyprofiles.length > 0 ? (
              companyprofiles.map((companyprofile) => (
                <CompanyItem
                  key={companyprofile._id}
                  companyprofile={companyprofile}
                ></CompanyItem>
              ))
            ) : (
              <h4>No Profiles Found...</h4>
            )}
                  <div className="react-paginate">

<ReactPaginate
          initialPage={0}
          forcePage={(currentPage === undefined ? 1 : currentPage)-1}
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

CompanyProfiles.propTypes = {
  getCompanyProfiles: PropTypes.func.isRequired,
  companyprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  companyprofile: state.profile,
});
export default connect(mapStateToProps, { getCompanyProfiles })(
  CompanyProfiles
);
