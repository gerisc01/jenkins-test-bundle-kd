import axios from 'axios';
import { bundle } from 'react-kinetic-core';

export const fetchSubmissionById = submissionId =>
  axios.get(`${bundle.apiLocation()}/submissions/${submissionId}?include=activities.details,details,form,form.attributes,form.pages,values`);

export const fetchSubmissionsByKapp = kappSlug =>
  axios.get(`${bundle.apiLocation()}/kapps/${kappSlug}/submissions?include=details,form,form.attributes`);
