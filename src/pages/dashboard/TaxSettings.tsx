import { useState } from "react";
import { Settings2, Save, RefreshCw, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { taxConfig, taxApiEndpoints } from "@/data/taxMock";
import { toast } from "sonner";

export default function TaxSettings() {
  const [config, setConfig] = useState({ ...taxConfig });

  const handleSave = () => {
    toast.success("Soliq sozlamalari saqlandi!");
  };

  const handleReset = () => {
    setConfig({ ...taxConfig });
    toast.info("Sozlamalar boshlang'ich holatga qaytarildi");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Soliq sozlamalari</h1>
        <p className="text-sm text-muted-foreground">Soliq foizlari va qonuniy limitlarni sozlash</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Soliq foizlari */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-primary" /> Soliq foizlari
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Daromad soliqi foizi (%)</Label>
              <Input type="number" value={config.soliqFoizi} onChange={(e) => setConfig({ ...config, soliqFoizi: Number(e.target.value) })} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Ijtimoiy soliq foizi (%)</Label>
              <Input type="number" value={config.ijtimoiySoliqFoizi} onChange={(e) => setConfig({ ...config, ijtimoiySoliqFoizi: Number(e.target.value) })} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">QQS foizi (%)</Label>
              <Input type="number" value={config.qoshilganQiymatSoliqi} onChange={(e) => setConfig({ ...config, qoshilganQiymatSoliqi: Number(e.target.value) })} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        {/* Qonuniy limitlar */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Qonuniy limitlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Xodimlar limiti (kichik biznes)</Label>
              <Input type="number" value={config.xodimlarLimiti} onChange={(e) => setConfig({ ...config, xodimlarLimiti: Number(e.target.value) })} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Daromad deklaratsiya limiti (so'm)</Label>
              <Input type="number" value={config.daromadDeklaratsiyaLimiti} onChange={(e) => setConfig({ ...config, daromadDeklaratsiyaLimiti: Number(e.target.value) })} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Keyingi hisobot muddati</Label>
              <Input type="date" value={config.hisobotMuddati} onChange={(e) => setConfig({ ...config, hisobotMuddati: e.target.value })} className="mt-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saqlash tugmalari */}
      <div className="flex gap-3">
        <Button onClick={handleSave}><Save className="w-4 h-4 mr-1" /> Saqlash</Button>
        <Button variant="outline" onClick={handleReset}><RefreshCw className="w-4 h-4 mr-1" /> Qaytarish</Button>
      </div>

      {/* API endpointlar */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Globe className="w-4 h-4 text-info" /> API endpointlar (davlat tizimi uchun tayyor)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(taxApiEndpoints).map(([key, url]) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div>
                <p className="text-sm font-medium text-card-foreground font-mono">{url}</p>
                <p className="text-xs text-muted-foreground capitalize">{key.replace(/_/g, " ")}</p>
              </div>
              <Badge variant="secondary" className="text-xs">Tayyor</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
