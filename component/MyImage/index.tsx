
// @ts-ignore
import styles from './style.module.css';
import { memo } from 'react';
import Image from 'next/image';
import { getRandomInteger } from "../../shared/UtilityFunctions";

const MyImage: React.FC<{ imageLink: string, ASPECT_RATIO: number }> = memo(({ imageLink, ASPECT_RATIO }) => {
  return (
    <div>
      <Image
        loader={() =>
          `https://source.unsplash.com/random/${getRandomInteger(
            490,
            510
          )}x${getRandomInteger(630, 670)}`
        }
        src={undefined || "/images/image1.jpg"}
        alt="There will soon be an alt"
        width={100}
        height={ASPECT_RATIO}
        layout="responsive"
      />
    </div>
  );
});

export default MyImage;
