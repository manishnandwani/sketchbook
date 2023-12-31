import { COLORS, MENU_ITEMS } from '@/constants'
import { changeActiveColor, changeBrushSize } from '@/slice/ToolboxSlice'
import { socket } from '@/socket'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'

const Toolbox = () =>{

    const toolboxReducer = useSelector((state) => state.toolboxReducer) // get the values of color and size from toolboxReducer
    const menuReducer = useSelector((state) => state.menuReducer) // get the values of which action is clicked from menuReducer
    const { activeColor: color, brushSize: size} = toolboxReducer;
    const { activeMenuItem } = menuReducer;

    const dispatch = useDispatch()

    const handleSelectColor = (value) =>{
        dispatch(changeActiveColor(value))
        socket.emit('changeTool',{color : value, size})
    }

    const handleChangeBrushSize = (e) =>{
        dispatch(changeBrushSize(e.target.value))
        socket.emit('changeTool',{color, size: e.target.value})
    }

    return (
        <div className={styles.toolboxContainer}>
            {
                activeMenuItem !== MENU_ITEMS.ERASER  &&
                <div className={styles.toolboxItem}>
                    <p className={styles.text}>Stroke color</p>
                    <div className={styles.itemContainer}>
                        <div className={styles.colorBox} onClick={() => handleSelectColor(COLORS.BLACK)} style={{backgroundColor : COLORS.BLACK}} />
                        <div className={styles.colorBox} onClick={() => handleSelectColor(COLORS.RED)} style={{backgroundColor : COLORS.RED}} />
                        <div className={styles.colorBox} onClick={() => handleSelectColor(COLORS.GREEN)} style={{backgroundColor : COLORS.GREEN}} />
                        <div className={styles.colorBox} onClick={() => handleSelectColor(COLORS.BLUE)} style={{backgroundColor : COLORS.BLUE}} />
                        <div className={styles.colorBox} onClick={() => handleSelectColor(COLORS.YELLOW)} style={{backgroundColor : COLORS.YELLOW}} />
                        <div className={styles.colorBox} onClick={() => handleSelectColor(COLORS.ORANGE)} style={{backgroundColor : COLORS.ORANGE}} />
                    </div>
                </div>
            }
            <div className={styles.toolboxItem}>
                <p className={styles.text}>Brush size</p>
                <div className={styles.itemContainer}>
                    <input type="range" min='1' max='10' step='1' value={size} onChange={handleChangeBrushSize} />
                </div>
            </div>
        </div>
    )
}

export default Toolbox