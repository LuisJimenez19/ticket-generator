import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProviderSendContext } from "./context/SendContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ProviderSendContext>
    <App />
  </ProviderSendContext>
);
