import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { CreateContentModal } from '../components/CreateContentModal'
import { useEffect, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { useContent, ContentItem } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  // Filter contents based on the activeFilter
  const filteredContents = activeFilter 
    ? contents.filter((content: ContentItem) => 
        content.type.toLowerCase() === activeFilter.toLowerCase())
    : contents;

  // Helper function to ensure type is either "twitter" or "youtube"
  const getValidType = (type: string): "twitter" | "youtube"| "instagram" => {
    return type.toLowerCase() === "youtube" ? "youtube" :
    type.toLowerCase() === "instagram" ? "instagram" :"twitter";
  }
  return <div>
    <Sidebar 
      activeFilter={activeFilter} 
      onFilterChange={setActiveFilter}
    />

    <div className='p-3 md:p-4 md:ml-72 min-h-screen bg-[#eeeeef]'>
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }}/>

      <div className='flex flex-col md:flex-row md:justify-between m-1 md:m-2 items-start md:items-center gap-3 md:gap-0'>
        <div className='mt-12 md:mt-0'>
          <h1 className='text-purple-950 font-semibold text-xl md:text-2xl'>
            {activeFilter ? `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Contents` : 'All Contents'}
          </h1>
        </div>

        <div className='flex flex-col md:flex-row justify-start md:justify-end w-full md:w-auto gap-2 md:gap-4'>
          <Button 
            onClick={async () => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
              }, {
                headers: {
                  "authorization": localStorage.getItem("token")
                }
              });

              const shareUrl = `http://localhost:5173/share/${response.data.hash}`

              alert("Share link copied !!");
              navigator.clipboard.writeText(shareUrl);
            }} 
            startIcon={<ShareIcon/>} 
            size={"sm"} 
            variant={"secondary"} 
            text={"Share Brain"} 
            fullWidth={window.innerWidth < 768}
          />

          <Button 
            onClick={() => {setModalOpen(true)}} 
            startIcon={<PlusIcon/>} 
            size={"sm"} 
            variant={"primary"} 
            text={"Add Content"} 
            fullWidth={window.innerWidth < 768}
          />
        </div>
      </div>

      {activeFilter && (
        <div className='mb-2 md:mb-4 mt-2 md:mt-0'>
          <Button 
            onClick={() => setActiveFilter(null)} 
            size={"sm"} 
            variant={"secondary"} 
            text={"Clear Filter"} 
          />
        </div>
      )}

      <div className='flex gap-3 md:gap-4 flex-wrap justify-center md:justify-start'>
        {filteredContents.length === 0 ? (
          <div className='w-full text-center py-6 md:py-8 text-gray-500'>
            {activeFilter ? `No ${activeFilter} content found` : 'No content found'}
          </div>
        ) : (
          filteredContents.map((content, index) => (
            <div className="w-full md:w-auto" key={content._id || index}>
              <Card 
                type={getValidType(content.type)} 
                link={content.link || ""}
                title={content.title || ""}
                contentId={content._id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  </div>
}