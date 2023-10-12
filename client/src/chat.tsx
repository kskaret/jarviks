import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './state/store'

const Chat: React.FC = () => {
  const chatMessages = useSelector((state: RootState) => state.chat.chatMessages)
  const isLoading = useSelector((state: RootState) => state.chat.isLoading)
  
  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])
  
  return (
    <div className="chat" id="chatContainer" ref={chatContainerRef}>
      {chatMessages.map((message, index) => {
        const isBulletPoint = message.content.startsWith('- ')
        const formattedContent = message.content.split('\n').join('<br />')
        
        return (
          <div className={`message ${message.role}`} key={index}>
            <div className="role">{message.role}</div>
            <div 
              className="content" 
              dangerouslySetInnerHTML={{ __html: formattedContent }} 
              data-bullet={isBulletPoint ? "true" : "false"}
            ></div>
          </div>
        )
      })}
        {isLoading && (
        <div className="message assistant loading">
            <div className="content"><span>.</span><span>.</span><span>.</span></div>
        </div>
      )}
    </div>
  )
}

export default Chat
