import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header";
import AuthWrapper from "../Components/AuthWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthWrapper>
        <Header />
        <Component {...pageProps} />
      </AuthWrapper>
    </SessionProvider>
  );
}

export default MyApp;
