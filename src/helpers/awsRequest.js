import React from 'react';
import Moment from 'react-moment';
import {
  ec2InstancesBR,
  ecsClusterBR,
  ecsContainerInstancesBR,
  ecsTasksBR,
  rdsDbInstancesBR,
  sesSendQuotaBR,
  sesSendStatsBR,
} from '../helpers/bridgedResourcesRequest';

export const idFromArn = arn => arn.slice(arn.lastIndexOf('/') + 1);

/**
 * Converts an epoch timestamp to a Moment.
 * This form is used by the ECS API.
 *
 * @param {number} expNum Number of seconds since epoch
 */
export const toDateFromEpoch = expNum =>
  (new Date().getTime() > expNum)
    ? <Moment unix fromNow>{expNum}</Moment>
    : <Moment unix toNow>{expNum}</Moment>;
/**
 * Converts an ISO-8601 formatted timestamp to a Moment.
 * This form is used by the RDS API.
 *
 * @param {string} date ISO-8601 formatted date/time.
 */
export const toDate = date =>
  (new Date().getTime() > new Date(date).getTime())
    ? <Moment fromNow>{date}</Moment>
    : <Moment toNow>{date}</Moment>;

export const fetchEc2Instances = () =>
  fetch(ec2InstancesBR())
    .then(response => response.json());

export const fetchEcsCluster = () =>
  fetch(ecsClusterBR())
    .then(response => response.json());

export const fetchEcsContainerInstances = () =>
  fetch(ecsContainerInstancesBR())
    .then(response => response.json());

export const fetchEcsTasks = () =>
  fetch(ecsTasksBR())
    .then(response => response.json());

export const fetchEcsServices = () => [];

export const fetchRdsDbInstances = () =>
  fetch(rdsDbInstancesBR())
    .then(response => response.json());

export const fetchSesSendQuota = () =>
  fetch(sesSendQuotaBR())
    .then(response => response.json());

export const fetchSesSendStats = () =>
  fetch(sesSendStatsBR())
    .then(response => response.json());
