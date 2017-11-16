import { bridgedResourceUrl } from '../lib/BridgedResource';

const defaultCluster = 'kinops';

const defaultSpaceAttributes = [
  'Admin Email',
  'Admin Name',
  'Admin Phone',
  'Assigned Team',
  'Created At',
  'Company Name',
  'Description',
  'Environment Status',
  'Shared Workflow Engine',
  'Space Slug',
  'Status',
  'Submission ID',
];

const defaultEcsTaskAttributes = [
  'Container Instance Arn',
  'Created At',
  'EC2 Instance Id',
  'Family',
  'Host Port',
  'IP Address',
  'Last Status',
  'Overrides',
  'Space Slug',
  'Started At',
  'Task Arn',
  'Task Definition Arn',
];

const brUrl = props =>
  bridgedResourceUrl({
    kappSlug: props.kappSlug || 'support',
    formSlug: props.formSlug || 'shared-resources',
    bridgedResourceName: props.bridgedResourceName,
    attributes: props.attributes,
    values: props.values,
    limit: props.limit,
    offset: props.offset,
  });

/**
 * Retrieve all spaces.
 *
 * @param {*} props
 */
export const datastoreSpacesBR = (props = {}) =>
  brUrl({
    bridgedResourceName: 'Datastore - Spaces',
    attributes: props.attributes || defaultSpaceAttributes,
  });

/**
 * Retrieve a space by the space slug.
 *
 * @param {*} props
 * @param {string} props.spaceSlug
 */
export const datastoreSpaceBR = props =>
  brUrl({
    bridgedResourceName: 'Datastore - Space - By Slug',
    values: {
      'Space Slug': props.spaceSlug,
    },
    attributes: props.attributes || defaultSpaceAttributes,
  });

/**
 * Retrieve all AWS EC2 Instances.
 */
export const ec2InstancesBR = () =>
  brUrl({
    bridgedResourceName: 'EC2 Instances',
  });

/**
 * Retrieve an AWS EC2 Instance by Id.
 *
 * @param {*} props
 * @param {string} props.instanceId Id of the EC2 Instance
 */
export const ec2InstanceBR = props =>
  brUrl({
    bridgedResourceName: 'EC2 Instance - By Id',
    values: {
      'EC2 Instance': props.instanceId,
    },
  });

/**
 * Retrieve all AWS ECS Cluster details for a single cluster.
 *
 * @param {string=kinops} cluster Name of the cluster
 */
export const ecsClusterBR = (cluster = defaultCluster) =>
  brUrl({
    bridgedResourceName: 'ECS Cluster',
    values: {
      Cluster: cluster,
    },
  });

/**
 * Retrieve all AWS ECS Container Instances.
 *
 * @param {string=kinops} cluster Name of the cluster
 */
export const ecsContainerInstancesBR = (cluster = defaultCluster) =>
  brUrl({
    bridgedResourceName: 'ECS Containers - By Cluster',
    values: {
      Cluster: cluster,
    },
  });

/**
 * Retrieve an AWS ECS Container Instance.
 *
 * @param {*} props
 * @param {string=kinops} props.cluster Name of the cluster
 * @param {string} props.instanceId Id of the ECS Container Instance
 */
export const ecsContainerInstanceBR = props =>
  brUrl({
    bridgedResourceName: 'ECS Container',
    values: {
      Cluster: props.cluster || defaultCluster,
      'ECS Container Instance': props.instanceId,
    },
  });

/**
 * Retrieve all AWS ECS Tasks in the cluster".
 *
 * @param {*} props
 * @param {string=kinops} cluster Name of the cluster
 */
export const ecsTasksBR = (props = {}) =>
  brUrl({
    bridgedResourceName: 'ECS Tasks - By Cluster',
    values: {
      Cluster: props.cluster || defaultCluster,
    },
    attributes: props.attributes || defaultEcsTaskAttributes,
    limit: props.limit,
    offset: props.offset,
  });

