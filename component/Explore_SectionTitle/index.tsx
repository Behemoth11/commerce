// @ts-ignore
import styles from "./style.module.css";
import Link from "next/link";

import React, { memo } from "react";
import { string_and_array_to_array } from "../../shared/UtilityFunctions";

interface Props {
  categories: string[] | string;
}

const Explore_SectionTitle: React.FC<Props> = ({ categories }) => {
  let Categories = string_and_array_to_array(categories).filter(category => category != "all");
  if (Categories.length == 0) Categories = ["all"];

  return (
    <div className={`${styles.sectionTitle} vertical-flex`}>
      {categories && (
        <>
          <h1 className={`${styles.header} flex-left`}>
            {Categories[0] && Categories[0].toUpperCase()}
          </h1>
          <h2 className={`${styles.subHeader}`}>
            <div className={`${styles.backLink}`}>
              <a> back </a>
            </div>
            <div className={`${styles.rubriqueLink}`}>
              <Link href={`/`}>
                <a>Home</a>
              </Link>
              /{Categories.slice(0, -1).map(
                (element,index) =>
                  element && (
                    <span key={element}>
                      <Link href={{pathname: "/find", query:{categories: categories.slice(0,index+1) }}}>
                        <a>{element.toLowerCase()}</a>
                      </Link>{" "}
                      /
                    </span>
                  )
              )}
              <Link href={`/`}>
                <a>{Categories[Categories.length - 1]}</a>
              </Link>
            </div>
          </h2>
        </>
      ) ||
      <>
        <h1 className={`${styles.header} flex-left`}>
         Loading...
      </h1>
      <h2 className={`${styles.subHeader}`}>
        <div className={`${styles.backLink}`}>
          <a> loading.. </a>
        </div>
      </h2>
    </>
      }
    </div>
  );
};

export default memo(Explore_SectionTitle);
