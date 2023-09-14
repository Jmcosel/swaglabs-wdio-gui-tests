/**
 * Converts an itemName into an elementId (removing spaces, symbols, etc.)
 * @param itemName The item's name
 * @returns elementId
 */
export function nameToId(itemName: string) {
  return itemName.replace(/\s/g, '-').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\./g, '\\.').toLowerCase();
}

/**
 * Checks that the order in which items are sorted on a page matches the expected order
 * when the appropriate sorting algorithm is applied.
 * @param array An array of WebdriverIO elements
 * @param sortFunction The function to use to sort the array of elements
 */
export async function compareSortedArrays(
  array: WebdriverIO.Element[],
  sortFunction: (val1: number, val2: number) => number
) {
  const actualArray = await Promise.all(
    array.map(async (element) => {
      const text = await element.getText();
      return parseFloat(text.replace('$', ''));
    })
  );
  const expectedArray = [...actualArray];
  // Using the sort function on this array should do nothing if already sorted properly
  expectedArray.sort(sortFunction);
  await expect(expectedArray).toEqual(actualArray);
}
