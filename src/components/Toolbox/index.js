import { COLORS } from '@/constants'
import styles from './index.module.css'

const Toolbox = () =>{
    return (
        <div className={styles.toolboxContainer}>
            <div className={styles.toolboxItem}>
                <p className={styles.text}>Stroke color</p>
                <div className={styles.itemContainer}>
                    <div className={styles.colorBox} style={{backgroundColor : COLORS.BLACK}} />
                    <div className={styles.colorBox} style={{backgroundColor : COLORS.RED}} />
                    <div className={styles.colorBox} style={{backgroundColor : COLORS.GREEN}} />
                    <div className={styles.colorBox} style={{backgroundColor : COLORS.BLUE}} />
                    <div className={styles.colorBox} style={{backgroundColor : COLORS.YELLOW}} />
                    <div className={styles.colorBox} style={{backgroundColor : COLORS.ORANGE}} />
                </div>
            </div>
            <div className={styles.toolboxItem}>
                <p className={styles.text}>Brush size</p>
                <div className={styles.itemContainer}>
                    <input type="range" min='1' max='10' step='1'  />
                </div>
            </div>
        </div>
    )
}

export default Toolbox