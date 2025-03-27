import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'

function App() {

  return <div className='flex justify-center items-center space-x-4'>
    <Button size={"sm"} variant={"primary"} text={"Share"}  />

    <Button startIcon={<PlusIcon size={"md"}/>} size={"sm"} variant={"secondary"} text={"Add Content"} />
  </div>
}

export default App
