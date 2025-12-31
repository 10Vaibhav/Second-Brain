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

  const filteredContents = activeFilter 
    ? contents.filter((content: ContentItem) => 
        content.type.toLowerCase() === activeFilter.toLowerCase())
    : contents;

  const getValidType = (type: string): "twitter" | "youtube"| "instagram" => {
    return type.toLowerCase() === "youtube" ? "youtube" :
    type.toLowerCase() === "instagram" ? "instagram" :"twitter";
  }
  
  return <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #F8FAFC 0%, #ffffff 100%)'}}>
    <Sidebar 
      activeFilter={activeFilter} 
      onFilterChange={setActiveFilter}
    />

    <div className='p-4 md:p-6 md:ml-72 min-h-screen'>
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }}/>

      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-0 mb-6'>
        <div className='mt-12 md:mt-0'>
          <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl mb-2' style={{color: '#132440'}}>
            {activeFilter ? `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Contents` : 'All Contents'}
          </h1>
          <p className='text-lg' style={{color: '#16476A'}}>
            {filteredContents.length} {filteredContents.length === 1 ? 'item' : 'items'} in your brain
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 w-full lg:w-auto'>
          <Button 
            onClick={async () => {
              try {
                const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                  share: true
                }, {
                  headers: {
                    "authorization": localStorage.getItem("token")
                  }
                });

                const shareUrl = `https://brainly.vaibhavm.tech/share/${response.data.hash}`
                await navigator.clipboard.writeText(shareUrl);
                
                const notification = document.createElement('div');
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in';
                notification.textContent = 'Share link copied to clipboard!';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                  document.body.removeChild(notification);
                }, 3000);
              } catch (error) {
                console.error('Error sharing brain:', error);
              }
            }} 
            startIcon={<ShareIcon/>} 
            size={"md"} 
            variant={"secondary"} 
            text={"Share Brain"} 
            fullWidth={window.innerWidth < 640}
          />

          <Button 
            onClick={() => {setModalOpen(true)}} 
            startIcon={<PlusIcon/>} 
            size={"md"} 
            variant={"primary"} 
            text={"Add Content"} 
            fullWidth={window.innerWidth < 640}
          />
        </div>
      </div>

      {activeFilter && (
        <div className='mb-6'>
          <Button 
            onClick={() => setActiveFilter(null)} 
            size={"sm"} 
            variant={"secondary"} 
            text={"Clear Filter"} 
          />
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {filteredContents.length === 0 ? (
          <div className='col-span-full flex flex-col items-center justify-center py-16 text-center'>
            <div className='w-24 h-24 rounded-full flex items-center justify-center mb-6' 
                 style={{backgroundColor: 'rgba(59, 151, 151, 0.1)'}}>
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#3B9797'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className='text-xl font-semibold mb-2' style={{color: '#132440'}}>
              {activeFilter ? `No ${activeFilter} content found` : 'No content found'}
            </h3>
            <p className='text-lg mb-6' style={{color: '#16476A'}}>
              {activeFilter ? `Add some ${activeFilter} content to get started` : 'Add your first piece of content to get started'}
            </p>
            <Button 
              onClick={() => setModalOpen(true)} 
              startIcon={<PlusIcon/>} 
              size={"md"} 
              variant={"primary"} 
              text={"Add Content"} 
            />
          </div>
        ) : (
          filteredContents.map((content, index) => (
            <div key={content._id || index} className="animate-fade-in">
              <Card 
                type={getValidType(content.type)} 
                link={content.link || ""}
                title={content.title || ""}
                contentId={content._id}
                onDelete={() => refresh()}
              />
            </div>
          ))
        )}
      </div>
    </div>
  </div>
}
