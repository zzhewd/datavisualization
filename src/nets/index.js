import * as api from './api';
import http from 'axios';
import qs from 'qs';

import {
  ajaxToPromise
} from '../utils';

const axios = http.create({
    timeout: 15000,
    // withCredentials: true //跨域请求携带cookie
});

export function getchartlist (payload) {
    return ajaxToPromise(axios.get(api.FIRSTCHART));
}
export function getlinechart (payload) {
    return ajaxToPromise(axios.post(api.GETLINECHART, payload));
}
