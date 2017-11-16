import React from 'react';
import { Label } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';
import { idFromArn } from '../../../helpers/awsRequest';
import { numberSort } from '../../../helpers/reactBootstrapTableHelper';
import { capitalize } from '../../../helpers/string';
import {
  EcsContainerInstanceDetails,
  agentConnected,
  drawValue,
  statusStyle,
} from './EcsContainerInstance';


const containerLink = cell =>
  <Link to={`/ecs/containers/${idFromArn(cell)}`}>{idFromArn(cell)}</Link>;

const connected = (cell, row) => agentConnected(row);

const statusString = (cell, row) =>
  <Label bsStyle={statusStyle(row)}>{capitalize(row.Status)}</Label>;

const remainingMemory = (cell, row) =>
  drawValue(row, 'Remaining Memory');

const runningTasksCount = (cell, row) =>
  drawValue(row, 'Running Tasks Count');

const memorySort = (a, b, order) => {
  const aCompare = drawValue(a, 'Remaining Memory');
  const bCompare = drawValue(b, 'Remaining Memory');
  return numberSort(aCompare, bCompare, order);
};

const expandRow = row => <EcsContainerInstanceDetails instance={row} />;

export class EcsContainerInstanceTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      sizePerPage: props.sizePerPage,
    };

    this.options = {
      clearSearch: true,
      defaultSortName: 'Remaining Resources',
      defaultSortOrder: 'asc',
      noDataText: 'There are no Container Instances',
      sizePerPage: this.state.sizePerPage || 10,
      sizePerPageList: [
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: '50', value: 50 },
        { text: '100', value: 100 },
        { text: 'All', value: this.state.data.length },
      ],
      searchDelayTime: 200,
    };
  }

  render() {
    return (
      <div>
        <BootstrapTable
          data={this.state.data}
          options={this.options}
          expandableRow={() => true}
          expandComponent={expandRow}
          hover
          search
        >
          <TableHeaderColumn
            dataField="Container Instance Arn"
            dataFormat={containerLink}
            isKey
            width={'210'}
          >Container Instance</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Running Tasks Count"
            dataFormat={runningTasksCount}
            dataSort
            width={'80'}
          >Tasks</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Remaining Resources"
            dataFormat={remainingMemory}
            dataSort
            sortFunc={memorySort}
            width={'100'}
          >Memory (MB)</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Agent Connected"
            dataFormat={connected}
            width={'80'}
          >Agent</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Last Status"
            dataFormat={statusString}
            width={'75'}
          >Status</TableHeaderColumn>

        </BootstrapTable>
      </div>
    );
  }
}
