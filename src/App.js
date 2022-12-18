console.log("Hello World");

const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Adopt Some Pets!")
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(React.createElement(App));
