# AWS Bridges
Describes configurations for various AWS bridges.

## EC2
Elastic Compute Cloud

### Instances
- **Structure**: Instances
- **Method**: Search
- **Fields**: dnsName,instanceId,instanceState,instanceType,keyName,privateIpAddress,ipAddress,subnetId,tagSet,vpcId

## ECS
EC2 Container Service

## RDS
Relational Database Service

### DB Instances
- **Structure**: Instances
- **Method**: Search
- **Fields**: AllocatedStorage,AvailabilityZone,BackupRetentionPeriod,DBInstanceArn,DBInstanceClass,DBInstanceIdentifier,DBInstanceStatus,DBName,DbiResourceId,Endpoint,Engine,EngineVersion,FreeStorageSpace,PendingModifiedValues,LatestRestorableTime,MasterUsername,PreferredBackupWindow,PreferredMaintenanceWindow,VpcSecurityGroups,PubliclyAccessible,StorageType

## SES
Simple Email Service

### Send Quota
- **Structure**: GetSendQuota
- **Method**: Retrieve
- **Fields**: Max24HourSend,MaxSendRate,SentLast24Hours

### Send Statistics
- **Structure**: GetSendStatistics
- **Method**: Search
- **Fields**: Bounces,Complaints,DeliveryAttempts,Rejects,Timestamp

### Identities
- **Structure**: ListIdentities
- **Method**: Search
- **Fields**: member

### Verified Email Addresses
- **Structure**: ListVerifiedEmailAddresses
- **Method**: Search
- **Fields**: member
