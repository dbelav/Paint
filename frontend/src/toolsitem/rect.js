let url

export function rectDown(canvasDomElement) {
    url = canvasDomElement.current.toDataURL()
}

export function rectMove(objectArgs) {
    const { drawElement, e, startX, startY, canvasDomElement, color, x, y } =
        objectArgs

    let width
    let height

    if(e === null){
        width = x - startX
        height = y - startY
    } else{
        width = e.nativeEvent.offsetX - startX
        height = e.nativeEvent.offsetY - startY
    }


    const img = new Image()
    img.src = url

    img.onload = function () {
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
        drawElement.rect(startX, startY, width, height)
        drawElement.fillStyle = color
        drawElement.fill()
    }
}
