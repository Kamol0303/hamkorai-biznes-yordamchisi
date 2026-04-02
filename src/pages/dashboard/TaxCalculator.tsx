import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, RefreshCw, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { taxConfig } from "@/data/taxMock";

export default function TaxCalculator() {
  const [tushum, setTushum] = useState(50000000);
  const [xarajat, setXarajat] = useState(30000000);
  const [soliqFoiz, setSoliqFoiz] = useState(taxConfig.soliqFoizi);
  const [qqsFoiz, setQqsFoiz] = useState(taxConfig.qoshilganQiymatSoliqi);
  const [ijtimoiyFoiz, setIjtimoiyFoiz] = useState(taxConfig.ijtimoiySoliqFoizi);

  const sofFoyda = tushum - xarajat;
  const daromadSoliqi = Math.round(sofFoyda * (soliqFoiz / 100));
  const qqsSoliqi = Math.round(tushum * (qqsFoiz / 100));
  const umumiySoliq = daromadSoliqi + qqsSoliqi;
  const sofDaromad = sofFoyda - umumiySoliq;

  const reset = () => {
    setTushum(50000000);
    setXarajat(30000000);
    setSoliqFoiz(taxConfig.soliqFoizi);
    setQqsFoiz(taxConfig.qoshilganQiymatSoliqi);
    setIjtimoiyFoiz(taxConfig.ijtimoiySoliqFoizi);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Soliq kalkulyatori</h1>
        <p className="text-sm text-muted-foreground">Taxminiy soliq hisob-kitob</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Kirish ma'lumotlari */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Calculator className="w-4 h-4 text-primary" /> Kirish ma'lumotlari
              </CardTitle>
              <Button size="sm" variant="ghost" onClick={reset}><RefreshCw className="w-3 h-3 mr-1" /> Tozalash</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Umumiy tushum (so'm)</Label>
              <Input type="number" value={tushum} onChange={(e) => setTushum(Number(e.target.value))} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Umumiy xarajat (so'm)</Label>
              <Input type="number" value={xarajat} onChange={(e) => setXarajat(Number(e.target.value))} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Daromad soliqi (%)</Label>
                <Input type="number" value={soliqFoiz} onChange={(e) => setSoliqFoiz(Number(e.target.value))} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">QQS (%)</Label>
                <Input type="number" value={qqsFoiz} onChange={(e) => setQqsFoiz(Number(e.target.value))} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Natijalar */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Hisoblash natijalari</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Sof foyda", value: sofFoyda, color: "text-primary" },
              { label: "Daromad soliqi", value: daromadSoliqi, color: "text-warning" },
              { label: "QQS soliqi", value: qqsSoliqi, color: "text-warning" },
              { label: "Umumiy soliq", value: umumiySoliq, color: "text-destructive" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg border border-border">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className={`text-sm font-bold ${item.color}`}>{item.value.toLocaleString()} so'm</span>
              </motion.div>
            ))}
            <div className="mt-2 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground">Soliqdan keyingi sof daromad</p>
              <p className="text-2xl font-bold text-primary mt-1">{sofDaromad.toLocaleString()} so'm</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI tavsiya */}
      <Card className="bg-card border-border">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI tavsiyasi</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {sofFoyda > 0
                ? `Sof foydangiz ${(sofFoyda / 1000000).toFixed(1)} mln so'm. Soliqni optimallashtirish uchun xarajatlarni to'g'ri hujjatlashtiring va amortizatsiya imkoniyatlaridan foydalaning.`
                : "Xarajatlar tushumdan oshmoqda. Biznes modelingizni qayta ko'rib chiqing va keraksiz xarajatlarni qisqartiring."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
