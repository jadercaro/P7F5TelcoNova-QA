// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isLogin = router.pathname === "/login" || router.pathname === "/";

  if (isLogin) {
    return <Component {...pageProps} />
  }

  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
}
