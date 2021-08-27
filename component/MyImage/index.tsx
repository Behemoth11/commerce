// @ts-ignore
import styles from "./style.module.css";
import { memo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getRandomInteger } from "../../shared/UtilityFunctions";

const MyImage: React.FC<{ imageLink: string; ASPECT_RATIO: number, onLoad?: () => void   }> = memo(
  ({ imageLink, ASPECT_RATIO, onLoad }) => {

    return (
      <>
        <Image
          loader={({width}) =>
            `https://source.unsplash.com/random/${getRandomInteger(
              200,
              250
            )}x${getRandomInteger(300, 350)}`
          }
          src={"/images/image1.jpg"}
          alt="There will soon be an alt"
          width={100}
          height={ASPECT_RATIO}
          layout="responsive"
          lazyBoundary="0px 500px 0px 0px"
          onLoad={onLoad}
        />
      </>
    );
  }
);

export default MyImage;
