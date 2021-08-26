// @ts-ignore
import styles from "./style.module.css";
import Link from "next/link";
import { memo } from "react";
import { useNavBarState } from "../NavBarContext";
import { navBarSections } from "../navBarSections";

const { Menu } = navBarSections;

const index = () => {
  const { toggleNavBar } = useNavBarState();

  return (
    <nav className={`${styles.navTop} container flex`}>
      <div className="big-container flex flex-center center-children">
        <div
          className={`${styles.burgerDivContainer} flex-left`}
          onClick={() => toggleNavBar()}
        >
          <div className={`${styles.burgerDiv}`}>
            <div className={styles.middle}></div>
          </div>
        </div>

        <div className={`${styles.brandIcon}`}>
          <Link href="/">
            <a>MOMENT</a>
          </Link>
        </div>

        <div className={styles.rightSection}>
          {Menu.content.map((element) => (
            <Links
              key={element}
              title={element}
              elementData={(Menu[element] && Menu[element]) || []}
            />
          ))}
          <Icon />
        </div>
      </div>
    </nav>
  );
};

export default memo(index);

const Links = ({ title, elementData }) => {
  // console.log(elementData);

  return (
    <div className={`${styles.navLink}`}>
      <Link
        href={{
          pathname: "/find",
          query: { categories: [title] },
        }}
      >
        <a>{title}</a>
      </Link>
      <div className={`${styles.content}`}>
        {elementData.content &&
          elementData.content.map((subHeaderelement,index) => (
            <ul key={subHeaderelement} className={styles.headerGroup}>
              
              <h2 className={styles.subHeader}>{subHeaderelement}</h2>
              
              {elementData[subHeaderelement] &&
                elementData[subHeaderelement].content.map((element) => (
                  <li key={title+subHeaderelement+element}>
                    <Link
                      href={{
                        pathname: "/find",
                        query: {
                          categories: [title, subHeaderelement, element],
                        },
                      }}
                    >
                      <a> {element}</a>
                    </Link>
                  </li>
                ))}
              

            </ul>
          ))}
      </div>
    </div>
  );
};

const Icon = () => {
  return (
    <div className="flex" style={{ position: "relative" }}>
      <div className={`${styles.bagIcon} flex center-children hidden-overflow`}>
        <img src="/bagIcon.svg"></img>
        <div className={`${styles.ItemsInCart} flex center-children`}>
          <p>10</p>
        </div>
      </div>
    </div>
  );
};
