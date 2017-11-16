import React from 'react';
import { Label } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
  RdsDbInstanceDetails,
  engineValue,
  freeStorage,
  statusStyle,
} from './RdsDbInstance';
import { capitalize } from '../../../helpers/string';


const statusString = (cell, row) =>
  <Label bsStyle={statusStyle(row)}>{capitalize(cell)}</Label>;

const engineString = (cell, row) => engineValue(row);

const freeStorageString = (cell, row) => freeStorage(row);

const expandRow = row => <RdsDbInstanceDetails dbInstance={row} />;

export class RdsDbInstanceTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      sizePerPage: props.sizePerPage,
    };

    this.options = {
      clearSearch: true,
      noDataText: 'There are no DB Instances',
      sizePerPage: this.state.sizePerPage || 50,
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
            dataField="DBInstanceIdentifier"
            dataSort
            isKey
            width={'210'}
          >DB Instance</TableHeaderColumn>

          <TableHeaderColumn
            dataField="DBInstanceClass"
            width={'100'}
          >Instance Class</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Engine"
            dataFormat={engineString}
            width={'210'}
          >Engine</TableHeaderColumn>

          <TableHeaderColumn
            dataField="FreeStorageSpace"
            dataFormat={freeStorageString}
            dataSort
            width={'150'}
          >Free Storage</TableHeaderColumn>

          <TableHeaderColumn
            dataField="DBInstanceStatus"
            dataFormat={statusString}
            width={'75'}
          >Status</TableHeaderColumn>

        </BootstrapTable>
      </div>
    );
  }
}
