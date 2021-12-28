import { useRouter } from "next/router";
import { useRef, FC } from "react";
import { useMyWindow } from "../Contexts/GlobalContext";
import { createHref } from "../shared/UtilityFunctions";

interface Props {
  children: any;
  style?: {};
  href:
    | { pathname: string; query: { [query: string]: string[] | string } }
    | string;
  className?: string;
}

const MyLink: FC<Props> = ({ children, href, className, style }) => {
  const router = useRouter();
  const myWindow = useMyWindow();

  const handleClick = (e) => {
    e.preventDefault(0);
    window.location.hash = "";
    // myWindow.overlay.close(null,"force")
    myWindow.setPhase("fadeOut");

    setTimeout(() => {
      router.push(href);
    }, 200);
  };

  return (
    <a
      href={createHref(href)}
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
};

export default MyLink;
