import { useRouter } from "next/router";
import { useRef, FC } from "react";
import { useMyWindow } from "../Contexts/GlobalContext";

interface Props {
  children: any;
  style?: {};
  href: string | {};
  className?: string;
}

const MyLink: FC<Props> = ({ children, href, className, style }) => {
  const router = useRouter();
  const myWindow = useMyWindow();

  const handleClick = (e) => {
    myWindow.overlay.close()
    myWindow.setPhase("fadeOut");

    setTimeout(() => {
      router.push(href);
    }, 200);
  };

  return (
    <a onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
};

export default MyLink;
