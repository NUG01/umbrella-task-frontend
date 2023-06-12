import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <Provider store={store}> */}
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
    {/* </Provider> */}
  </BrowserRouter>
);
