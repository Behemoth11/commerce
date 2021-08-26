import { useEffect,useState, useRef } from 'react';

export const useFirstTimeLoading = () => {
    const load = useRef(true);
    useEffect(() => {
      load.current = false;
    }, []);
  
    return load.current;
};
  
  
export const useScreenSize: () => ("big"|"small") = () => {
  const [screenSize, setScreeSize] = useState(undefined);

  useEffect(() => {
    const resize = () => {
      setScreeSize(window.innerWidth)
    }
    resize();
    window.addEventListener("resize", resize, false)
    return () => window.removeEventListener("resize", resize)
  }, [])

  if (screenSize >= 570) return "big";
  if (screenSize < 570) return "small"
}