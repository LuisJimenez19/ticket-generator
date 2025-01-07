import { Header } from "@/components/Header";
import { Form } from "@/components/Form";
import patternBottom from "@/assets/images/pattern-squiggly-line-bottom.svg";

function App() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="w-11/12 mx-auto py-10 overflow-x-hidden relative z-10 flex flex-col gap-8">
        <div className="absolute inset-0 pattern-lines -z-[2] " />
        <Header />
        <Form />
      </div>

      <img
        src={patternBottom}
        alt="pattern bottom"
        className="absolute -bottom-20 left-3  "
      />
    </div>
  );
}

export default App;
