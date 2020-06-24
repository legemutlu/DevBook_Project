import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_JOBS,
  GET_JOB,
  JOB_ERROR,
  UPDATE_VIEWS,
  DELETE_JOB,
  CREATE_JOB,
  UPDATE_JOB,
  ADD_APPLY,
  GET_APPLY,
  REMOVE_APPLY,
} from './types';

// GET JOBS
export const getJobs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/jobs');

    dispatch({
      type: GET_JOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD VIEWS
export const addView = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/jobs/${id}/view`);

    dispatch({
      type: UPDATE_VIEWS,
      payload: { id, views: res.data },
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// DELETE JOB
export const deleteJob = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/jobs/${id}`);

    dispatch({
      type: DELETE_JOB,
      payload: id,
    });

    dispatch(setAlert('Job Removed', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// CREATE JOB
export const createJob = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('api/jobs/create', formData, config);

    dispatch({
      type: CREATE_JOB,
      payload: res.data,
    });

    dispatch(setAlert('Job Offer Creted', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// UPDATE JOB
export const updateJob = (id, formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('test');
  console.log(formData);
  const baseURL = 'http://localhost:3000/';

  try {
    const res = await axios.post(
      baseURL + `api/jobs/${id}/update`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_JOB,
      payload: res.data,
    });

    dispatch(setAlert('Job Offer Updated', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET JOB
export const getJob = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/jobs/${id}`);

    dispatch({
      type: GET_JOB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET APPLY
export const getApply = (id, applyId) => async (dispatch) => {
  try {
    const res = await axios.get(`api/jobs/${id}/applies/${applyId}`);

    dispatch({
      type: GET_APPLY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD APPLY
export const addApply = (jobId, cvFile) => async (dispatch) => {
  try {
    let fd = new FormData();
    fd.append('cv', cvFile);

    const res = await axios.post(`/api/jobs/${jobId}/apply`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({
      type: ADD_APPLY,
      payload: res.data,
    });

    dispatch(setAlert('Apply Added', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// DELETE APPLY

export const deleteApply = (jobId, applyId) => async (dispatch) => {
  try {
    await axios.delete(`/api/jobs/${jobId}/apply/${applyId}`);

    dispatch({
      type: REMOVE_APPLY,
      payload: applyId,
    });

    dispatch(setAlert('Apply Removed', 'danger'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
