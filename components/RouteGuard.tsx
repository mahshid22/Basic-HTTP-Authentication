import { useEffect } from "react";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactElement;
};

export const RouteGuard = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => false;
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url: string) {
    const publicPaths = ["/"];
    const path = url.split("?")[0];
    if (!localStorage.getItem("user") && !publicPaths.includes(path)) {
      router.push({
        pathname: "/",
        query: { returnUrl: router.asPath },
      });
    }
  }

  return children;
};
