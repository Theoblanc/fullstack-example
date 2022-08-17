import { FC, ReactElement, ReactNode, useEffect } from "react";
import { AppProps } from "next/app";
import { NextPage } from "next";
import "../styles/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type ChildrenProps = {
  children?: React.ReactNode;
};

const Noop: FC<ChildrenProps> = ({ children }) => {
  return <>{children}</>;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const Layout = (Component as any).Layout || Noop;

  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);

  return (
    <>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
