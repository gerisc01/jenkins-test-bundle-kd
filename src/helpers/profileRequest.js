import axios from 'axios';
import { bundle } from 'react-kinetic-core';

const PROFILE_ENDPOINT = `${bundle.apiLocation()}/me`;

export const fetchProfile = () => axios.get(PROFILE_ENDPOINT);
export const putProfile = profile => axios.put(PROFILE_ENDPOINT, profile);
