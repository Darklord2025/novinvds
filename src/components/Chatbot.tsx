
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';

type Message = {
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
};

type UserInfo = {
  name: string | null;
  email: string | null;
  phone: string | null;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'به NovinVDS خوش آمدید! چگونه می‌توانم به شما کمک کنم؟', sender: 'bot', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: null,
    email: null,
    phone: null
  });
  const [collectingInfo, setCollectingInfo] = useState(false);
  const [currentInfoField, setCurrentInfoField] = useState<keyof UserInfo | null>(null);
  const [waitTime, setWaitTime] = useState(0);
  const [needsHumanSupport, setNeedsHumanSupport] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Set a timer for human support
  useEffect(() => {
    if (isOpen && messages.length > 3 && !needsHumanSupport) {
      timerRef.current = setTimeout(() => {
        setNeedsHumanSupport(true);
        addBotMessage('به نظر می‌رسد به کمک بیشتری نیاز دارید. آیا مایلید با یکی از کارشناسان ما صحبت کنید؟');
      }, 180000); // 3 minutes
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, messages.length, needsHumanSupport]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Reset timer when closing chat
    if (isOpen && timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  
  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, { text, sender: 'bot', timestamp: new Date() }]);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage = { text: newMessage, sender: 'user' as const, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // If we're collecting user info
    if (collectingInfo && currentInfoField) {
      setUserInfo(prev => ({ ...prev, [currentInfoField]: newMessage }));
      setCurrentInfoField(null);
      
      // Check if we need to collect more info
      if (currentInfoField === 'name' && !userInfo.email) {
        setIsTyping(true);
        setTimeout(() => {
          addBotMessage('ممنون! لطفاً ایمیل خود را وارد کنید:');
          setCurrentInfoField('email');
          setIsTyping(false);
        }, 1000);
        return;
      } else if (currentInfoField === 'email' && !userInfo.phone) {
        setIsTyping(true);
        setTimeout(() => {
          addBotMessage('و شماره تماس شما؟');
          setCurrentInfoField('phone');
          setIsTyping(false);
        }, 1000);
        return;
      } else if (currentInfoField === 'phone') {
        setCollectingInfo(false);
        setIsTyping(true);
        setTimeout(() => {
          addBotMessage(`ممنون ${userInfo.name}! اطلاعات شما ثبت شد. چطور می‌توانم به شما کمک کنم؟`);
          setIsTyping(false);
        }, 1000);
        return;
      }
    }
    
    // If message contains keywords about human support
    if (
      newMessage.includes('پشتیبان') || 
      newMessage.includes('انسان') || 
      newMessage.includes('کارشناس') ||
      newMessage.includes('صحبت با') ||
      newMessage.includes('اپراتور')
    ) {
      setNeedsHumanSupport(true);
      setWaitTime(Math.floor(Math.random() * 3) + 1);
      setIsTyping(true);
      setTimeout(() => {
        addBotMessage(`درخواست شما برای صحبت با کارشناسان ثبت شد. لطفاً چند لحظه صبر کنید. زمان تقریبی انتظار: ${waitTime} دقیقه`);
        setIsTyping(false);
        
        // If we don't have user info, collect it
        if (!userInfo.name && !collectingInfo) {
          setTimeout(() => {
            addBotMessage('برای ارتباط با کارشناسان، به اطلاعات تماس شما نیاز داریم. لطفاً نام خود را وارد کنید:');
            setCollectingInfo(true);
            setCurrentInfoField('name');
          }, 1000);
        }
      }, 1500);
      return;
    }
    
    // Simulate bot response after a short delay
    setIsTyping(true);
    setTimeout(() => {
      const botResponses = [
        'چطور می‌توانم به شما کمک کنم؟',
        'برای اطلاعات بیشتر در مورد سرویس‌های ما، لطفاً به صفحات مربوطه مراجعه کنید یا مستقیماً سوال خود را بپرسید.',
        'پلن‌های متنوعی برای سرور مجازی و هاستینگ داریم که می‌توانید از منوی بالا آن‌ها را مشاهده کنید.',
        'آیا سؤال دیگری دارید؟',
        'برای خرید می‌توانید از طریق سبد خرید اقدام کنید یا با پشتیبانی تماس بگیرید.',
        'سرورهای ما در بهترین دیتاسنترهای ایران و اروپا میزبانی می‌شوند.',
        'پشتیبانی 24/7 ما آماده پاسخگویی به سوالات شماست.',
        'برای اطلاع از قیمت‌ها و تعرفه‌ها می‌توانید به صفحه مربوط به هر سرویس مراجعه کنید.',
      ];
      
      // Check if the message contains keywords to trigger specific responses
      if (newMessage.includes('قیمت') || newMessage.includes('تعرفه') || newMessage.includes('هزینه')) {
        addBotMessage('برای مشاهده قیمت‌ها و تعرفه‌های ما، می‌توانید به صفحات مربوط به هر سرویس مراجعه کنید. آیا به دنبال قیمت سرویس خاصی هستید؟');
      } else if (newMessage.includes('سرور مجازی') || newMessage.includes('vps')) {
        addBotMessage('سرورهای مجازی ما با منابع اختصاصی و قدرتمند، مناسب برای انواع کسب و کارها هستند. برای اطلاعات بیشتر می‌توانید به صفحه سرورهای مجازی مراجعه کنید.');
      } else if (newMessage.includes('سرور اختصاصی') || newMessage.includes('dedicated')) {
        addBotMessage('سرورهای اختصاصی ما با سخت‌افزار قدرتمند و پهنای باند نامحدود، بهترین گزینه برای کسب و کارهای بزرگ هستند. جزئیات بیشتر در صفحه سرورهای اختصاصی موجود است.');
      } else if (newMessage.includes('دامنه') || newMessage.includes('دامین') || newMessage.includes('domain')) {
        addBotMessage('ما انواع پسوندهای دامنه را با قیمت‌های مناسب ارائه می‌دهیم. برای ثبت یا انتقال دامنه می‌توانید به صفحه دامنه مراجعه کنید.');
      } else if (newMessage.includes('هاست') || newMessage.includes('میزبانی') || newMessage.includes('hosting')) {
        addBotMessage('هاستینگ ما با پنل‌های کاربری متنوع و منابع قابل توسعه، مناسب برای انواع وب‌سایت‌ها است. برای مشاهده پلن‌ها به صفحه هاستینگ مراجعه کنید.');
      } else {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        addBotMessage(randomResponse);
      }
      
      setIsTyping(false);
    }, 1500);
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
                  <div className="flex items-center mb-1">
                    {message.sender === 'user' ? (
                      <User size={14} className="ml-1" />
                    ) : (
                      <Bot size={14} className="ml-1" />
                    )}
                    <span className="text-xs text-gray-500">
                      {message.sender === 'user' ? 'شما' : 'پشتیبان'}
                    </span>
                    <span className="text-xs text-gray-400 mr-auto">
                      {new Intl.DateTimeFormat('fa-IR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(message.timestamp)}
                    </span>
                  </div>
                  {message.text}
                </div>
              ))}
              
              {isTyping && (
                <div className="max-w-[80%] px-4 py-2 rounded-lg bg-gray-100 text-gray-800 self-start">
                  <div className="flex items-center">
                    <Loader2 size={14} className="ml-2 animate-spin" />
                    <span className="text-sm">در حال تایپ...</span>
                  </div>
                </div>
              )}
              
              {needsHumanSupport && (
                <div className="bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-200 text-xs text-center">
                  درخواست گفتگو با کارشناس ثبت شد
                  <div className="mt-1 font-semibold">
                    زمان تقریبی انتظار: {waitTime} دقیقه
                  </div>
                </div>
              )}
              
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
              disabled={isTyping}
            />
            <button
              type="submit"
              className={`mr-2 p-2 rounded-lg transition-colors ${
                isTyping || newMessage.trim() === '' 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={isTyping || newMessage.trim() === ''}
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
