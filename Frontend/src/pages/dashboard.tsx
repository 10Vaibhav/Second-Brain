import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { CreateContentModal } from '../components/CreateContentModal'
import { useEffect, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false);

  const {contents, refresh} = useContent();

  useEffect(()=> {
    refresh();
  },[modalOpen]);

  return <div>

    <Sidebar/>
    <div className='p-4 ml-72 min-h-screen bg-[#eeeeef]'>
    <CreateContentModal open={modalOpen} onClose={()=> {
      setModalOpen(false);
    }}/>
    <div className='flex justify-between m-2 items-center'>
      <div>
        <h1 className='text-purple-950 font-semibold text-2xl'>All Contents</h1>
      </div>
    <div className='flex justify-end gap-4'>

        <Button onClick={async ()=> {
          const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
            share: true
          }, {
            headers: {
              "authorization": localStorage.getItem("token")
            }
          });

          const shareUrl = `http://localhost:5173/share/${response.data.hash}`

          alert("Share link copied !!");
          navigator.clipboard.writeText(shareUrl);
        }} startIcon={<ShareIcon/>} size={"sm"} variant={"secondary"} text={"Share Brain"}  />

        <Button onClick={()=> {setModalOpen(true)}} startIcon={<PlusIcon/>} size={"sm"} variant={"primary"} text={"Add Content"} />
    </div>
    </div>

    <div className='flex gap-4 flex-wrap'>
      {
        contents.map(({type, link, title})=> <Card type={type} link={link} title={title}/> )
      }
    </div>
    </div>
  </div>
}


