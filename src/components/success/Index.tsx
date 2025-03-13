import Layout from "@/layouts/Layout";

import { Header } from "../Header";
import { useSendContext } from "@/context/SendContext";

import { CardTicket } from "./CardTicket";

function Index() {
  const { userInfo } = useSendContext().globalState;

  const info = userInfo.avatarUrl
    ? userInfo
    : {
        avatarUrl: "data:image/webp;base64,UklGRoQjAABXRUJQVlA4WAoAAA",
        email: "admin@tl300.com",
        fullName: "Luis Angel",
        gitHubUserName: "luisjimenez19",
        tickect: "37409",
      };

  return (
    <Layout>
      <div className="flex flex-col gap-32">
        <Header>
          <h1 className="text-2xl font-bold text-balance md:text-pretty md:text-6xl max-w-3xl mx-auto">
            Congrats,{" "}
            <strong className="text-transparent bg-clip-text bg-gradient-to-r bg-orange-7  to-white">
              {info.fullName}!
            </strong>{" "}
            Your ticket is ready.
          </h1>
          <h3 className="text-neutral-5 text-lg text-balance leading-6 md:text-2xl max-w-xl mx-auto mt-5">
            We've emailed your ticket to{" "}
            <strong className="text-transparent bg-clip-text bg-gradient-to-r bg-orange-7  to-white">
              {info.email}
            </strong>{" "}
            and will send updates in the run up to the event.
          </h3>
        </Header>
        <section>
          <CardTicket userInfo={info} />
        </section>
      </div>
    </Layout>
  );
}

export default Index;
