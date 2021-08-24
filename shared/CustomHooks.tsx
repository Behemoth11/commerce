import { useEffect, useRef } from 'react';

export const useFirstTimeLoading = () => {
    const load = useRef(true);
    useEffect(() => {
      load.current = false;
    }, []);
  
    return load.current;
  };
  