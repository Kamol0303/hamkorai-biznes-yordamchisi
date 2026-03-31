import { useState } from "react";
import { Bot, CreditCard, Users, Plug, Crown, Check, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const integrations = [
  { name: "Telegram Bot", status: true, desc: "@choyxona_baraka_bot" },
  { name: "WhatsApp Business", status: false, desc: "Ulanmagan" },
  { name: "Instagram DM", status: false, desc: "Ulanmagan" },
  { name: "Click to'lov", status: true, desc: "Ulangan" },
  { name: "Payme", status: false, desc: "Ulanmagan" },
];

const teamMembers = [
  { name: "Anvar Karimov", role: "Egasi", email: "anvar@choyxona.uz" },
  { name: "Dilshod Toshmatov", role: "Menejer", email: "dilshod@choyxona.uz" },
];

export default function SettingsPage() {
  const [aiMode, setAiMode] = useState("agent");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Sozlamalar</h1>
        <p className="text-sm text-muted-foreground">Platforma va integratsiya sozlamalari</p>
      </div>

      <Tabs defaultValue="integrations">
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="integrations">Integratsiyalar</TabsTrigger>
          <TabsTrigger value="billing">To'lovlar</TabsTrigger>
          <TabsTrigger value="team">Jamoa</TabsTrigger>
          <TabsTrigger value="ai">AI sozlamalari</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="mt-6 space-y-3">
          {integrations.map((integ) => (
            <Card key={integ.name} className="bg-card border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Plug className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-card-foreground">{integ.name}</p>
                    <p className="text-xs text-muted-foreground">{integ.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={integ.status ? "default" : "secondary"} className={integ.status ? "bg-success/10 text-success" : ""}>
                    {integ.status ? "Ulangan" : "Ulanmagan"}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => toast.info("Integratsiya sozlamalari tez orada!")}>
                    {integ.status ? "Sozlash" : "Ulash"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-warning" /> Joriy tarif: Bepul
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border border-primary/30 gradient-card">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-card-foreground">Premium tarif</p>
                    <p className="text-sm text-muted-foreground">Barcha imkoniyatlardan foydalaning</p>
                  </div>
                  <p className="text-2xl font-bold text-primary">149 000 <span className="text-sm font-normal text-muted-foreground">so'm/oy</span></p>
                </div>
                <ul className="space-y-2 mb-4">
                  {["Barcha kanallar", "Cheksiz suhbatlar", "AI Agent rejimi", "PDF hisobotlar", "5 foydalanuvchi"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-card-foreground">
                      <Check className="w-4 h-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full gradient-primary text-primary-foreground border-0"
                  onClick={() => toast.success("Premium ga o'tish tez orada amalga oshiriladi!")}>
                  Premium ga o'tish
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-6 space-y-3">
          {teamMembers.map((m) => (
            <Card key={m.email} className="bg-card border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-card-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <Badge variant="secondary">{m.role}</Badge>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" className="w-full" onClick={() => toast.info("Jamoa a'zosi qo'shish tez orada!")}>
            <Users className="w-4 h-4 mr-2" /> Jamoa a'zosi qo'shish
          </Button>
        </TabsContent>

        <TabsContent value="ai" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" /> AI Chatbot sozlamalari
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-card-foreground">AI Agent rejimi</p>
                  <p className="text-xs text-muted-foreground">AI mustaqil qaror qabul qiladi</p>
                </div>
                <Switch checked={aiMode === "agent"} onCheckedChange={(c) => setAiMode(c ? "agent" : "rules")} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Oddiy qoidalar rejimi</p>
                  <p className="text-xs text-muted-foreground">Faqat belgilangan qoidalar bo'yicha javob beradi</p>
                </div>
                <Switch checked={aiMode === "rules"} onCheckedChange={(c) => setAiMode(c ? "rules" : "agent")} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Avtomatik javob</p>
                  <p className="text-xs text-muted-foreground">Ish vaqtidan tashqari avtomatik javob berish</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
