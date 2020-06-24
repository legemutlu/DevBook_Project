import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CompanyItem from "./CompanyItem";
import { getCompanyProfiles } from "../../actions/profile";

const CompanyProfiles = ({
  getCompanyProfiles,
  companyprofile: { companyprofiles, loading },
}) => {
  useEffect(() => {
    getCompanyProfiles();
  }, [getCompanyProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <Fragment>
          <h1 className="larger text-primary">Companies</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>Browse and connect with
            companies
          </p>
          <div className="companyprofiles">
            {companyprofiles.length > 0 ? (
              companyprofiles.map((companyprofile) => (
                <CompanyItem
                  key="companyprofile._id"
                  companyprofile={companyprofile}
                ></CompanyItem>
              ))
            ) : (
              <h4>No Profiles Found...</h4>
            )}
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
