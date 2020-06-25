import {
  GET_HASHTAGS,
  HASHTAG_ERROR,
} from '../actions/types';

const initialState = {
  hashtags: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_HASHTAGS:
      return {
        ...state,
        hashtags: payload.hashtags,
        loading: false,
        pageLength : payload.pageLength,
        currentPage : (payload.currentPage + 1),

      };
  
    case HASHTAG_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
