import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, CheckCircle2, Info, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { complianceAlerts, taxConfig, employees } from "@/data/taxMock";

const aktivXodimlar = employees.filter((e) => e.holat === "aktiv").length;

const complianceChecks = [
  {
    label: "Xodimlar soni limiti",
    holat: aktivXodimlar <= taxConfig.xodimlarLimiti,
    qiymat: `${aktivXodimlar} / ${taxConfig.xodimlarLimiti}`,
    tavsif: "Kichik biznes toifasidagi xodimlar limiti",
  },
  {
    label: "Soliq hisobot muddati",
    holat: false,
    qiymat: taxConfig.hisobotMuddati,
    tavsif: "Keyingi hisobot topshirish muddati",
  },
  {
    label: "QQS ro'yxati",
    holat: true,
    qiymat: `${taxConfig.qoshilganQiymatSoliqi}%`,
    tavsif: "QQS to'lovchisi sifatida ro'yxatdan o'tish holati",
  },
  {
    label: "Daromad deklaratsiyasi",
    holat: false,
    qiymat: `${(taxConfig.daromadDeklaratsiyaLimiti / 1000000).toFixed(0)} mln limit`,
    tavsif: "Choraklik daromad deklaratsiyasi holati",
  },
];

const darajaIcon = {
  yuqori: <AlertTriangle className="w-4 h-4 text-destructive" />,
  "o'rta": <Info className="w-4 h-4 text-warning" />,
  past: <Info className="w-4 h-4 text-info" />,
};

const darajaBg = {
  yuqori: "border-destructive/30 bg-destructive/5",
  "o'rta": "border-warning/30 bg-warning/5",
  past: "border-info/30 bg-info/5",
};

export default function TaxCompliance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Qonuniy moslik</h1>
        <p className="text-sm text-muted-foreground">Biznes faoliyati soliq qoidalariga mosligini tekshirish</p>
      </div>

      {/* Compliance tekshiruv */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" /> Moslik tekshiruvi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {complianceChecks.map((check, i) => (
            <motion.div key={check.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                {check.holat ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-warning" />
                )}
                <div>
                  <p className="text-sm font-medium text-card-foreground">{check.label}</p>
                  <p className="text-xs text-muted-foreground">{check.tavsif}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={check.holat ? "default" : "secondary"} className="text-xs">
                  {check.qiymat}
                </Badge>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Ogohlantirishlar */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" /> Ogohlantirishlar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {complianceAlerts.map((alert, i) => (
            <motion.div key={alert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`p-4 rounded-lg border ${darajaBg[alert.daraja]}`}>
              <div className="flex items-start gap-3">
                {darajaIcon[alert.daraja]}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-card-foreground">{alert.xabar}</p>
                    <Badge variant={alert.daraja === "yuqori" ? "destructive" : "secondary"} className="text-xs shrink-0">
                      {alert.daraja}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.tavsiya}</p>
                  <p className="text-xs text-muted-foreground mt-1">Sana: {alert.sana}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* AI tavsiya */}
      <Card className="bg-card border-border">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI soliq tavsiyasi</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Soliqni optimallashtirish uchun qonuniy xarajatlarni to'g'ri hujjatlashtiring. Amortizatsiya imkoniyatlaridan foydalaning va soliq imtiyozlariga e'tibor bering.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
