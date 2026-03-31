import { useState } from "react";
import { Send, Bot as BotIcon, User, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { conversations, chatMessages } from "@/data/mock";

const channelIcon: Record<string, string> = { Telegram: "✈️", WhatsApp: "💬", Instagram: "📷" };
const sentimentBorder = { ijobiy: "border-l-success", neytral: "border-l-info", salbiy: "border-l-destructive" };

export default function Conversations() {
  const [selectedId, setSelectedId] = useState(1);
  const [message, setMessage] = useState("");
  const selected = conversations.find((c) => c.id === selectedId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Suhbatlar</h1>
          <p className="text-sm text-muted-foreground">Barcha kanallardan yagona inbox</p>
        </div>
        <Button variant="outline" size="sm"><Settings2 className="w-4 h-4 mr-1" /> Chatbot sozlamalari</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
        {/* Conversation list */}
        <Card className="bg-card border-border overflow-auto">
          <CardContent className="p-2 space-y-1">
            {conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`p-3 rounded-lg cursor-pointer border-l-4 transition-all ${sentimentBorder[c.sentiment]} ${
                  selectedId === c.id ? "bg-accent" : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-card-foreground">{c.customer}</span>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground truncate max-w-[180px]">{c.lastMessage}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{channelIcon[c.channel]}</span>
                    {c.unread > 0 && (
                      <Badge variant="destructive" className="text-xs px-1.5 py-0 h-5">{c.unread}</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat area */}
        <Card className="lg:col-span-2 bg-card border-border flex flex-col">
          <CardHeader className="pb-2 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                {channelIcon[selected?.channel || "Telegram"]} {selected?.customer}
              </CardTitle>
              <Badge className={`text-xs ${
                selected?.sentiment === "ijobiy" ? "bg-success/10 text-success" :
                selected?.sentiment === "salbiy" ? "bg-destructive/10 text-destructive" :
                "bg-info/10 text-info"
              }`}>
                {selected?.sentiment === "ijobiy" ? "Ijobiy" : selected?.sentiment === "salbiy" ? "Salbiy" : "Neytral"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.sender === "bot" ? "" : "justify-end"}`}>
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center shrink-0">
                    <BotIcon className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                <div className={`max-w-[70%] p-3 rounded-xl text-sm ${
                  msg.sender === "bot"
                    ? "bg-muted text-card-foreground rounded-tl-sm"
                    : "gradient-primary text-primary-foreground rounded-tr-sm"
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`text-xs mt-1 block ${msg.sender === "bot" ? "text-muted-foreground" : "text-primary-foreground/70"}`}>{msg.time}</span>
                </div>
                {msg.sender === "customer" && (
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
          <div className="p-3 border-t border-border flex gap-2">
            <Input placeholder="Xabar yozing..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1" />
            <Button size="icon" className="gradient-primary text-primary-foreground border-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
