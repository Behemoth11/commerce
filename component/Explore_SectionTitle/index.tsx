// @ts-ignore
import styles from "./style.module.css";
import Link from "next/link";

import React, { memo } from "react";
import { string_and_array_to_array } from "../../shared/UtilityFunctions";

interface Props {
  categories: string[] | string;
}

const Explore_SectionTitle: React.FC<Props> = ({ categories }) => {
  const Categories = string_and_array_to_array(categories);

  return (
    <div className={`${styles.sectionTitle} vertical-flex`}>
      {Categories && (
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
              </Link>{" "}
              /
              {Categories.slice(0, -1).map(
                (element) =>
                  element && (
                    <span key={element}>
                      <Link href={`/find?categories=${element}`}>
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
      )}
    </div>
  );
};

export default memo(Explore_SectionTitle);