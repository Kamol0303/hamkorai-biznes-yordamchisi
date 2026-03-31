import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bot, Mail, Lock, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center pb-2">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">HamkorAI</span>
          </Link>
          <h1 className="text-xl font-semibold text-card-foreground">
            {step === 1 ? "Ro'yxatdan o'tish" : "Biznesingiz haqida"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {step === 1 ? "Yangi hisob yarating" : "Biznes turingizni tanlang"}
          </p>
          <div className="flex gap-2 justify-center mt-2">
            <div className={`h-1.5 w-12 rounded-full ${step >= 1 ? "gradient-primary" : "bg-muted"}`} />
            <div className={`h-1.5 w-12 rounded-full ${step >= 2 ? "gradient-primary" : "bg-muted"}`} />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="To'liq ismingiz" className="pl-10" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Elektron pochta" type="email" className="pl-10" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Parol" type="password" className="pl-10" />
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Biznes nomi" className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Biznes turini tanlang" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oshxona">Oshxona / Restoran</SelectItem>
                    <SelectItem value="dokon">Do'kon</SelectItem>
                    <SelectItem value="sartaroshxona">Sartaroshxona</SelectItem>
                    <SelectItem value="avtoservis">Avtoservis</SelectItem>
                    <SelectItem value="yetkazish">Yetkazib berish</SelectItem>
                    <SelectItem value="talim">Ta'lim markazi</SelectItem>
                    <SelectItem value="boshqa">Boshqa</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Kanallarni ulash" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telegram">Telegram</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0">
              {step === 1 ? "Davom etish" : "Boshlash"}
            </Button>
            {step === 2 && (
              <Button type="button" variant="ghost" className="w-full" onClick={() => setStep(1)}>Orqaga</Button>
            )}
          </form>
          {step === 1 && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Hisobingiz bormi?{" "}
              <Link to="/kirish" className="text-primary font-medium hover:underline">Kirish</Link>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
