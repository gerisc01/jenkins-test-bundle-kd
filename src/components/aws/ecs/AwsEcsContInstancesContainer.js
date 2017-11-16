import { connect } from 'react-redux';
import { EcsContainerInstanceList } from './EcsContainerInstanceList';
import { loadable } from '../../../helpers/loadable';
import { actions } from '../../../redux/modules/aws';

const stateMapper = state => ({
  loaded: state.aws.ecsContainerInstancesLoaded,
  instances: state.aws.ecsContainerInstancesLoaded
    ? state.aws.ecsContainerInstances
    : {},
});

const loadableEcsContainerInstances = loadable(props =>
  props.fetchEcsContainerInstances())(EcsContainerInstanceList);

export const AwsEcsContInstancesContainer =
  connect(stateMapper, actions)(loadableEcsContainerInstances);
