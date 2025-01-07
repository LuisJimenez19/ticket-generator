import logoFull from "@/assets/images/logo-full.svg";
import patternTopSvg from "@/assets/images/pattern-squiggly-line-top.svg";
function Header() {
  return (
    <header className="relative flex flex-col gap-8">
      <img
        src={patternTopSvg}
        className="absolute -right-3 -top-3 w-28 md:w-auto"
        alt="pattern-top"
      />

      <figure className="flex justify-center">
        <img src={logoFull} alt="logo" width={150} />
      </figure>
      <div className="flex flex-col text-center gap-3">
        <h1 className="text-2xl font-bold text-balance md:text-pretty md:text-6xl max-w-4xl mx-auto">
          Your Journey to Coding Conf 2025 Starts Here!
        </h1>
        <h3 className="text-neutral-5 text-lg text-balance leading-6 md:text-2xl">
          Secure you spot at next year's biggest coding conference.
        </h3>
      </div>
    </header>
  );
}

export { Header };
