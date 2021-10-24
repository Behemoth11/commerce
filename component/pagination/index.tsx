
// @ts-ignore
import styles from './style.module.css';
import {memo} from 'react'

const PageIndex = ({ activePage, setPage, totalPages }) => {
    const increase = () => {
        setPage(prevPage => {
            if (prevPage >= totalPages) return prevPage;
            return prevPage+1
        })
    }
    const reduce = () => {
        setPage(prevPage => {
            if (prevPage <= 1) return prevPage;
            return prevPage-1
        })
    }
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={reduce}>previous</button>
            <div className={`flex center-children`}>
                <p>{ activePage }</p>
            </div>
            <button className={styles.button} onClick={increase}>more</button>
       </div>
    )
}

export default PageIndex;
