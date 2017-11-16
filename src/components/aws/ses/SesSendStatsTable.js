import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { numberSortField } from '../../../helpers/reactBootstrapTableHelper';

const timestampFormatter = cell => cell;

export class SesSendStatsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      sizePerPage: props.sizePerPage,
    };

    this.options = {
      defaultSortName: 'Timestamp',
      defaultSortOrder: 'desc',
      noDataText: 'There are no SES Send Statistics',
      sizePerPage: this.state.sizePerPage || 10,
      sizePerPageList: [
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: '50', value: 50 },
        { text: '100', value: 100 },
        { text: 'All', value: this.state.data.length },
      ],
    };
  }

  render() {
    return (
      <div>
        <BootstrapTable
          data={this.state.data}
          options={this.options}
          hover
          pagination
        >
          <TableHeaderColumn
            dataField="Timestamp"
            dataSort
            dataFormat={timestampFormatter}
            isKey
            width={'100'}
          >Timestamp</TableHeaderColumn>

          <TableHeaderColumn
            dataField="DeliveryAttempts"
            dataSort
            sortFunc={numberSortField}
            width={'100'}
          >Delivery Attempts</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Bounces"
            dataSort
            sortFunc={numberSortField}
            width={'100'}
          >Bounces</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Complaints"
            dataSort
            sortFunc={numberSortField}
            width={'100'}
          >Complaints</TableHeaderColumn>

          <TableHeaderColumn
            dataField="Rejects"
            dataSort
            sortFunc={numberSortField}
            width={'100'}
          >Rejects</TableHeaderColumn>

        </BootstrapTable>
      </div>
    );
  }
}
