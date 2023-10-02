import { MENU_ITEMS } from "@/constants"
import { changeActiveActionItem } from "@/slice/MenuSlice"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

const Board = () =>{
    const canvasRef = useRef(null)
    let shouldDraw = false

    const dispatch = useDispatch()
    const toolboxReducer = useSelector((state) => state.toolboxReducer) // get the values of color and size from toolboxReducer
    const menuReducer = useSelector((state) => state.menuReducer) // get the values of which action is clicked from menuReducer

    const { activeColor: color, brushSize: size} = toolboxReducer;
    const { activeActionItem } = menuReducer;

    console.log("colo",color, size,activeActionItem)

    useEffect(() =>{
        if(!canvasRef.current) return

        let canvas = canvasRef.current;             
        let context = canvas.getContext('2d');                // to get the context of canvas

        const updateColorSize = (color,size) =>{              // update the color and size in context so that when we draw it will remember 
            context.strokeStyle = color;
            context.lineWidth = size;
        }

        updateColorSize(color,size)

    },[color, size])

    useEffect(()=>{
        if(activeActionItem === MENU_ITEMS.DOWNLOAD){
            let canvas = canvasRef.current;
            let anchorElement = document.createElement('a');
            anchorElement.href = canvas.toDataURL()
            anchorElement.download = 'sketch.jpg'
            anchorElement.click()
            dispatch(changeActiveActionItem(null))
        }
    },[activeActionItem])

    
    // Before component paint => this will run even before useEffect paint
    useLayoutEffect(() =>{
        if(!canvasRef.current) return
        let canvas = canvasRef.current;             
        let context = canvas.getContext('2d');             

        //when mounting update width and height of the canvas ref.
        canvas.width =  window.innerWidth
        canvas.height =  window.innerHeight

        // context begin and move methods
        const beginPath = (x, y) =>{
            context.beginPath()
            context.moveTo(x, y)
        }

        const drawLine = (x, y) =>{
            context.lineTo(x, y)
            context.stroke()  
        }

        // Event listener methods
        const handleMouseDown = (e) =>{
            shouldDraw = true
            beginPath(e.clientX, e.clientY)
        }

        const handleMouseMove = (e) =>{
            if(!shouldDraw) return
            drawLine(e.clientX, e.clientY)
        }

        const handleMouseUp = (e) =>{
            shouldDraw = false
        }

        // Add event listener =>  // Event listeners will always listen to the refs/ ids
        canvas.addEventListener('mousedown',handleMouseDown)
        canvas.addEventListener('mousemove',handleMouseMove)
        canvas.addEventListener('mouseup',handleMouseUp)

        // remove event listener
        return () =>{
            canvas.removeEventListener('mousedown',handleMouseDown)
            canvas.removeEventListener('mousemove',handleMouseMove)
            canvas.removeEventListener('mouseup',handleMouseUp)
        }
    },[])

    return (
        <canvas ref={canvasRef}></canvas>
    )
}

export default Board