/**
 * Retrieve all AWS ECS Tasks by ECS Container Instance".
 *
 * @param {*} props
 * @param {string=kinops} props.cluster Name of the cluster
 * @param {string} props.containerInstance Id or Arn of the ECS Container Instance
 */
export const ecsTasksByContainerInstanceBR = (props = {}) =>
  brUrl({
    bridgedResourceName: 'ECS Tasks - By Container Instance',
    values: {
      Cluster: props.cluster || defaultCluster,
      'ECS Container Instance': props.containerInstance,
    },
    attributes: props.attributes || defaultEcsTaskAttributes,
  });

/**
 * Retrieve all AWS ECS Tasks by the environment variable "space-slug".
 *
 * @param {*} props
 * @param {string=kinops} props.cluster Name of the cluster
 * @param {string} props.spaceSlug Space slug
 */
export const ecsTasksBySpaceBR = (props = {}) =>
  brUrl({
    bridgedResourceName: 'ECS Tasks - By Space',
    values: {
      Cluster: props.cluster || defaultCluster,
      'Space Slug': props.spaceSlug,
    },
    attributes: props.attributes || defaultEcsTaskAttributes,
  });

/**
 * Retrieve all AWS ECS Tasks by a Task Definition.
 *
 * @param {*} props
 * @param {string=kinops} props.cluster Name of the cluster
 * @param {string} props.taskDefinition Name of the Task Definition
 */
export const ecsTasksByDefinitionBR = (props = {}) =>
  brUrl({
    bridgedResourceName: 'ECS Tasks - By Task Definition',
    values: {
      Cluster: props.cluster || defaultCluster,
      'ECS Task Definition': props.taskDefinition,
    },
    attributes: props.attributes || defaultEcsTaskAttributes,
  });

/**
 * Retrieve an AWS ECS Task.
 *
 * @param {*} props
 * @param {string=kinops} props.cluster Name of the cluster
 * @param {string} props.arn Arn or Id of the ECS Task
 */
export const ecsTaskBR = (props = {}) =>
  brUrl({
    bridgedResourceName: 'ECS Task - By Id',
    values: {
      Cluster: props.cluster || defaultCluster,
      'ECS Task': props.arn,
    },
  });

/**
 * Retrieve a person by email.
 *
 * @param {string} email Email of the user
 */
export const personByEmailBR = email =>
  brUrl({
    bridgedResourceName: 'Person - By Email',
    values: {
      Email: email,
    },
  });

/**
 * Retrieve a person by username.
 *
 * @param {string} username Username of the user
 */
export const personByUsernameBR = username =>
  brUrl({
    bridgedResourceName: 'Person - By Username',
    values: {
      Username: username,
    },
  });

/**
 * Retrieve an RDS database by name.
 *
 * @param {string} name name of the database instance
 */
export const rdsDbInstanceByNameBR = name =>
  brUrl({
    bridgedResourceName: 'RDS DB Instance - By Name',
    values: {
      'RDS Instance Name': name,
    },
  });

/**
 * List all RDS databases.
 */
export const rdsDbInstancesBR = () =>
  brUrl({
    bridgedResourceName: 'RDS DB Instances',
  });

/**
 * Retrieve current SES send quota information.
 */
export const sesSendQuotaBR = () =>
  brUrl({
    bridgedResourceName: 'SES Send Quota',
  });

/**
 * Retrieve SES send statistics.
 */
export const sesSendStatsBR = () =>
  brUrl({
    bridgedResourceName: 'SES Statistics',
  });

/**
 * Retrieve SES send statistics for a single timestamp.
 *
 * @param {string} timestamp String formatted timestamp: yyyy-mm-dd
 */
export const sesSendStatsByTimestampBR = timestamp =>
  brUrl({
    bridgedResourceName: 'SES Statistics - By Timestamp',
    values: {
      Timestamp: timestamp,
    },
  });
