import { useState } from "react";
import { Send, Sparkles, TrendingUp, Users, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { weeklyRevenue, topProducts, sentimentTrend } from "@/data/mock";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const aiAnswers: Record<string, string> = {
  default: "Savolingizni yozing va men AI tahlil bilan javob beraman. Masalan: 'Qaysi mahsulot ko'proq sotilmoqda?' yoki 'Haftalik savdo qanday?'",
  mahsulot: "📊 Tahlilga ko'ra, Somsa eng ko'p sotilgan mahsulot (243 dona). Undan keyin Non (312) va Toshkent oshi (156) keladi. Somsa uchun maxsus aksiya qilish tavsiya etiladi.",
  savdo: "📈 Haftalik savdo o'sish trendida. Shanba kuni eng yuqori savdo (5,200,000 so'm). Dushanba kuni eng past. Hafta oxiriga maxsus takliflar tayyorlashni maslahat beraman.",
  mijoz: "👥 Jami 1,247 ta mijoz. Shundan 4 tasi churn xavfida. Doimiy mijozlarga sodiqlik dasturi taklif qiling.",
};

export default function Analytics() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(aiAnswers.default);

  const handleAsk = () => {
    if (!question.trim()) return;
    const q = question.toLowerCase();
    if (q.includes("mahsulot") || q.includes("sotil")) setAnswer(aiAnswers.mahsulot);
    else if (q.includes("savdo") || q.includes("daromad")) setAnswer(aiAnswers.savdo);
    else if (q.includes("mijoz") || q.includes("churn")) setAnswer(aiAnswers.mijoz);
    else setAnswer("🤖 Bu savol bo'yicha ma'lumot yig'ilmoqda. Tez orada to'liq javob beriladi. Boshqa savol berishingiz mumkin.");
    setQuestion("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tahlillar</h1>
        <p className="text-sm text-muted-foreground">Biznes tahlillari va AI bashoratlar</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Oylik savdo</p>
              <p className="text-lg font-bold text-card-foreground">23.4M so'm</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Yangi mijozlar</p>
              <p className="text-lg font-bold text-card-foreground">+127</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Buyurtmalar</p>
              <p className="text-lg font-bold text-card-foreground">896</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2"><CardTitle className="text-base">Savdo trendi</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="kun" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(v: number) => [`${v.toLocaleString()} so'm`, "Savdo"]} />
                <Line type="monotone" dataKey="savdo" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2"><CardTitle className="text-base">Mahsulotlar taqqoslash</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="nomi" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={80} />
                <Tooltip />
                <Bar dataKey="miqdor" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Chat */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-warning" /> AI dan so'rang
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-4 mb-4 min-h-[80px]">
            <p className="text-sm text-card-foreground whitespace-pre-line">{answer}</p>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Savolingizni yozing... (masalan: 'Qaysi mahsulot ko'proq sotilmoqda?')"
              value={question} onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()} />
            <Button size="icon" onClick={handleAsk} className="gradient-primary text-primary-foreground border-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
