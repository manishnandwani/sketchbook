import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileDownload } from '@fortawesome/free-solid-svg-icons'
import styles  from './index.module.css'
import classNames from 'classnames'
import { COLORS, MENU_ITEMS } from '@/constants'
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveActionItem, changeActiveMenuItem } from '@/slice/MenuSlice'
import { changeActiveColor } from '@/slice/ToolboxSlice'

const Menu = () =>{
    const activeMenuItem = useSelector((state) => state.menuReducer.activeMenuItem)

    const dispatch = useDispatch()

    const handleSelectMenu = (item) =>{
        switch(item){
            case MENU_ITEMS.PENCIL:{
                dispatch(changeActiveMenuItem(item))
                dispatch(changeActiveColor(COLORS.BLACK))
                break;
            }

            case MENU_ITEMS.ERASER:{
                dispatch(changeActiveMenuItem(item))
                dispatch(changeActiveColor(COLORS.WHITE))
                break;
            }

            case MENU_ITEMS.UNDO:{
                dispatch(changeActiveActionItem(MENU_ITEMS.UNDO))
                break;
            }
                    
            case MENU_ITEMS.REDO:{
                dispatch(changeActiveActionItem(MENU_ITEMS.REDO))
                break;
            }

            case MENU_ITEMS.DOWNLOAD:{
                dispatch(changeActiveActionItem(MENU_ITEMS.DOWNLOAD))
                break;
            }
        }
    }

    return (
        <div className={styles.menuContainer}>
            <div className={classNames(styles.iconWrapper,activeMenuItem == MENU_ITEMS.PENCIL && styles.active)} onClick={() => handleSelectMenu(MENU_ITEMS.PENCIL)}>
                <FontAwesomeIcon icon={faPencil} className={styles.icon} />
            </div>
            <div className={classNames(styles.iconWrapper,activeMenuItem == MENU_ITEMS.ERASER && styles.active)} onClick={() => handleSelectMenu(MENU_ITEMS.ERASER)}> 
                <FontAwesomeIcon icon={faEraser} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={() => handleSelectMenu(MENU_ITEMS.UNDO)}> 
                <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={() => handleSelectMenu(MENU_ITEMS.REDO)}> 
                <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={() => handleSelectMenu(MENU_ITEMS.DOWNLOAD)}> 
                <FontAwesomeIcon icon={faFileDownload} className={styles.icon} />
            </div>
        </div>
    )
}

export default Menu