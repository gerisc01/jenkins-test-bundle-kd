/**
 * Generic column sort callback for use with the react-bootstrap-table library.
 *
 * @param {object} a first record to compare
 * @param {object} b second record to compare
 * @param {string} order 'asc' or 'desc'
 * @param {string} field name of field being sorted
 * @param {string|string[]} otherField name(s) of other secondary sort fields
 */
export const columnSortField = (a, b, order, field, otherField) => {
  let aCompare = a[field];
  let bCompare = b[field];
  if (otherField) {
    switch (otherField.constructor) {
      case String:
        aCompare += a[otherField];
        bCompare += b[otherField];
        break;
      case Array:
        otherField.map(fieldName => {
          aCompare += a[fieldName];
          bCompare += b[fieldName];
          return fieldName;
        });
        break;
      default:
        break;
    }
  }
  let val = 0;
  switch (order) {
    case 'desc':
      if (aCompare > bCompare) {
        val = -1;
      } else if (aCompare < bCompare) {
        val = 1;
      }
      break;
    default:
      if (aCompare < bCompare) {
        val = -1;
      } else if (aCompare > bCompare) {
        val = 1;
      }
      break;
  }
  return val;
};

/**
 * Number sort callback for use with the react-bootstrap-table library.
 *
 * @param {object} a value of first record to compare
 * @param {object} b value of second record to compare
 * @param {string} order 'asc' or 'desc'
 */
export const numberSort = (a, b, order) => {
  const aCompare = parseInt(a, 10);
  const bCompare = parseInt(b, 10);
  let val = 0;
  switch (order) {
    case 'desc':
      if (aCompare > bCompare) {
        val = -1;
      } else if (aCompare < bCompare) {
        val = 1;
      }
      break;
    default:
      if (aCompare < bCompare) {
        val = -1;
      } else if (aCompare > bCompare) {
        val = 1;
      }
      break;
  }
  return val;
};

/**
 * Number column sort callback for use with the react-bootstrap-table library.
 *
 * @param {object} a value of first record to compare
 * @param {object} b value of second record to compare
 * @param {string} order 'asc' or 'desc'
 * @param {string} field Name of the field to sort by
 */
export const numberSortField = (a, b, order, field) =>
  numberSort(a[field], b[field], order);
