import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {

  return <div className='flex justify-center items-center space-x-4'>
    <Button startIcon={<ShareIcon/>} size={"sm"} variant={"primary"} text={"Share"}  />

    <Button startIcon={<PlusIcon/>} size={"sm"} variant={"secondary"} text={"Add Content"} />
  </div>
}

export default App
