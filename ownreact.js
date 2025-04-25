// const element = <h1 title="foo">Hello</h1>;
// const element = React.createElement("h1", { title: "foo" }, "Hello");
// const container = document.getElementById("root");
// const root = ReactDOM.createRoot(element, container);

// const node = document.createElement(element.type);
// node["title"] = element.props.title;

// const text = document.createTextNode("");
// text["nodeValue"] = element.props.children;

// node.appendChild(text);
// container.appendChild(node);

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => (dom[name] = element.props[name]));

  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}
const KitKat = {
  createElement,
  render,
};
const element = KitKat.createElement(
  "div",
  { id: "foo" },
  KitKat.createElement("a", null, "bar"),
  KitKat.createElement("b")
);
const container = document.getElementById("root");
KitKat.render(element, container);

const heading = KitKat.createElement(
  "h1",
  {
    style: "color: blue; font-family: Arial;",
    className: "main-heading",
  },
  "Welcome to My App"
);

KitKat.render(heading, document.getElementById("root"));

// /** @jsx KitKat.createElement */
// const border = (
//   <div style="border: 1px solid black; padding: 10px">
//     <h1>gotcha</h1>
//     <h2 style="text-align:right">from KitKat</h2>
//   </div>
// );
// KitKat.render(border, document.getElementById("root"));

let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    nextUnitOfWork;
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);
