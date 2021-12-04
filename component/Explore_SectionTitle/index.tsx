// @ts-ignore
import styles from "./style.module.scss";
import MyLink from "../MyLink";

import React, { memo } from "react";
import { string_and_array_to_array } from "../../shared/UtilityFunctions";

interface Props {
  categories: string[] | string;
}

const Explore_SectionTitle: React.FC<Props> = ({ categories }) => {
  let Categories = string_and_array_to_array(categories).filter(
    (category) => category != "all"
  );
  if (Categories.length == 0) Categories = ["all"];

  return (
    <div className={`${styles.sectionTitle} vertical-flex`}>
      {(categories && (
        <>
          <h1 className={`${styles.header} flex-left`}>
            {Categories[0] && Categories[0].toUpperCase()}
          </h1>
          <h2 className={`${styles.subHeader}`}>
            <div
              className={`${styles.backLink}`}
              onClick={() => window.history.go(-1)}
            >
              <a> retour </a>
            </div>
            <div className={`${styles.rubriqueLink}`}>
              <MyLink href={`/`}>Home</MyLink>&nbsp; / &nbsp;
              {Categories.slice(0, -1).map(
                (element, index) =>
                  element && (
                    <span key={element}>
                      <MyLink
                        href={{
                          pathname: "/find",
                          query: { categories: categories.slice(0, index + 1) },
                        }}
                      >
                        {element.toLowerCase()}
                      </MyLink>
                      &nbsp; /&nbsp;
                    </span>
                  )
              )}
              <MyLink href={`/`}>{Categories[Categories.length - 1]}</MyLink>
            </div>
          </h2>
        </>
      )) || (
        <>
          <h1 className={`${styles.header} flex-left`}>Loading...</h1>
          <h2 className={`${styles.subHeader}`}>
            <div className={`${styles.backLink}`}>
              <a> Chargement.. </a>
            </div>
          </h2>
        </>
      )}
    </div>
  );
};

export default memo(Explore_SectionTitle);
