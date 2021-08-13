


import {useState} from 'react'
import NavTop from './NavTop'
import NavSide from './NavSide'
// @ts-ignore
import styles from './style.module.css';

const index = () => {
    return (
        <div className={`${styles.navigation} max-width`}>
            <NavTop/>
        </div>
    )
}

export default index
