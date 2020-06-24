import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  UPDATE_COMPANY_PROFILE,
  GET_COMPANY_PROFILE,
  GET_COMPANY_PROFILES,
  CLEAR_COMPANY_PROFILE,
  COMPANY_PROFILE_ERROR,
} from "../actions/types";

const initialState = {
  profile: null,
  companyprofile: null,
  companyprofiles: [],
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case UPDATE_COMPANY_PROFILE:
    case GET_COMPANY_PROFILE:
      return {
        ...state,
        companyprofile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_COMPANY_PROFILES:
      return {
        ...state,
        companyprofiles: payload,
        loading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case COMPANY_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        companyprofile: null,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case CLEAR_COMPANY_PROFILE:
      return {
        ...state,
        companyprofile: null,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
}
