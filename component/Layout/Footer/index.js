
// @ts-ignore
import styles from './style.module.css';

import { memo } from "react";

const index = () => {
    return (
        <div className={`${styles.loop} flex max-width purple center-children`} style={{marginTop: "50px"}}>
            <div className="big-container ">
                This is supposed to be the footer
            </div>
       </div>
    )
}

export default memo(index)
