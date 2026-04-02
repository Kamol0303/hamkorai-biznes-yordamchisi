import { motion } from "framer-motion";
import { FileText, Download, Eye, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { monthlyReports } from "@/data/taxMock";
import { toast } from "sonner";

const yillikHisobotlar = [
  { yil: "2024", holat: "tayyorlanmoqda" as const, sana: "2024-12-31" },
  { yil: "2023", holat: "topshirilgan" as const, sana: "2024-03-15" },
];

export default function TaxReports() {
  const handleExport = (name: string) => {
    toast.success(`"${name}" hisoboti PDF formatda tayyorlanmoqda...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Davlat hisobotlari</h1>
        <p className="text-sm text-muted-foreground">Oylik va yillik soliq hisobotlari</p>
      </div>

      {/* Yillik hisobotlar */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" /> Yillik hisobotlar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {yillikHisobotlar.map((h) => (
            <div key={h.yil} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-info" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">{h.yil}-yil yillik hisobot</p>
                  <p className="text-xs text-muted-foreground">Sana: {h.sana}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={h.holat === "topshirilgan" ? "default" : "secondary"} className="text-xs">
                  {h.holat === "topshirilgan" ? "✅ Topshirilgan" : "🔄 Tayyorlanmoqda"}
                </Badge>
                <Button size="sm" variant="ghost" onClick={() => handleExport(`${h.yil}-yillik`)}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Oylik hisobotlar */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-info" /> Oylik hisobotlar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {monthlyReports.map((r, i) => (
              <motion.div key={r.oy} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/30 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{r.oy} oyi hisoboti</p>
                    <p className="text-xs text-muted-foreground">
                      Tushum: {(r.tushum / 1000000).toFixed(1)} mln | Soliq: {(r.soliqMiqdori / 1000000).toFixed(1)} mln
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={r.holat === "topshirilgan" ? "default" : r.holat === "tayyorlanmoqda" ? "secondary" : "destructive"} className="text-xs">
                    {r.holat === "topshirilgan" ? "✅" : r.holat === "tayyorlanmoqda" ? "🔄" : "⏳"} {r.holat === "topshirilgan" ? "Topshirilgan" : r.holat === "tayyorlanmoqda" ? "Tayyorlanmoqda" : "Topshirilmagan"}
                  </Badge>
                  <Button size="sm" variant="ghost" onClick={() => handleExport(r.oy)}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
