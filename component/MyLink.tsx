import { useRouter } from "next/router";
import { useRef, FC } from "react";
import { useMyWindow } from "../Contexts/GlobalContext";

interface Props {
  children: any;
  href: string | {};
  className?: string;
}

const MyLink: FC<Props> = ({ children, href, className }) => {
  const router = useRouter();
  const myWindow = useMyWindow();

  const handleClick = (e) => {
    // console.log(router.asPath)
    // console.log(router.pathname)
    // e.stopPropagation();
    myWindow.setPhase("fadeOut");
    setTimeout(() => {
      router.push(href);
    }, 200);
  };
  return (
    <a onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default MyLink;
