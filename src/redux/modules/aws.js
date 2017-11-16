import { convertMultipleBridgeRecords } from '../../lib/BridgedResource';
import {
  fetchEc2Instances,
  fetchEcsCluster,
  fetchEcsContainerInstances,
  fetchEcsServices,
  fetchEcsTasks,
  fetchRdsDbInstances,
  fetchSesSendQuota,
  fetchSesSendStats,
} from '../../helpers/awsRequest';

export const types = {
  FETCH_EC2_INSTANCES: '@kd/kinops-support/FETCH_EC2_INSTANCES',
  FETCH_ECS_CLUSTER: '@kd/kinops-support/FETCH_ECS_CLUSTER',
  FETCH_ECS_CONTAINER_INSTANCES: '@kd/kinops-support/FETCH_ECS_CONTAINER_INSTANCES',
  FETCH_ECS_SERVICES: '@kd/kinops-support/FETCH_ECS_SERVICES',
  FETCH_ECS_TASKS: '@kd/kinops-support/FETCH_ECS_TASKS',
  FETCH_RDS_DB_INSTANCES: '@kd/kinops-support/FETCH_RDS_DB_INSTANCES',
  FETCH_SES_SEND_QUOTA: '@kd/kinops-support/FETCH_SES_SEND_QUOTA',
  FETCH_SES_SEND_STATS: '@kd/kinops-support/FETCH_SES_SEND_STATS',
};

export const actions = {
  fetchEc2Instances: () => ({
    type: types.FETCH_EC2_INSTANCES,
    payload: fetchEc2Instances(),
  }),
  fetchEcsCluster: () => ({
    type: types.FETCH_ECS_CLUSTER,
    payload: fetchEcsCluster(),
  }),
  fetchEcsContainerInstances: () => ({
    type: types.FETCH_ECS_CONTAINER_INSTANCES,
    payload: fetchEcsContainerInstances(),
  }),
  fetchEcsServices: () => ({
    type: types.FETCH_ECS_SERVICES,
    payload: fetchEcsServices(),
  }),
  fetchEcsTasks: () => ({
    type: types.FETCH_ECS_TASKS,
    payload: fetchEcsTasks(),
  }),
  fetchRdsDbInstances: () => ({
    type: types.FETCH_RDS_DB_INSTANCES,
    payload: fetchRdsDbInstances(),
  }),
  fetchSesSendQuota: () => ({
    type: types.FETCH_SES_SEND_QUOTA,
    payload: fetchSesSendQuota(),
  }),
  fetchSesSendStats: () => ({
    type: types.FETCH_SES_SEND_STATS,
    payload: fetchSesSendStats(),
  }),
};

export const defaultState = {
  ec2Instances: [],
  ec2InstancesLoaded: false,
  ecsCluster: {},
  ecsClusterLoaded: false,
  ecsContainerInstances: [],
  ecsContainerInstancesLoaded: false,
  ecsServices: [],
  ecsServicesLoaded: false,
  ecsTasks: [],
  ecsTasksLoaded: false,
  rdsDbInstances: [],
  rdsDbInstancesLoaded: false,
  sesSendQuota: {},
  sesSendQuotaLoaded: false,
  sesSendStats: [],
  sesSendStatsLoaded: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_EC2_INSTANCES:
      return {
        ...state,
        ec2Instances: convertMultipleBridgeRecords(action.payload.records),
        ec2InstancesLoaded: true,
      };
    case types.FETCH_ECS_CLUSTER:
      return {
        ...state,
        ecsCluster: action.payload.record ? action.payload.record.attributes : {},
        ecsClusterLoaded: true,
      };
    case types.FETCH_ECS_CONTAINER_INSTANCES:
      return {
        ...state,
        ecsContainerInstances: convertMultipleBridgeRecords(action.payload.records),
        ecsContainerInstancesLoaded: true,
      };
    case types.FETCH_ECS_SERVICES:
      return {
        ...state,
        ecsServices: [],
        ecsServicesLoaded: true,
      };
    case types.FETCH_ECS_TASKS:
      return {
        ...state,
        ecsTasks: convertMultipleBridgeRecords(action.payload.records),
        ecsTasksLoaded: true,
      };
    case types.FETCH_RDS_DB_INSTANCES:
      return {
        ...state,
        rdsDbInstances: convertMultipleBridgeRecords(action.payload.records),
        rdsDbInstancesLoaded: true,
      };
    case types.FETCH_SES_SEND_QUOTA:
      return {
        ...state,
        sesSendQuota: action.payload.record.attributes,
        sesSendQuotaLoaded: true,
      };
    case types.FETCH_SES_SEND_STATS:
      return {
        ...state,
        sesSendStats: convertMultipleBridgeRecords(action.payload.records),
        sesSendStatsLoaded: true,
      };
    default: return state;
  }
};

export default reducer;
