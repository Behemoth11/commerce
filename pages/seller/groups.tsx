import { Any } from "@react-spring/types";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CartProduct from "../../component/CartProduct";
import GroupCard from "../../component/GroupCard";
import { useAuthcontext, useUser } from "../../Contexts/GlobalContext";
import { getGroups } from "../../shared/shared_functions";
import styles from "../../styles/groups.module.scss";

const groups = ({}) => {
  const [groups, setGroups] = useState<
    undefined | null | [{ post_name: string; message: string; grouping: any[] }]
  >(undefined);
  const auth = useAuthcontext();
  const User = useUser();

  const [showing, show] = useState<number>(2);

  useEffect(() => {
    // if (groups != null && User.data && User.data.username != "loading") {
    getGroups(auth, setGroups, ["post_name", "message", "grouping"]);
    // }
  }, [User.data]);

  const active = groups && groups[showing];

  return (
    <div
      className={`big-container ${styles.container}`}
      style={{ padding: "0 var(--padding)", flexWrap: "wrap" }}
    >
      <div>
        {groups?.map((group, index) => (
          <GroupCard
            title={group.post_name}
            message={group.message}
            onClick={() => show(index)}
            pictures={group.grouping.map((item) => item.pr_image_url[0])}
          />
        ))}
      </div>

      <div>
        {active && (
          <>
            <h2>{active.post_name}</h2>

            <div className={styles.i_c}>
              {active.grouping.map((item) => (
                <CartProduct
                  product={item}
                  visible={true}
                  onClick={() => console.log("I have been clicked")}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

groups.propTypes = {};

export default groups;
