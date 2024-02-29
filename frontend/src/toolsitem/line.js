let url

export function lineDown(objectArgs) {
    const { drawElement, lineThickness, color, canvasDomElement } = objectArgs

    drawElement.beginPath()
    drawElement.lineWidth = lineThickness
    drawElement.strokeStyle = color
    url = canvasDomElement.current.toDataURL()
}

export function lineMove(objectArgs) {
    const { drawElement, e, startX, startY, canvasDomElement, x, y } = objectArgs

    const img = new Image()
    img.src = url

    img.onload = () => {
        drawElement.clearRect(
            0,
            0,
            drawElement.canvas.width,
            drawElement.canvas.height
        )
        drawElement.drawImage(
            img,
            0,
            0,
            canvasDomElement.current.width,
            canvasDomElement.current.height
        )
        drawElement.beginPath()
        if(e === null){
            drawElement.moveTo(x, y)
        } else{
            drawElement.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
        drawElement.lineTo(startX, startY)
        drawElement.stroke()
    }
}
