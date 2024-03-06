const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)

        switch (msg.method) {
            case 'connection':
                console.log(msg)
                connectionHandler(ws, msg)
                break
            case 'moveDraw':
                broadcastConnection(ws, msg)
                break
            case 'downDraw':
                broadcastConnection(ws, msg)
                break
        }
    })
})

app.listen(PORT, () => console.log('start serv' + PORT))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach((client) => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}
