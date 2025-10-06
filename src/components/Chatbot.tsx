
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2, Info, Phone, Mail, Clock, AlertCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type Message = {
  text: string;
  sender: 'bot' | 'user' | 'system' | 'agent';
  timestamp: Date;
};

type UserInfo = {
  name: string | null;
  email: string | null;
  phone: string | null;
};

const FAQ_ITEMS = [
  {
    question: "چگونه می‌توانم سرور مجازی خود را ریستارت کنم؟",
    answer: "برای ریستارت سرور مجازی، وارد پنل کاربری شوید، به بخش «سرویس‌های من» بروید، سرور مورد نظر را انتخاب کنید و از گزینه‌های مدیریتی، «ریستارت» را انتخاب کنید."
  },
  {
    question: "آیا امکان ارتقای منابع سرور بعد از خرید وجود دارد؟",
    answer: "بله، شما می‌توانید در هر زمان منابع سرور خود را ارتقا دهید. کافیست از طریق پنل کاربری درخواست ارتقا را ثبت کنید یا با پشتیبانی تماس بگیرید."
  },
  {
    question: "روش‌های پرداخت شما چیست؟",
    answer: "ما روش‌های متنوعی برای پرداخت داریم: درگاه بانکی (زرین‌پال و زیبال)، پرداخت با ارزهای دیجیتال (بیت‌کوین، اتریوم، تتر)، و همچنین پرداخت از کیف پول اختصاصی شما در سایت."
  },
  {
    question: "مدت زمان فعال‌سازی سرور چقدر است؟",
    answer: "سرورهای مجازی معمولاً در کمتر از 10 دقیقه، و سرورهای اختصاصی بین 24 تا 48 ساعت کاری فعال می‌شوند. سرورهای ابری تقریباً به صورت آنی فعال می‌شوند."
  },
  {
    question: "ریست پسورد سرور چگونه انجام می‌شود؟",
    answer: "برای ریست پسورد، به پنل کاربری مراجعه کنید و از بخش مدیریت سرور، گزینه «ریست پسورد» را انتخاب کنید. پسورد جدید به ایمیل شما ارسال خواهد شد."
  }
];

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
  const [activeTab, setActiveTab] = useState<'chat' | 'faq'>('chat');
  const [supportType, setSupportType] = useState<'ai' | 'human'>('ai');
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chatTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Set a timer for human support
  useEffect(() => {
    if (isOpen && messages.length > 3 && !needsHumanSupport && supportType === 'ai') {
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
  }, [isOpen, messages.length, needsHumanSupport, supportType]);
  
  // Chat timer
  useEffect(() => {
    if (isOpen && supportType === 'ai') {
      chatTimerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (chatTimerRef.current) {
        clearInterval(chatTimerRef.current);
      }
    };
  }, [isOpen, supportType]);
  
  // Format elapsed time
  const formatElapsedTime = () => {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Reset timer when closing chat
    if (isOpen) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (chatTimerRef.current) clearInterval(chatTimerRef.current);
      setElapsedTime(0);
    }
  };
  
  const addSystemMessage = (text: string) => {
    setMessages(prev => [...prev, { text, sender: 'system', timestamp: new Date() }]);
  };
  
  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, { text, sender: 'bot', timestamp: new Date() }]);
  };
  
  const addAgentMessage = (text: string) => {
    setMessages(prev => [...prev, { text, sender: 'agent', timestamp: new Date() }]);
  };
  
  const switchToHumanSupport = () => {
    setSupportType('human');
    setNeedsHumanSupport(true);
    setWaitTime(Math.floor(Math.random() * 3) + 1);
    addSystemMessage('درخواست گفتگو با کارشناس ثبت شد. لطفاً چند لحظه منتظر باشید.');
    
    // If we don't have user info, collect it
    if (!userInfo.name && !collectingInfo) {
      setTimeout(() => {
        addAgentMessage('سلام، من محمد از تیم پشتیبانی نوین وی دی اس هستم. چطور می‌توانم به شما کمک کنم؟');
        addAgentMessage('برای پشتیبانی بهتر، لطفاً نام خود را وارد کنید:');
        setCollectingInfo(true);
        setCurrentInfoField('name');
      }, 3000);
    } else {
      setTimeout(() => {
        addAgentMessage(`سلام${userInfo.name ? ' ' + userInfo.name : ''}، من محمد از تیم پشتیبانی نوین وی دی اس هستم. چطور می‌توانم به شما کمک کنم؟`);
      }, 3000);
    }
  };
  
  const switchToAISupport = () => {
    setSupportType('ai');
    setNeedsHumanSupport(false);
    setElapsedTime(0);
    addSystemMessage('شما به پشتیبان هوشمند متصل شدید.');
    addBotMessage('سلام! من دستیار هوشمند نوین وی دی اس هستم. چطور می‌توانم به شما کمک کنم؟');
  };
  
  const handleFAQItemClick = (question: string, answer: string) => {
    setActiveTab('chat');
    
    // Add the question as if the user asked it
    setMessages(prev => [...prev, { text: question, sender: 'user', timestamp: new Date() }]);
    
    // Then respond with the answer
    setTimeout(() => {
      if (supportType === 'ai') {
        addBotMessage(answer);
      } else {
        addAgentMessage(answer);
      }
    }, 500);
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
          if (supportType === 'ai') {
            addBotMessage('ممنون! لطفاً ایمیل خود را وارد کنید:');
          } else {
            addAgentMessage('ممنون! لطفاً ایمیل خود را وارد کنید:');
          }
          setCurrentInfoField('email');
          setIsTyping(false);
        }, 1000);
        return;
      } else if (currentInfoField === 'email' && !userInfo.phone) {
        setIsTyping(true);
        setTimeout(() => {
          if (supportType === 'ai') {
            addBotMessage('و شماره تماس شما؟');
          } else {
            addAgentMessage('و شماره تماس شما؟');
          }
          setCurrentInfoField('phone');
          setIsTyping(false);
        }, 1000);
        return;
      } else if (currentInfoField === 'phone') {
        setCollectingInfo(false);
        setIsTyping(true);
        setTimeout(() => {
          if (supportType === 'ai') {
            addBotMessage(`ممنون ${userInfo.name}! اطلاعات شما ثبت شد. چطور می‌توانم به شما کمک کنم؟`);
          } else {
            addAgentMessage(`ممنون ${userInfo.name}! اطلاعات شما ثبت شد. حالا بفرمایید چطور می‌توانم کمکتان کنم؟`);
          }
          setIsTyping(false);
        }, 1000);
        return;
      }
    }
    
    // If message contains keywords about human support and we're in AI mode
    if (
      supportType === 'ai' &&
      (
        newMessage.includes('پشتیبان') || 
        newMessage.includes('انسان') || 
        newMessage.includes('کارشناس') ||
        newMessage.includes('صحبت با') ||
        newMessage.includes('اپراتور')
      )
    ) {
      switchToHumanSupport();
      return;
    }
    
    // Simulate response based on support type
    setIsTyping(true);
    
    if (supportType === 'ai') {
      // AI response
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
    } else {
      // Human agent response
      setTimeout(() => {
        const agentResponses = [
          'متوجه شدم. آیا اطلاعات بیشتری در این مورد دارید؟',
          'ممنون از توضیحات شما. اجازه بدهید بررسی کنم.',
          'می‌توانید جزئیات بیشتری ارائه دهید؟',
          'بله، ما این سرویس را ارائه می‌دهیم. آیا نیاز به راهنمایی بیشتری دارید؟',
          'سوال خوبی پرسیدید. اجازه بدهید اطلاعات کامل‌تری به شما بدهم.',
          'من این مشکل را برای تیم فنی ارسال می‌کنم تا بررسی کنند.',
          'می‌توانید از طریق پنل کاربری این موضوع را پیگیری کنید یا اگر مایل باشید من کمکتان می‌کنم.',
        ];
        
        const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
        addAgentMessage(randomResponse);
        setIsTyping(false);
      }, 2000);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50">
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isOpen ? <X size={20} className="md:w-6 md:h-6" color="white" /> : <MessageCircle size={20} className="md:w-6 md:h-6" color="white" />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-14 md:bottom-16 left-0 w-[calc(100vw-2rem)] max-w-sm md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 animate-scale-up origin-bottom-left">
          {/* Chat header */}
          <div className="bg-blue-600 text-white py-3 px-4 rounded-t-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium flex items-center">
                {supportType === 'ai' ? (
                  <>
                    <Bot size={18} className="ml-2" />
                    پشتیبان هوشمند
                  </>
                ) : (
                  <>
                    <User size={18} className="ml-2" />
                    کارشناس پشتیبانی
                  </>
                )}
                
                {supportType === 'ai' && (
                  <Badge className="mr-2 bg-blue-700/40 text-white text-xs">
                    <Clock size={12} className="ml-1" />
                    {formatElapsedTime()}
                  </Badge>
                )}
              </h3>
              <button onClick={toggleChat} className="text-white">
                <X size={18} />
              </button>
            </div>
            
            <Tabs defaultValue="chat" value={activeTab} onValueChange={(value) => setActiveTab(value as 'chat' | 'faq')}>
              <TabsList className="bg-blue-700/40 text-white">
                <TabsTrigger value="chat" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  گفتگو
                </TabsTrigger>
                <TabsTrigger value="faq" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  سوالات متداول
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <TabsContent value="chat" className="m-0">
            {/* Chat type selector */}
            <div className="border-b border-gray-200 p-2 flex text-sm">
              <button 
                className={`flex items-center px-3 py-1 rounded-md cursor-pointer transition-colors ${supportType === 'ai' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={() => supportType !== 'ai' && switchToAISupport()}
              >
                <Bot size={16} className="ml-1" />
                پشتیبان هوشمند
              </button>
              <button 
                className={`flex items-center px-3 py-1 rounded-md cursor-pointer transition-colors mr-2 ${supportType === 'human' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                onClick={() => supportType !== 'human' && switchToHumanSupport()}
              >
                <User size={16} className="ml-1" />
                کارشناس پشتیبانی
              </button>
            </div>
          
            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-4" style={{ direction: 'ltr' }}>
              <div className="flex flex-col space-y-3" style={{ direction: 'rtl' }}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`max-w-[85%] px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-100 text-blue-900 self-end'
                        : message.sender === 'system'
                        ? 'bg-yellow-100 text-yellow-800 self-center text-xs py-1 px-3 rounded-full'
                        : message.sender === 'agent'
                        ? 'bg-green-100 text-green-800 self-start'
                        : 'bg-gray-100 text-gray-800 self-start'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.sender === 'user' ? (
                        <Avatar className="h-5 w-5 ml-1 bg-blue-200">
                          <AvatarFallback className="text-xs">کا</AvatarFallback>
                        </Avatar>
                      ) : message.sender === 'agent' ? (
                        <Avatar className="h-5 w-5 ml-1 bg-green-200">
                          <AvatarFallback className="text-xs">پش</AvatarFallback>
                        </Avatar>
                      ) : message.sender === 'system' ? null : (
                        <Avatar className="h-5 w-5 ml-1 bg-gray-200">
                          <AvatarFallback className="text-xs">هو</AvatarFallback>
                        </Avatar>
                      )}
                      
                      {message.sender !== 'system' && (
                        <span className="text-xs text-gray-500">
                          {message.sender === 'user' ? 'شما' : 
                           message.sender === 'agent' ? 'کارشناس' : 'هوشمند'}
                        </span>
                      )}
                      
                      {message.sender !== 'system' && (
                        <span className="text-xs text-gray-400 mr-auto">
                          {new Intl.DateTimeFormat('fa-IR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          }).format(message.timestamp)}
                        </span>
                      )}
                    </div>
                    
                    <div className={`${message.sender === 'system' ? '' : 'whitespace-pre-wrap'}`}>
                      {message.text}
                    </div>
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
                
                {needsHumanSupport && supportType === 'human' && (
                  <div className="bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-200 text-xs text-center">
                    <AlertCircle className="h-4 w-4 mx-auto mb-1" />
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
          </TabsContent>
          
          <TabsContent value="faq" className="m-0 h-[400px] overflow-y-auto p-4">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700 mb-2">سوالات متداول</h3>
              
              {FAQ_ITEMS.map((item, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleFAQItemClick(item.question, item.answer)}
                >
                  <h4 className="font-medium text-blue-600">{item.question}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.answer}</p>
                </div>
              ))}
              
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium text-gray-700 mb-2">راه‌های ارتباطی</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 ml-2" />
                    <span className="text-sm">09335732119</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 ml-2" />
                    <span className="text-sm">info@novinvds.ir</span>
                  </div>
                  <div className="flex items-center">
                    <Info className="h-4 w-4 text-gray-500 ml-2" />
                    <span className="text-sm">پشتیبانی 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
