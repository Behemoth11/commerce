import { useEffect, useState, useRef } from "react";

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
) => [
  visibilityIndex: number,
  observer: IntersectionObserver,
  observerRef: any
] = (rootMargin) => {
  const [visibilityIndex, setVisibilityIndex] = useState<number>(0);
  const [observer, setObserver] = useState<IntersectionObserver>();
  const observerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setObserver(
      new IntersectionObserver(
        (entry) => {
          entry.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibilityIndex((prevIndex) => prevIndex + 1);
              console.log("The observer has fired");
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

  useEffect(() => {
    console.log(visibilityIndex)
  }, [visibilityIndex])

  return [visibilityIndex, observer, observerRef];
};
