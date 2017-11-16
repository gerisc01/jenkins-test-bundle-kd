import React from 'react';
import { Label } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Ec2InstanceDetails, name, statusStyle } from './Ec2Instance';
import { columnSortField } from '../../../helpers/reactBootstrapTableHelper';


const statusString = (cell, row) =>
  <Label bsStyle={statusStyle(row)}>{row['Instance State']}</Label>;

const nameTag = cell => name(JSON.parse(cell));

const expandRow = row => <Ec2InstanceDetails ec2Instance={row} />;

export class Ec2InstanceTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      sizePerPage: props.sizePerPage,
    };

    this.options = {
      clearSearch: true,
      noDataText: 'There are no EC2 Instances',
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
          expandableRow={() => true}
          expandComponent={expandRow}
          hover
          search
          options={this.options}
        >
          <TableHeaderColumn
            dataField="Instance Id"
            dataSort
            isKey
            width={'100'}
          >Instance Id</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Tag List"
            dataFormat={nameTag}
            dataSort
            width={'100'}
          >Name</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Instance Type"
            dataSort
            sortFunc={columnSortField}
            sortFuncExtraData={'Instance Id'}
            width={'100'}
          >Type</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Public IP Address"
            width={'100'}
          >Public IP</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Instance State"
            dataFormat={statusString}
            width={'75'}
          >Status</TableHeaderColumn>

        </BootstrapTable>
      </div>
    );
  }
}
