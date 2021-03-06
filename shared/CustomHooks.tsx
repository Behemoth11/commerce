import {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  useLayoutEffect,
  SetStateAction,
  Dispatch,
} from "react";
import axios from "axios";
import { useMyWindow, useUser } from "../Contexts/GlobalContext";
import { useRouter } from "next/router";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const useFirstTimeLoading = () => {
  const load = useRef(true);
  useEffect(() => {
    load.current = false;
  }, []);

  return load.current;
};

export const useScreenSize: () => "big" | "small" = () => {
  const [screenSize, setScreeSize] = useState(undefined);

  useEffect(() => {
    const resize = () => {
      setScreeSize(window.innerWidth);
    };
    resize();
    window.addEventListener("resize", resize, false);
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (screenSize >= 570) return "big";
  if (screenSize < 570) return "small";
};

export const useIntersectionObserver: (
  rootMargin?: string, 
  defaultVisibility?: number,
) => [
  visibilityIndex: number,
  observer: IntersectionObserver,
  observerRef: any
] = (rootMargin, defaultVisibility) => {
  const [visibilityIndex, setVisibilityIndex] = useState<number>(defaultVisibility||0);
  const [observer, setObserver] = useState<IntersectionObserver>();
  const observerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setObserver(
      new IntersectionObserver(
        (entry) => {
          // console.log("The intersection observer fired");
          entry.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibilityIndex((prevIndex) => prevIndex + 1);
            }
          });
        },
        {
          root: observerRef.current || document.getElementById("__next"),
          rootMargin: rootMargin || "500px",
        }
      )
    );
  }, []);

  return [visibilityIndex, observer, observerRef];
};

type token = {
  value: string;
  expiresAt: string;
};

export const useAuthAxios = () => {
  const [token, _setToken] = useState<token | undefined>({
    value: "loading",
    expiresAt: "loading",
  });
  const tokenRef = useRef<token | undefined>();

  const setToken: (payload: token) => void = (payload) => {
    _setToken(payload);
    tokenRef.current = payload;
  };

  const authAxios = axios.create({
    withCredentials: true,
  });

  authAxios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `${token?.value}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const code = error && error.response ? error.response.status : 0;
      if (code === 401 || code === 403) {
        //console.log("error code", code);
      }
      return Promise.reject(error);
    }
  );

  const getNewToken = async () => {
    let axiosResponse = await authAxios
      .get("/api/auth/token")
      .catch((err) => err.response);

    if (axiosResponse.status == 200) {
      const { token, expiresAt } = axiosResponse.data;
      setToken({ value: token, expiresAt });
    } else {
      setToken(undefined);
    }
  };

  useEffect(() => {
    const tokenChecker = setInterval(() => {
      // console.log("Verifying if the token is espired")
      if (!tokenRef.current) return;
      const timeLeft =
        parseInt(tokenRef.current.expiresAt) * 1000 -
        new Date().getTime() -
        1000 * 60 * 7;
      if (timeLeft <= 0) {
        //console.log("I will refresh because it is time")
        getNewToken();
      }
    }, 1000 * 60 * 5);

    return () => clearInterval(tokenChecker);
  }, []);

  useEffect(() => {
    getNewToken();
  }, []);

  return { axios: authAxios, token, setToken, getNewToken };
};

export const useRequire = (userState) => {
  let should_be_redirected = false;
  const myWindow = useMyWindow();

  const router = useRouter();
  const User = useUser();

  if (User?.data?.username === "loading") return;

  switch (userState) {
    case "login":
      if (!User.data?.username) {
        should_be_redirected = true;
      }
      break;
    case "seller":
      if (
        !User.data ||
        (User.data.role !== "seller" && User.data.role !== "admin")
      ) {
        should_be_redirected = true;
      }
      break;
  }

  if (should_be_redirected) {
    myWindow.setPhase("fadeOut");
    setTimeout(() => {
      router.push("/");
    }, 200);
  }
};

export const useSelectiveState = (init) => {
  const [state, _setState] = useState(init);
  const state_id = useRef(0);

  const setState: Dispatch<(prevState: undefined) => undefined> = (arg) => {
    state_id.current++;
    _setState(arg);
  };

  return [state, state_id, setState]
};
