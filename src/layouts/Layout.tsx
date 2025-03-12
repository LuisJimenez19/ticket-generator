import { PropsWithChildren } from "react";
import patternBottom from "@/assets/images/pattern-squiggly-line-bottom.svg";

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative w-full h-screen overflow-y-auto overflow-x-hidden">
      <div className="w-11/12 mx-auto py-10 overflow-x-hidden relative z-10 flex flex-col gap-8">
        <div className="absolute inset-0 pattern-lines -z-[2] " />
        {children}
      </div>

      <img
        src={patternBottom}
        alt="pattern bottom"
        className="absolute bottom-0 left-3  "
      />
    </div>
  );
}

export default Layout;
