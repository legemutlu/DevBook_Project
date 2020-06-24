import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import job from './job';
import event from './event';

export default combineReducers({ alert, auth, profile, post, job, event });
