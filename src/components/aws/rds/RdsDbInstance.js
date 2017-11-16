import React from 'react';
import DocumentTitle from 'react-document-title';
import { Badge, Label, Row } from 'react-bootstrap';
import { toDate } from '../../../helpers/awsRequest';
import { RdsDbInstanceTable } from './RdsDbInstanceTable';
import { capitalize } from '../../../helpers/string';

const gigabytesToFixedGb = (gb, precision = 0) =>
  (gb / 1.0).toFixed(precision);

const bytesToFixedGb = (bytes, precision = 3) =>
  (bytes / (1000.0 * 1024.0 * 1024.0)).toFixed(precision);

export const statusStyle = instance => instance.DBInstanceStatus === 'available' ? 'success' : 'danger';
export const engineValue = instance => `${instance.Engine} ${instance.EngineVersion}`;
export const endpointValue = instance => `${instance.Address}:${instance.Port}`;

export const allocatedStorage = instance =>
  `${gigabytesToFixedGb(instance.AllocatedStorage)} GB`;

export const freeStorage = instance =>
  `${bytesToFixedGb(JSON.parse(instance.FreeStorageSpace).Minimum)} GB`;

export const freeStorageBadge = instance =>
  <Badge>
    {freeStorage(instance)}
  </Badge>;

export const RdsDbInstance = ({ dbInstance }) => (
  <Row className="rds-db-instance">
    <h4>
      {dbInstance.DBInstanceIdentifier}
      <Label className={'pull-right'} bsStyle={statusStyle(dbInstance)}>
        {capitalize(dbInstance.DBInstanceStatus)}
      </Label>
    </h4>
    <RdsDbInstanceDetails dbInstance={dbInstance} />
  </Row>
);

export const RdsDbInstanceDetails = ({ dbInstance }) => (
  <div className="expanded-row">
    <ul>
      <li>Arn: {dbInstance.DBInstanceArn}</li>
      <li>Instance Class: {dbInstance.DBInstanceClass}</li>
      <li>Endpoint: {endpointValue(dbInstance)}</li>
      <li>Availability Zone: {dbInstance.AvailabilityZone}</li>
      <li>Engine: {engineValue(dbInstance)}</li>
      <li>Storage Type: {dbInstance.StorageType}</li>
      <li>Allocated Storage: {allocatedStorage(dbInstance)}</li>
      <li>Free Storage: {freeStorageBadge(dbInstance)}</li>
      <li>Backup Retention Period: {dbInstance.BackupRetentionPeriod}</li>
      <li>DB Name: {dbInstance.DBName}</li>
      <li>Username: {dbInstance.MasterUsername}</li>
      <li>Resource Id: {dbInstance.DbiResourceId}</li>
      <li>Created At: {toDate(dbInstance.InstanceCreateTime)}</li>
    </ul>
  </div>
);

export const RdsDbInstances = ({ aws }) => (
  <DocumentTitle title={'kinops - AWS RDS'}>
    {!aws.rdsDbInstancesLoaded
      ? <span>Loading...</span>
      : <RdsDbInstanceTable data={aws.rdsDbInstances} />
    }
  </DocumentTitle>
);
