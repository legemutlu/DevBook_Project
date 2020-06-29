import axios from 'axios';
import { setAlert } from './alert';
import { GET_HASHTAGS, HASHTAG_ERROR } from './types';

// GET HASHTAGS
export const getHashtags = (search, page) => async (dispatch) => {
  try {
    const res = await axios.get(
      '/api/hashtags?search=' + search + '&page=' + page
    );

    dispatch({
      type: GET_HASHTAGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HASHTAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
