import { bundle } from 'react-kinetic-core';

/**
 * Determines the appropriate parameter separator (? | &) depending if the query separator (?)
 * has already been used or not.
 *
 * @param {string} url - the URL to test
 */
const paramSeparator = url => url.indexOf('?') > -1 ? '&' : '?';

/**
 * Returns the URL to a bridged resource.
 *
 * Note: custom sorting is currently not available in this function because the BridgedResource
 * API doesn't support it.
 *
 * @param {*} props - properties to build the bridged resource url
 * @param {string} props.bridgedResourceName - name of the bridged resource
 * @param {string} props.formSlug - form slug where the bridged resource is defined
 * @param {string} props.kappSlug - kapp slug where the bridged resource is defined
 * @param {string[]=} props.attributes - array of attributes (fields) to return
 * @param {number=} props.limit - maximum number of records to retrieve
 * @param {number=} props.offset - offset to retrieve as first record
 * @param {object=} props.values - hash of value names to values
 * @returns {string}
 */
export const bridgedResourceUrl = props => {
  if (!props.kappSlug) { throw new Error('Property "kappSlug" is required.'); }
  if (!props.formSlug) { throw new Error('Property "formSlug" is required.'); }
  if (!props.bridgedResourceName) { throw new Error('Property "bridgedResourceName" is required.'); }
  // build the url
  let url = `${bundle.spaceLocation()}/${props.kappSlug}/${props.formSlug}/bridgedResources/${encodeURIComponent(props.bridgedResourceName)}`;
  // append any attributes if they were specified
  if (props.attributes) {
    if (!Array.isArray(props.attributes)) {
      throw new Error('Property "attributes" expected as array of strings.');
    }
    if (props.attributes.length > 0) {
      url += `${paramSeparator(url)}attributes=${Array.join(props.attributes.map(encodeURIComponent), ',')}`;
    }
  }
  // append any parameter values if they were specified
  if (props.values && Object.keys(props.values).length > 0) {
    const parameters = Object.keys(props.values).map(key => (
      `values[${encodeURIComponent(key)}]=${encodeURIComponent(props.values[key])}`
    ));
    // Add the appropriate parameter separator and value parameters
    url += `${paramSeparator(url)}${Array.join(parameters, '&')}`;
  }
  // append the limit if it was specified
  if (props.limit) {
    let limit = props.limit;
    if (!Number.isInteger(limit)) {
      try {
        limit = parseInt(limit, 10);
      } catch (e) {
        throw new Error('Property "limit" expected as a number.');
      }
    }
    // Add the appropriate parameter separator and limit
    url += `${paramSeparator(url)}limit=${limit}`;
  }
  // append the offset if it was specified
  if (props.offset) {
    let offset = props.offset;
    if (!Number.isInteger(offset)) {
      try {
        offset = parseInt(offset, 10);
      } catch (e) {
        throw new Error('Property "offset" expected as a number.');
      }
    }
    // Add the appropriate parameter separator and offset
    url += `${paramSeparator(url)}offset=${offset}`;
  }
  return url;
};

/**
 * Combines the field names array with the records array to produce an array of objects
 * linking the field name to the field value for each record.
 *
 * @param {String[]} keys - Array of field names to use as object keys
 * @param {Array[]} values - Array of records, which are themselves an array of string values
 * @returns {Object[]} Array of objects linking the field name to the field value of each record.
 */
export const arraysToObject = (keys, values) => values.map(value =>
  keys.reduce((object, key, keyIndex) => {
    const o = object;
    o[key] = value[keyIndex];
    return o;
  }, {}),
);

/**
 * Converts the results from a Bridged Resource response that contains multiple records.
 *
 * A bridged resource that is configured to return multiple results separates the field names
 * from the record data.  This is done to reduce the amount of bandwidth the response uses, but
 * it is not the ideal format to work with.
 *
 * This function combines the field names array with the records array to produce an array of
 * objects linking the field name to the field value for each record.
 *
 * @param {Object} responseJsonRecords - Kinetic Core bridge response parsed from JSON
 * @returns {Object[]} Array of objects linking the field name to the field value of each record.
 */
export const convertMultipleBridgeRecords = responseJsonRecords =>
  arraysToObject(responseJsonRecords.fields, responseJsonRecords.records);
