import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { CreateContentModal } from '../components/CreateContentModal'
import { useState } from 'react'
import { Sidebar } from '../components/Sidebar'

export function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false);

  return <div>

    <Sidebar/>
    <div className='p-4 ml-72 min-h-screen bg-[#eeeeef]'>
    <CreateContentModal open={modalOpen} onClose={()=> {
      setModalOpen(false);
    }}/>
    <div className='flex justify-end gap-4'>
        <Button startIcon={<ShareIcon/>} size={"sm"} variant={"secondary"} text={"Share Brain"}  />

        <Button onClick={()=> {setModalOpen(true)}} startIcon={<PlusIcon/>} size={"sm"} variant={"primary"} text={"Add Content"} />
    </div>

    <div className='flex gap-4'>
      <Card type="twitter" link="https://x.com/TDataScience/status/1905840340352856310" title="First Tweet"/>

      <Card type="youtube" link="https://www.youtube.com/watch?v=oBKyC94hTeA" title="First YouTube"/>
    </div>
    </div>
  </div>
}


