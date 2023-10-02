import { useEffect, useLayoutEffect, useRef } from "react"
import { useSelector } from "react-redux"

const Board = () =>{
    const canvasRef = useRef(null)
    let shouldDraw = false

    const {color, size} = useSelector((state) => { return {color : state.toolboxReducer.activeColor, size: state.toolboxReducer.brushSize}}) // get the values of color and size from toolboxReducer

    console.log("colo",color, size)

    useEffect(() =>{
        if(!canvasRef.current) return

        let canvas = canvasRef.current;             
        let context = canvas.getContext('2d');      // to get the context of canvas

        const updateColorSize = (color,size) =>{              // update the color and size in context so that when we draw it will remember 
            context.strokeStyle = color;
            context.lineWidth = size;
        }

        updateColorSize(color,size)

    },[color, size])

    
    // Before component paint
    useLayoutEffect(() =>{                          // this will run even before useEffect paint
        if(!canvasRef.current) return
        let canvas = canvasRef.current;             
        let context = canvas.getContext('2d');      // to get the context of canvas

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