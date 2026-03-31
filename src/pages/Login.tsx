import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bot, Mail, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Muvaffaqiyatli kirdingiz!");
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
          <h1 className="text-xl font-semibold text-card-foreground">Tizimga kirish</h1>
          <p className="text-sm text-muted-foreground">Hisobingizga kiring va davom eting</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Elektron pochta" type="email" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Parol" type="password" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0">Kirish</Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">yoki</span></div>
          </div>
          <Button variant="outline" className="w-full" onClick={() => { toast.success("Google orqali kirdingiz!"); navigate("/dashboard"); }}>
            Google orqali kirish
          </Button>
          <Button variant="outline" className="w-full" onClick={() => toast.info("Telefon orqali kirish tez orada!")}>
            <Phone className="w-4 h-4 mr-2" /> Telefon orqali kirish
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Hisobingiz yo'qmi?{" "}
            <Link to="/royxatdan-otish" className="text-primary font-medium hover:underline">Ro'yxatdan o'ting</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
