import type { AppProps } from "next/app";
import "../../styles/globals.css";
import { GalleryProvider } from "../lib/gallery";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GalleryProvider>
      <Component {...pageProps} />
    </GalleryProvider>
  );
}

export default MyApp;
