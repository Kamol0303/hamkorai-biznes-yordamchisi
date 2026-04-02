import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, SmilePlus, AlertTriangle, Lightbulb, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { weeklyRevenue, topProducts, sentimentTrend, aiRecommendations } from "@/data/mock";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

const kpis = [
  { label: "Bugungi savdo", value: "5,200,000 so'm", change: "+12%", up: true, icon: TrendingUp, color: "text-primary" },
  { label: "Mijozlar soni", value: "1,247", change: "+5%", up: true, icon: Users, color: "text-secondary" },
  { label: "Sentiment balli", value: "87%", change: "+3%", up: true, icon: SmilePlus, color: "text-success" },
  { label: "Churn xavfi", value: "4 mijoz", change: "-2", up: false, icon: AlertTriangle, color: "text-warning" },
];

const COLORS = ["hsl(147, 85%, 34%)", "hsl(197, 100%, 43%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)", "hsl(270, 50%, 50%)"];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) };

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bosh sahifa</h1>
        <p className="text-sm text-muted-foreground">Bugungi biznes holati</p>
      </div>

      {/* KPI Cards */}
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
        {/* Weekly Revenue Chart */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Haftalik savdo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="kun" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(v: number) => [`${v.toLocaleString()} so'm`, "Savdo"]} />
                <Bar dataKey="savdo" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Eng ko'p sotilgan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={topProducts} dataKey="miqdor" nameKey="nomi" cx="50%" cy="50%" outerRadius={80} label={({ nomi }) => nomi}>
                  {topProducts.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sentiment Trend */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Sentiment trendi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={sentimentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="kun" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Area type="monotone" dataKey="ijobiy" stroke="hsl(var(--success))" fill="hsl(var(--success) / 0.2)" />
                <Area type="monotone" dataKey="neytral" stroke="hsl(var(--info))" fill="hsl(var(--info) / 0.2)" />
                <Area type="monotone" dataKey="salbiy" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.2)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-warning" /> AI tavsiyasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiRecommendations.map((rec) => (
              <div key={rec.id} className={`p-3 rounded-lg border ${
                rec.type === "xavf" ? "border-destructive/30 bg-destructive/5" :
                rec.type === "savdo" ? "border-primary/30 bg-primary/5" :
                "border-info/30 bg-info/5"
              }`}>
                <p className="text-sm font-medium text-card-foreground">{rec.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
