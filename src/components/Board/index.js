import { MENU_ITEMS } from "@/constants"
import { changeActiveActionItem } from "@/slice/MenuSlice"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import io from 'Socket.IO-client'

const Board = () =>{
    const canvasRef = useRef(null)
    
    let shouldDraw = false;
    const historyPointer = useRef(0);
    const drawHistory = useRef([]);

    const dispatch = useDispatch()
    const toolboxReducer = useSelector((state) => state.toolboxReducer) // get the values of color and size from toolboxReducer
    const menuReducer = useSelector((state) => state.menuReducer) // get the values of which action is clicked from menuReducer

    const { activeColor: color, brushSize: size} = toolboxReducer;
    const { activeActionItem } = menuReducer;

    let socket = io()

    // initialize the socket
    const socketInitializer = async () => {
        await fetch('/api/socket')              // call socket api to create connection
    
        socket.on('connect', () => {            // client connection
          console.log('client connected')
        })
    }

    useEffect(() => {socketInitializer()}, [])

    useEffect(() =>{
        if(!canvasRef.current) return

        let canvas = canvasRef.current;             
        let context = canvas.getContext('2d');                // to get the context of canvas

        const updateColorSize = (color,size) =>{              // update the color and size in context so that when we draw it will remember 
            context.strokeStyle = color;
            context.lineWidth = size;
        }

        updateColorSize(color,size)

        const handleChangeTools = (data)=>{
            updateColorSize(data.color,data.size)
        }

        socket.on('changeTool',handleChangeTools)

        return () =>{
            socket.off('changeTool',handleChangeTools)
        }

    },[color, size])

    useEffect(()=>{
        if(!canvasRef.current) return

        let canvas = canvasRef.current;
        let context = canvas.getContext('2d');

        if(activeActionItem === MENU_ITEMS.DOWNLOAD){
            let anchorElement = document.createElement('a');
            anchorElement.href = canvas.toDataURL()
            anchorElement.download = 'sketch.jpg'
            anchorElement.click()
        }else if(activeActionItem !== null){
            if(activeActionItem === MENU_ITEMS.UNDO && historyPointer.current > 0) 
                historyPointer.current -= 1;
            if(activeActionItem === MENU_ITEMS.REDO && historyPointer.current < drawHistory.current.length - 1)
                historyPointer.current += 1;
            let imageData = drawHistory.current[historyPointer.current]
            context.putImageData(imageData, 0, 0);
        }
        dispatch(changeActiveActionItem(null))
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
            context.beginPath()                             // It will start the Path
            context.moveTo(x, y)                            // It will move to x,y
        }

        const drawLine = (x, y) =>{
            context.lineTo(x, y)                            // Follow the line to x,y
            context.stroke()                                // It will build the stroke of line
        }

        // Event listener methods
        const handleMouseDown = (e) =>{
            shouldDraw = true
            beginPath(e.clientX, e.clientY)                             // begin path with x and y coordinates
            socket.emit('beginPath',{x : e.clientX, y : e.clientY})     // step 1 emit beginPath with x,y
        }

        const handleMouseMove = (e) =>{
            if(!shouldDraw) return
            drawLine(e.clientX, e.clientY)
            socket.emit('drawLine',{x : e.clientX, y : e.clientY})
        }

        const handleMouseUp = (e) =>{
            shouldDraw = false
            let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
            drawHistory.current.push(imageData)
            historyPointer.current = drawHistory.current.length - 1 
        }

        // Add event listener =>  // Event listeners will always listen to the refs/ ids
        canvas.addEventListener('mousedown',handleMouseDown)
        canvas.addEventListener('mousemove',handleMouseMove)
        canvas.addEventListener('mouseup',handleMouseUp)

        // web sockets handler methods
        const handleBeginPath = (path) =>{
            beginPath(path.x, path.y)
        }
        
        const handleDrawLine = (path) =>{
            drawLine(path.x, path.y)
        }

        // Web Socket on methods when broadcast emits from serve we will get here
        socket.on('beginPath',handleBeginPath)                  // step 4 get beginPath with x,y and draw again
        socket.on('drawLine',handleDrawLine)

        // remove event listener
        return () =>{
            canvas.removeEventListener('mousedown',handleMouseDown)
            canvas.removeEventListener('mousemove',handleMouseMove)
            canvas.removeEventListener('mouseup',handleMouseUp)

            socket.off('beginPath',handleBeginPath)             // step 5 off the socket when the component is destroyed
            socket.off('drawLine',handleDrawLine)
        }
    },[])

    return (
        <canvas ref={canvasRef}></canvas>
    )
}

export default Board