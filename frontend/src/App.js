import Tools from './components/tools/Tools'
import Canvas from './components/canvas/Canvas'
import { Route, Routes, Navigate } from 'react-router-dom'
import ModalWindow from './components/modalWindow/ModalWindow'

import './App.scss'

const App = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to={`f${(+new Date).toString(16)}`}/>} />
            <Route path="/:id" element={<AppComponents />} />
        </Routes>
    )
}

const AppComponents = () => {
    return (
        <div className="app">
            <Tools />
            <Canvas />
            <ModalWindow />
        </div>
    )
}

export default App
