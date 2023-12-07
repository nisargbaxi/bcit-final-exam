import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <section className=" bg-gray-100 text-gray-600  px-4">
      <div className="flex flex-col justify-center">
        <App />
      </div>
    </section>
  </React.StrictMode>
);
