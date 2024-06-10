/**
 * List of HTML tags that we want to ignore when finding the top level readable elements
 * These elements should not be chosen while rendering the hover player
 */
const IGNORE_LIST = [
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "BUTTON",
  "LABEL",
  "SPAN",
  "IMG",
  "PRE",
  "SCRIPT",
];



/**
 *  **TBD:** Implement a function that returns all the top level readable elements on the page, keeping in mind the ignore list.
 *  A top level readable element is defined as follows:
 *    - The text node contained in the element should not be empty
 *    - The element should not be in the ignore list
 *    - The element should not be a child of another element that has only one child.
 *      For example: <div><blockquote>Some text here</blockquote></div>. div is the top level readable element and not blockquote
 */
export function getTopLevelReadableElementsOnPage(): HTMLElement[] {
  const isChildTextNodeNotEmpty = (node: Element) => {
    return node.innerHTML.trim() !== '';
  }

  const isElementNotIgnored = (elem: Element) => {
    return !IGNORE_LIST.includes(elem.nodeName);
  }

  const isElementRoot = (elem: Element) => {
    return elem.children.length < 2 && (!elem.parentElement || (elem.parentElement && elem.parentElement.children.length > 1));
  }
  
  let readableElements: HTMLElement[] = []
  document.querySelectorAll("body *").forEach((elem: Element) => {
    if (isChildTextNodeNotEmpty(elem) && isElementNotIgnored(elem) && isElementRoot(elem)) {
      let parent = elem.parentNode;
      readableElements.push(elem as HTMLElement);
      while (parent) {
        readableElements = readableElements.filter((val) => !val.isEqualNode(parent));
        parent = parent.parentNode;
      }
    }
  })
  return readableElements;
}
