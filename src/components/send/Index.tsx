import { Header } from "@/components/Header";
import { Form } from "@/components/send/Form";
import Layout from "@/layouts/Layout";
const currentYear = new Date().getFullYear();

function Index() {
  return (
    <Layout>
      <Header>
        <h1 className="text-2xl font-bold text-balance md:text-pretty md:text-6xl max-w-4xl mx-auto">
          Your Journey to Coding Conf {currentYear} Starts Here!
        </h1>
        <h3 className="text-neutral-5 text-lg text-balance leading-6 md:text-2xl">
          Secure you spot at next year's biggest coding conference.
        </h3>
      </Header>
      <Form />
    </Layout>
  );
}

export default Index;
