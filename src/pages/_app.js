import "@/styles/globals.css";
import {TanstackProvider} from "@/libs/TanstackProvider";

export default function App({ Component, pageProps }) {

  return (

  <TanstackProvider>
  <Component {...pageProps} />;
  </TanstackProvider>
      )



}
