import {
  renderToPipeableStream,
  RenderToPipeableStreamOptions,
} from "react-dom/server";
// A REACT ROUTER THAT CAN BE RUN IN NODEJS ENVIRONMENT
import { StaticRouter } from "react-router-dom/server";

import App from "./App";

export default function render(
  url: string,
  opts: RenderToPipeableStreamOptions
) {
  //
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    opts
  );

  return stream;
}
