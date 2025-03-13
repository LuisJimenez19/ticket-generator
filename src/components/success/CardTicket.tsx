import logoMark from "@/assets/images/logo-mark.svg";
import avatarDefault from "@/assets/images/image-avatar.jpg";
import iconGitHub from "@/assets/images/icon-github.svg";

import { useState } from "react";
import { UserInfo } from "@/types";

function CardTicket({ userInfo }: { userInfo: UserInfo }) {
  const targetDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const formattedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(targetDate);

  const [urlAvatar, setUrlAvatar] = useState(userInfo.avatarUrl ?? "");

  return (
    <div className="card-ticket  mx-auto  w-[350px]  h-[164px] sm:h-[280px] sm:w-full max-w-[600px]   z-50 relative bg-no-repeat bg-contain  p-5 sm:p-8  ">
      <main className="flex flex-col h-full  justify-between ">
        {/* top */}
        <div className="flex items-start gap-4  w-10/12">
          <img src={logoMark} className="" />
          <div className="flex flex-col justify-between h-12 sm:h-auto sm:gap-6  ">
            <p className="font-medium text-2xl sm:text-5xl font-inconsolata leading-7 sm:leading-7">
              Coding Conf
            </p>
            <span className="text-neutral-5 text-xs sm:text-base font-semibold">
              {formattedDate} / Austin, TX
            </span>
          </div>
        </div>
        {/* Bottom - user info */}
        <div className="flex gap-3">
          <img
            className=" h-full aspect-square rounded-xl w-[50px] sm:w-full max-w-[80px] object-cover"
            onError={() => setUrlAvatar(avatarDefault)}
            src={urlAvatar}
            alt={`avatar's ${userInfo.fullName}`}
          />

          <div className="flex flex-col justify-evenly ">
            <p className="text-lg md:text-2xl font-medium text-white font-inconsolata">
              {userInfo.fullName}
            </p>
            <div className="flex items-center gap-1  text-sm sm:text-base text-neutral-5">
              <img src={iconGitHub} alt="icon git hub" className="" />
              <span>
                <a target="__blank" className="hover:text-orange-5 transition" href={`https://github.com/${userInfo.gitHubUserName}`}>@{userInfo.gitHubUserName}</a>
              </span>
            </div>
          </div>
        </div>
      </main>
      {/* rigth */}
      <div className=" absolute right-0 h-full w-2/12 top-0 flex items-center justify-center ">
        <p className="rotate-90 text-neutral-5 sm:text-xl font-medium">
          {" "}
          #{userInfo.tickect}
        </p>
      </div>
    </div>
  );
}

export { CardTicket };
