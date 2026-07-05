import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

type Message = { role: 'user' | 'assistant'; content: string };

const STORAGE_KEY = 'nv-chatbot-messages';

const WELCOME: Message = {
  role: 'assistant',
  content: 'سلام! من دستیار هوشمند **نوین وی‌دی‌اس** هستم. درباره‌ی هاست، سرور مجازی، سرور اختصاصی، دامنه یا هر سؤال دیگر بپرسید.',
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Message[];
    } catch {}
    return [WELCOME];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const clearChat = () => {
    setMessages([WELCOME]);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    // Placeholder assistant message we stream into.
    setMessages([...next, { role: 'assistant', content: '' }]);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publishableKey}`,
        },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'خطا در ارتباط با سرویس هوشمند');
      }

      // Stream SSE from OpenAI-compatible chat.completions
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistant = '';
      let buffer = '';

      if (!reader) throw new Error('پاسخی دریافت نشد');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const raw of lines) {
          const line = raw.trim();
          if (!line || !line.startsWith('data:')) continue;
          const data = line.slice(5).trim();
          if (data === '[DONE]') continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content ?? '';
            if (delta) {
              assistant += delta;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: 'assistant', content: assistant };
                return copy;
              });
            }
          } catch {}
        }
      }
    } catch (err: any) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: 'assistant',
          content: '❌ ' + (err?.message ?? 'خطایی رخ داد. لطفاً بعداً دوباره امتحان کنید.'),
        };
        return copy;
      });
      toast({ title: 'خطا', description: err?.message ?? 'خطا در چت', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50" dir="rtl">
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="گفتگو با دستیار هوشمند"
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
          isOpen ? 'bg-destructive rotate-90' : 'bg-primary hover:opacity-90'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 w-[calc(100vw-2rem)] max-w-sm md:w-[26rem] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-scale">
          {/* header */}
          <div className="flex items-center justify-between bg-primary text-primary-foreground px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold">دستیار هوشمند نوین وی‌دی‌اس</div>
                <div className="text-[10px] opacity-80">پاسخگویی هوشمند ۲۴ ساعته</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10" onClick={clearChat} title="پاک کردن گفتگو">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setIsOpen(false)} title="بستن">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="h-[26rem] overflow-y-auto p-3 space-y-3 bg-background">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`rounded-2xl px-3 py-2 max-w-[80%] text-sm leading-6 ${
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-muted text-foreground rounded-tl-sm'
                }`}>
                  {m.content ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none [&>*]:my-1">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <Loader2 className="w-4 h-4 animate-spin opacity-70" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* composer */}
          <div className="border-t border-border p-2 bg-card">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="پیام خود را بنویسید…"
                className="flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring max-h-32"
                disabled={loading}
              />
              <Button size="icon" onClick={send} disabled={loading || !input.trim()} className="shrink-0 h-9 w-9 rounded-xl">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 text-center">
              پاسخ‌های هوش مصنوعی ممکن است دقیق نباشند.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
