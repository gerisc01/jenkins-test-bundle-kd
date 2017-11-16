import { connect } from 'react-redux';
import { loadable } from '../../helpers/loadable';
import { actions } from '../../redux/modules/aws';
import { Ec2Instances } from './ec2/Ec2Instance';
import { EcsCluster } from './ecs/EcsCluster';
import { EcsServices } from './ecs/EcsService';
import { EcsTasks } from './ecs/EcsTask';
import { RdsDbInstances } from './rds/RdsDbInstance';
import { SesSendQuota } from './ses/SesSendQuota';
import { SesSendStats } from './ses/SesSendStats';

export const stateMapper = state => ({
  aws: state.aws,
});

// loadable items
const loadableEc2Instances = loadable(props => props.fetchEc2Instances())(Ec2Instances);
const loadableEcsCluster = loadable(props => props.fetchEcsCluster())(EcsCluster);
const loadableEcsServices = loadable(props => props.fetchEcsServices())(EcsServices);
const loadableEcsTasks = loadable(props => props.fetchEcsTasks())(EcsTasks);
const loadableRdsDbInstances = loadable(props => props.fetchRdsDbInstances())(RdsDbInstances);
const loadableSesSendQuota = loadable(props => props.fetchSesSendQuota())(SesSendQuota);
const loadableSesSendStats = loadable(props => props.fetchSesSendStats())(SesSendStats);

// containers wrapping loadable items
export const Ec2Container = connect(stateMapper, actions)(loadableEc2Instances);
export const EcsContainer = connect(stateMapper, actions)(loadableEcsCluster);
export const EcsServicesContainer = connect(stateMapper, actions)(loadableEcsServices);
export const EcsTasksContainer = connect(stateMapper, actions)(loadableEcsTasks);
export const RdsContainer = connect(stateMapper, actions)(loadableRdsDbInstances);
export const SesSendQuotaContainer = connect(stateMapper, actions)(loadableSesSendQuota);
export const SesSendStatsContainer = connect(stateMapper, actions)(loadableSesSendStats);
