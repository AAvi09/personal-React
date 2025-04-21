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
        typeof child === "object" ? child : createTextelement(child)
      ),
    },
  };
}
function createTextelement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodevalue: text,
      children: [],
    },
  };
}
const KitKat = {
  createElement,
};
const element = KitKat.createElement(
  "div",
  { id: "foo" },
  KitKat.createElement("a", null, "bar"),
  KitKat.createElement("b")
);
const container = document.getElementById("root");
ReactDOM.render(element, container);
