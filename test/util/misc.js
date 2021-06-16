/**
 * Converts an itemName into an elementId (removing spaces, symbols, etc.)
 * @param {String} itemName
 * @returns {String} elementId
 */
function nameToId(itemName) {
  return itemName.replace(/\s/g, '-').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\./g, '\\.').toLowerCase();
}

/**
 * Checks that the order in which items are sorted on a page matches the expected order
 * when the appropriate sorting algorithm is applied.
 * @param {WebdriverIO.ElementArray} array
 * @param {(str1, str2) => number} sortFunction
 */
function compareSortedArrays(array, sortFunction) {
  let actual = array.map((element) => element.getText());
  // Convert values to numbers for prices
  if (actual[0].includes('$')) {
    // @ts-ignore
    actual = actual.map((text) => parseFloat(text.replace('$', '')));
  }
  let expected = [...actual];
  // Using the sort function on this array should do nothing if already sorted properly
  expected.sort(sortFunction);
  expect(expected).toEqual(actual);
}

export { nameToId, compareSortedArrays };
