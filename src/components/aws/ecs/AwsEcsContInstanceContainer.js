import { connect } from 'react-redux';
import { EcsContainerInstance } from './EcsContainerInstance';
import { idFromArn } from '../../../helpers/awsRequest';

const stateMapper = (state, props) => ({
  loaded: state.aws.ecsContainerInstancesLoaded,
  instance: state.aws.ecsContainerInstancesLoaded
    ? state.aws.ecsContainerInstances
      .find(instance =>
        idFromArn(instance['Container Instance Arn']) === props.match.params.containerId)
    : {},
});

export const AwsEcsContInstanceContainer = connect(stateMapper)(EcsContainerInstance);
