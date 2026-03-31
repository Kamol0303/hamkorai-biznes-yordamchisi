import { AlertTriangle, CheckCircle, Clock, FileText, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { monitoringAlerts, conversations, sentimentTrend } from "@/data/mock";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const severityConfig = {
  yuqori: { color: "bg-destructive/10 text-destructive border-destructive/30", icon: AlertTriangle, label: "Yuqori" },
  "o'rta": { color: "bg-warning/10 text-warning border-warning/30", icon: Clock, label: "O'rta" },
  past: { color: "bg-info/10 text-info border-info/30", icon: CheckCircle, label: "Past" },
};

export default function Monitoring() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Xizmat sifati monitoringi</h1>
          <p className="text-sm text-muted-foreground">Real vaqtda sentiment tahlili va ogohlantirishlar</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => toast.success("PDF hisobot yuklab olindi!")}>
          <Download className="w-4 h-4 mr-1" /> Hisobot
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-success/5 border-success/20">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-success">87%</p>
            <p className="text-xs text-muted-foreground">Ijobiy fikrlar</p>
          </CardContent>
        </Card>
        <Card className="bg-info/5 border-info/20">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-info">9%</p>
            <p className="text-xs text-muted-foreground">Neytral</p>
          </CardContent>
        </Card>
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-destructive">4%</p>
            <p className="text-xs text-muted-foreground">Salbiy fikrlar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sentiment chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Haftalik sentiment trendi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={sentimentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="kun" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Area type="monotone" dataKey="ijobiy" stroke="hsl(var(--success))" fill="hsl(var(--success) / 0.2)" name="Ijobiy" />
                <Area type="monotone" dataKey="salbiy" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.2)" name="Salbiy" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" /> AI ogohlantirishlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {monitoringAlerts.map((alert) => {
              const config = severityConfig[alert.severity];
              return (
                <div key={alert.id} className={`p-3 rounded-lg border ${config.color}`}>
                  <div className="flex items-start gap-2">
                    <config.icon className="w-4 h-4 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <span className="text-xs opacity-70">{alert.time}</span>
                      </div>
                      <p className="text-xs mt-1 opacity-80">💡 {alert.suggestion}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Conversation sentiment list */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Suhbatlar sentiment holati</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {conversations.map((c) => (
            <div key={c.id} className={`flex items-center justify-between p-3 rounded-lg border-l-4 bg-muted/30 ${
              c.sentiment === "ijobiy" ? "border-l-success" :
              c.sentiment === "salbiy" ? "border-l-destructive" : "border-l-info"
            }`}>
              <div>
                <p className="text-sm font-medium text-card-foreground">{c.customer}</p>
                <p className="text-xs text-muted-foreground truncate max-w-sm">{c.lastMessage}</p>
              </div>
              <Badge className={`text-xs ${
                c.sentiment === "ijobiy" ? "bg-success/10 text-success" :
                c.sentiment === "salbiy" ? "bg-destructive/10 text-destructive" :
                "bg-info/10 text-info"
              }`}>
                {c.sentiment === "ijobiy" ? "Ijobiy" : c.sentiment === "salbiy" ? "Salbiy" : "Neytral"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
