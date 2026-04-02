import { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, UserX, Search, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { employees } from "@/data/taxMock";

export default function TaxEmployees() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"barchasi" | "aktiv" | "noaktiv">("barchasi");

  const filtered = employees.filter((e) => {
    const matchSearch = e.ism.toLowerCase().includes(search.toLowerCase()) || e.lavozim.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "barchasi" || e.holat === filter;
    return matchSearch && matchFilter;
  });

  const aktivSoni = employees.filter((e) => e.holat === "aktiv").length;
  const umumiyOylik = employees.filter((e) => e.holat === "aktiv").reduce((s, e) => s + e.oylik, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Xodimlar boshqaruvi</h1>
        <p className="text-sm text-muted-foreground">Xodimlar ro'yxati va ish holati</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Jami xodimlar</span>
              <UserCheck className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xl font-bold text-card-foreground">{employees.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Aktiv xodimlar</span>
              <UserCheck className="w-4 h-4 text-success" />
            </div>
            <p className="text-xl font-bold text-card-foreground">{aktivSoni}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Umumiy oylik fond</span>
              <span className="text-xs text-warning font-medium">{(umumiyOylik / 1000000).toFixed(1)} mln</span>
            </div>
            <p className="text-xl font-bold text-card-foreground">{umumiyOylik.toLocaleString()} so'm</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-base font-semibold">Xodimlar ro'yxati</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Qidirish..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
              </div>
              <div className="flex gap-1">
                {(["barchasi", "aktiv", "noaktiv"] as const).map((f) => (
                  <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="text-xs capitalize">
                    {f}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Ism</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">Lavozim</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Oylik</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">INN</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">Ish boshlagan</th>
                  <th className="text-center py-2 text-muted-foreground font-medium">Holat</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e, i) => (
                  <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50">
                    <td className="py-2.5 font-medium text-card-foreground">{e.ism}</td>
                    <td className="py-2.5 text-muted-foreground">{e.lavozim}</td>
                    <td className="py-2.5 text-right text-card-foreground">{e.oylik.toLocaleString()} so'm</td>
                    <td className="py-2.5 text-muted-foreground font-mono text-xs">{e.innRaqam}</td>
                    <td className="py-2.5 text-muted-foreground">{e.ishgaKirganSana}</td>
                    <td className="py-2.5 text-center">
                      <Badge variant={e.holat === "aktiv" ? "default" : "secondary"} className="text-xs">
                        {e.holat === "aktiv" ? "Aktiv" : "Noaktiv"}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
