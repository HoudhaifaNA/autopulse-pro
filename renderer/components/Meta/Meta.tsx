import Head from "next/head";

interface MetaProps {
  title?: string;
}

const Meta = ({ title = "AutoPulsePro" }: MetaProps) => {
  return (
    <Head>
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <title>{title}</title>
    </Head>
  );
};

export default Meta;
