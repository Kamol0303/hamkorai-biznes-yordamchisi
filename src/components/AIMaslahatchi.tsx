import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
  time: string;
};

const quickQuestions = [
  "Bugungi sotuv tahlili",
  "Marketing bo'yicha tavsiya ber",
  "Mijozlar haqida ma'lumot ber",
  "Bozor trendlarini ko'rsat",
];

const proactiveMessages = [
  "📉 Oxirgi 3 kunda sotuv 20% ga kamaydi. Reklama strategiyasini yangilash tavsiya etiladi.",
  "⏳ Mijozlarga javob berish vaqti uzaygan — o'rtacha 18 daqiqa. Tezkorlikni oshiring.",
  "📈 Bozorda yangi trend: tez yetkazib berish xizmatlari. Bu yo'nalishni sinab ko'ring!",
];

const mockResponses: Record<string, string> = {
  "bugungi sotuv tahlili":
    "📊 Bugungi sotuv: 5,200,000 so'm\n\n• O'tgan kunga nisbatan +12% o'sish\n• Eng ko'p sotilgan: Somsa (87 ta), Toshkent oshi (54 ta)\n• Eng faol soat: 12:00-14:00\n• O'rtacha chek: 74,000 so'm\n\n💡 Tavsiya: Tushlik vaqtida maxsus kombo taklif qilsangiz, sotuv yana 15-20% oshishi mumkin.",
  "marketing bo'yicha tavsiya ber":
    "🎯 Marketing tavsiyalari:\n\n1. Telegram kanalda haftalik aksiya e'lon qiling\n2. Instagram'da taom rasmlarini har kuni joylashtiring\n3. Doimiy mijozlarga 10% chegirma kartasi taklif eting\n4. \"Do'stingizni taklif eting\" dasturi ishga tushiring\n\n📈 Kutilgan natija: 1 oy ichida mijozlar soni 25-30% oshishi mumkin.",
  "mijozlar haqida ma'lumot ber":
    "👥 Mijozlar statistikasi:\n\n• Jami: 1,247 ta faol mijoz\n• Yangi (bu hafta): 43 ta\n• VIP mijozlar: 89 ta\n• Sentiment: 87% ijobiy, 9% neytral, 4% salbiy\n• Churn xavfi: 4 ta mijoz (Dilfuza N., Zilola Q. va boshqalar)\n\n⚠️ Diqqat: Churn xavfidagi mijozlarga shaxsiy murojaat qilish tavsiya etiladi.",
  "bozor trendlarini ko'rsat":
    "📈 O'zbekiston bozor trendlari:\n\n1. 🚀 Tez yetkazib berish — talab 45% oshgan\n2. 📱 Onlayn buyurtma — 60% mijozlar ilovadan foydalanadi\n3. 🥗 Sog'lom ovqatlanish — yangi segment, +30% o'sish\n4. 💳 Naqdsiz to'lov — 70% mijozlar Click/Payme afzal ko'radi\n\n💡 Tavsiya: Tez yetkazib berish xizmatini kuchaytiring va sog'lom menyu qo'shing.",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const [key, val] of Object.entries(mockResponses)) {
    if (lower.includes(key) || key.includes(lower)) return val;
  }
  return `🤖 Savolingiz qabul qilindi: "${input}"\n\nBiznes tahlillaringiz asosida javob tayyorlanmoqda. Hozircha quyidagilarni sinab ko'ring:\n\n• "Bugungi sotuv tahlili"\n• "Marketing bo'yicha tavsiya ber"\n• "Mijozlar haqida ma'lumot ber"\n\nYaqin orada to'liq AI rejimi ishga tushiriladi!`;
}

function getNow() {
  return new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" });
}

export default function AIMaslahatchi() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "ai",
      text: `Assalomu alaykum! 👋 Men AI Maslahatchi — biznesingiz bo'yicha maslahat beraman.\n\n${proactiveMessages[Math.floor(Math.random() * proactiveMessages.length)]}`,
      time: getNow(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim(), time: getNow() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const aiMsg: Message = { id: Date.now() + 1, role: "ai", text: getAIResponse(text), time: getNow() };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary shadow-lg flex items-center justify-center text-primary-foreground"
          >
            <Bot className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-3rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">AI Maslahatchi</p>
                  <p className="text-[11px] text-muted-foreground">Biznes yordamchingiz</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                    <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick questions */}
            <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Savolingizni yozing..."
                className="flex-1 text-sm h-9"
              />
              <Button size="icon" className="h-9 w-9 shrink-0" onClick={() => send(input)} disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
