import logoFull from "@/assets/images/logo-full.svg";
import patternTopSvg from "@/assets/images/pattern-squiggly-line-top.svg";
import { PropsWithChildren } from "react";
function Header({ children }: PropsWithChildren) {
  return (
    <header className="relative flex flex-col gap-8">
      <img
        src={patternTopSvg}
        className="absolute -right-3 -top-3 w-28 md:w-auto "
        alt="pattern-top"
      />

      <figure className="flex justify-center">
        <img src={logoFull} alt="logo" width={150} />
      </figure>
      <div className="flex flex-col text-center gap-3">{children}</div>
    </header>
  );
}

export { Header };
