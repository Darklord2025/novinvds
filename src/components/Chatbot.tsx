
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'به NovinVDS خوش آمدید! چگونه می‌توانم به شما کمک کنم؟', sender: 'bot' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        'چطور می‌توانم به شما کمک کنم؟',
        'برای اطلاعات بیشتر در مورد سرویس‌های ما، لطفاً با پشتیبانی تماس بگیرید.',
        'پلن‌های متنوعی برای سرور مجازی و هاستینگ داریم که می‌توانید از منوی بالا آن‌ها را مشاهده کنید.',
        'آیا سؤال دیگری دارید؟',
        'لطفاً برای خرید به صفحه سرویس مورد نظر خود مراجعه کنید.',
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isOpen ? <X size={24} color="white" /> : <MessageCircle size={24} color="white" />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 animate-scale-up origin-bottom-left">
          {/* Chat header */}
          <div className="bg-blue-600 text-white py-3 px-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">پشتیبانی آنلاین</h3>
            <button onClick={toggleChat} className="text-white">
              <X size={18} />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="h-80 overflow-y-auto p-4" style={{ direction: 'ltr' }}>
            <div className="flex flex-col space-y-3" style={{ direction: 'rtl' }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-100 text-blue-900 self-end'
                      : 'bg-gray-100 text-gray-800 self-start'
                  }`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="mr-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
