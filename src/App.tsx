import Send from "./components/send/Index";
import Success from "./components/success/Index";
import { useSendContext } from "./context/SendContext";

function App() {
  const { globalState } = useSendContext();

  console.log(globalState);

  return globalState.success ? <Success /> : <Send />;
}

export default App;
