import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Landmark, Users, FileText, ShieldCheck, AlertTriangle, TrendingUp,
  ArrowUpRight, ArrowDownRight, Calculator, FileDown, UserCheck, Settings2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { employees, monthlyReports, complianceAlerts, yearlyRevenueTrend, taxConfig } from "@/data/taxMock";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from "recharts";

const aktivXodimlar = employees.filter((e) => e.holat === "aktiv").length;
const umumiyTushum = monthlyReports.reduce((s, r) => s + r.tushum, 0);
const umumiyXarajat = monthlyReports.reduce((s, r) => s + r.xarajat, 0);
const sofFoyda = umumiyTushum - umumiyXarajat;
const taxminSoliq = Math.round(sofFoyda * (taxConfig.soliqFoizi / 100));
const yuqoriAlertlar = complianceAlerts.filter((a) => a.daraja === "yuqori").length;

const kpis = [
  { label: "Umumiy tushum", value: `${(umumiyTushum / 1000000).toFixed(0)} mln`, icon: TrendingUp, color: "text-primary", change: "+8%", up: true },
  { label: "Sof foyda", value: `${(sofFoyda / 1000000).toFixed(0)} mln`, icon: Calculator, color: "text-success", change: "+5%", up: true },
  { label: "Taxminiy soliq", value: `${(taxminSoliq / 1000000).toFixed(1)} mln`, icon: Landmark, color: "text-warning", change: `${taxConfig.soliqFoizi}%`, up: false },
  { label: "Ogohlantirishlar", value: `${yuqoriAlertlar} ta`, icon: AlertTriangle, color: "text-destructive", change: "muhim", up: false },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) };

export default function TaxDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Soliq va Hisobot</h1>
          <p className="text-sm text-muted-foreground">Biznes soliq holati va davlat hisobotlari</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/soliq/hisobotlar"><FileDown className="w-4 h-4 mr-1" /> Hisobot yaratish</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/dashboard/soliq/kalkulyator"><Calculator className="w-4 h-4 mr-1" /> Soliq hisoblash</Link>
          </Button>
        </div>
      </div>

      {/* Proaktiv ogohlantirish */}
      {yuqoriAlertlar > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{yuqoriAlertlar} ta muhim ogohlantirish</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {complianceAlerts.filter(a => a.daraja === "yuqori")[0]?.xabar}
                </p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0 text-xs" asChild>
                <Link to="/dashboard/soliq/compliance">Batafsil</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* KPI kartochkalar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial="hidden" animate="visible" variants={fadeUp} custom={i}>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{kpi.label}</span>
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <p className="text-xl font-bold text-card-foreground">{kpi.value}</p>
                <div className={`flex items-center gap-1 text-xs mt-1 ${kpi.up ? "text-success" : "text-warning"}`}>
                  {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tushum/Xarajat grafigi */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Tushum va xarajatlar trendi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart data={yearlyRevenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="oy" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip formatter={(v: number) => [`${v.toLocaleString()} so'm`]} />
                <Bar dataKey="tushum" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Tushum" />
                <Line type="monotone" dataKey="xarajat" stroke="hsl(var(--destructive))" strokeWidth={2} name="Xarajat" dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tezkor havolalar */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Tezkor panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/dashboard/soliq/xodimlar" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <UserCheck className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Xodimlar ro'yxati</p>
                <p className="text-xs text-muted-foreground">{aktivXodimlar} ta aktiv xodim</p>
              </div>
            </Link>
            <Link to="/dashboard/soliq/hisobotlar" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <FileText className="w-5 h-5 text-info" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Hisobot yaratish</p>
                <p className="text-xs text-muted-foreground">Oylik va yillik hisobotlar</p>
              </div>
            </Link>
            <Link to="/dashboard/soliq/compliance" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <ShieldCheck className="w-5 h-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Qonuniy moslik</p>
                <p className="text-xs text-muted-foreground">{yuqoriAlertlar} ta ogohlantirish</p>
              </div>
            </Link>
            <Link to="/dashboard/soliq/sozlamalar" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <Settings2 className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Soliq sozlamalari</p>
                <p className="text-xs text-muted-foreground">Foiz va limitlar</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Oylik hisobotlar jadvali */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Oylik hisobotlar holati</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Oy</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Tushum</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Xarajat</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Soliq</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Holat</th>
                </tr>
              </thead>
              <tbody>
                {monthlyReports.map((r) => (
                  <tr key={r.oy} className="border-b border-border/50">
                    <td className="py-2.5 text-card-foreground font-medium">{r.oy}</td>
                    <td className="py-2.5 text-right text-card-foreground">{(r.tushum / 1000000).toFixed(1)} mln</td>
                    <td className="py-2.5 text-right text-muted-foreground">{(r.xarajat / 1000000).toFixed(1)} mln</td>
                    <td className="py-2.5 text-right text-warning">{(r.soliqMiqdori / 1000000).toFixed(1)} mln</td>
                    <td className="py-2.5 text-right">
                      <Badge variant={r.holat === "topshirilgan" ? "default" : r.holat === "tayyorlanmoqda" ? "secondary" : "destructive"} className="text-xs">
                        {r.holat === "topshirilgan" ? "✅ Topshirilgan" : r.holat === "tayyorlanmoqda" ? "🔄 Tayyorlanmoqda" : "⏳ Topshirilmagan"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
