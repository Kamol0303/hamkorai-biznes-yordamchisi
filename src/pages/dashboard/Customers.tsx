import { useState } from "react";
import { Search, Filter, MessageSquare, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { customers } from "@/data/mock";

const sentimentColor = { ijobiy: "bg-success/10 text-success", neytral: "bg-info/10 text-info", salbiy: "bg-destructive/10 text-destructive" };
const sentimentLabel = { ijobiy: "Ijobiy", neytral: "Neytral", salbiy: "Salbiy" };

export default function Customers() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const selectedCustomer = customers.find((c) => c.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mijozlar</h1>
        <p className="text-sm text-muted-foreground">{customers.length} ta mijoz</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Mijoz qidirish..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-2">
          {filtered.map((c) => (
            <Card key={c.id} className={`cursor-pointer transition-all hover:shadow-md ${selected === c.id ? "border-primary ring-1 ring-primary/20" : "border-border"} bg-card`}
              onClick={() => setSelected(c.id)}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.channel} • {c.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {c.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                  <Badge className={`text-xs ${sentimentColor[c.sentiment as keyof typeof sentimentColor]}`}>
                    {sentimentLabel[c.sentiment as keyof typeof sentimentLabel]}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCustomer ? (
          <Card className="bg-card border-border h-fit sticky top-6">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {selectedCustomer.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <CardTitle className="text-lg">{selectedCustomer.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{selectedCustomer.channel}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Buyurtmalar</p>
                  <p className="text-lg font-bold text-card-foreground">{selectedCustomer.totalOrders}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Oxirgi buyurtma</p>
                  <p className="text-sm font-medium text-card-foreground">{selectedCustomer.lastOrder}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Teglar</p>
                <div className="flex flex-wrap gap-1">
                  {selectedCustomer.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">AI eslatma</p>
                <p className="text-sm text-card-foreground bg-accent/50 p-3 rounded-lg">
                  {selectedCustomer.sentiment === "salbiy"
                    ? "⚠️ Bu mijoz oxirgi suhbatlarda norozi. Shaxsiy e'tibor qarating."
                    : "✅ Doimiy va sodiq mijoz. VIP dasturiga qo'shishni tavsiya etamiz."}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 gradient-primary text-primary-foreground border-0">
                  <MessageSquare className="w-4 h-4 mr-1" /> Xabar
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-1" /> Qo'ng'iroq
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-card border-border flex items-center justify-center p-8 h-fit">
            <p className="text-muted-foreground text-sm text-center">Mijozni tanlang</p>
          </Card>
        )}
      </div>
    </div>
  );
}
