import React from 'react';
import { Label } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { EcsTaskDetails, statusStyle } from './EcsTask';
import { idFromArn } from '../../../helpers/awsRequest';
import { columnSortField } from '../../../helpers/reactBootstrapTableHelper';
import { capitalize } from '../../../helpers/string';

const statusString = (cell, row) =>
  <Label bsStyle={statusStyle(row)}>{capitalize(row['Last Status'])}</Label>;

const expandRow = row => <EcsTaskDetails task={row} />;

export class EcsTaskTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sizePerPage: props.sizePerPage,
      data: props.data,
    };

    this.options = {
      clearSearch: true,
      defaultSortName: 'Space Slug',
      defaultSortOrder: 'asc',
      noDataText: 'There are no Tasks',
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
          pagination
          search
        >
          <TableHeaderColumn
            dataField="Space Slug"
            dataSort
            sortFunc={columnSortField}
            sortFuncExtraData={'Task Definition Arn'}
            width={'200'}
          >Space Slug</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Task Definition Arn"
            dataFormat={idFromArn}
            dataSort
            sortFunc={columnSortField}
            sortFuncExtraData={'Space Slug'}
            width={'150'}
          >Task Definition</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Container Instance Arn"
            dataFormat={idFromArn}
            dataSort
            sortFunc={columnSortField}
            sortFuncExtraData={['Space Slug', 'Task Definition Arn']}
          >Container Instance</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Last Status"
            dataFormat={statusString}
            dataSort
            width={'85'}
          >Status</TableHeaderColumn>

          {
            // hidden columns - displayed when expanded
          }
          <TableHeaderColumn
            dataField="Task Arn"
            dataFormat={idFromArn}
            hidden
            isKey
          >Task Id</TableHeaderColumn>

        </BootstrapTable>
      </div>
    );
  }
}
