// 1. we need a function that can create
// a required html element (div, p, section, ul, ol, list, span)
// 2. we should be able to set props needed. For example, id, class
// it could be some event handlers, etc.
// 3. Set the children. Children can be plain string, or another element, or an array of elements.

/*
<div id="main-section">
    <h1> Title </h1>
    <p> Contents go here </p>
</div>

element that needs to be created "div"
props:  {id:"main-section", "class"="main-section-c", onclick:""}
array of children - h1, p

*/

export function createElement(
  elementType: string,
  props: Record<string, any> | null,
  ...children: (Node | string)[]
): Node {
  let element = document.createElement(elementType);
  // set the props;
  if (props !== null) {
    Object.entries(props).forEach(([prop, value]) => {
      element.setAttribute(prop, value);
    });
  }
  // Append the children passed as children of element
  children.forEach((child) => {
    let childNode: Node;
    if (typeof child === 'string') {
      childNode = document.createTextNode(child);
    } else {
      childNode = child;
    }
    element.appendChild(childNode);
  });

  return element;
}

const h1 = createElement('h1', null, 'Title');
const p = createElement('p', null, 'Contents go here');
const div = createElement('div', { id: 'main-section' }, h1, p);
