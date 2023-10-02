import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"

const Board = () =>{

    const canvasRef = useRef(null)

    const {color, size} = useSelector((state) => { return {color : state.toolboxReducer.activeColor, size: state.toolboxReducer.brushSize}}) // get the values of color and size from toolboxReducer

    console.log("colo",color, size)

    useEffect(() =>{
        let canvas = canvasRef.current;             
        let context = canvas.getContext('2d');      // to get the context of canvas

        //when mounting update width and height of the canvas ref.
        canvas.width =  window.innerWidth
        canvas.height =  window.innerHeight


    },[])

    return (
        <canvas ref={canvasRef }></canvas>
    )
}

export default Board