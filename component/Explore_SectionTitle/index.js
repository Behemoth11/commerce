// @ts-ignore
import styles from "./style.module.css";
import Link from "next/link"

import { memo } from "react";

const index = ({ categories }) => {
  return (
    <div className={`${styles.sectionTitle} vertical-flex`}>
      {categories && (
        <>
          <h1 className={`${styles.header} flex-left`}>
            {categories[0].toUpperCase()}
          </h1>
          <h2 className={`${styles.subHeader}`}>
            <div className={`${styles.backLink}`}>
              <a> back </a>
            </div>
            <div className={`${styles.rubriqueLink}`}>
              <Link href={`/`}><a >find</a></Link> /
              {categories.slice(0, -1).map((element) => (
                <span key={element} >
                <Link href="" >
                  <a>{element.toLowerCase()}</a>
                  </Link> /
                  </span>
              ))}
              <Link  href={`/`}>
              <a>{categories[categories.length - 1]}</a>
              </Link>
            </div>
          </h2>
        </>
      )}
    </div>
  );
};

export default memo(index);
