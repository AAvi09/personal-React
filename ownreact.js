// const element = <h1 title="foo">Hello</h1>;
const element = React.createElement("h1", { title: "foo" }, "Hello");
const container = document.getElementById("root");
const root = ReactDOM.createRoot(element, container);
