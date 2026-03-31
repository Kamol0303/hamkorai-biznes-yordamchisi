import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bot, MessageSquare, BarChart3, Shield, Zap, Users, Star, ChevronRight, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pricingPlans, testimonials } from "@/data/mock";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const features = [
  { icon: Bot, title: "AI Chatbot", desc: "Telegram, WhatsApp va Instagram uchun aqlli chatbot. Mijozlarga 24/7 xizmat ko'rsatadi." },
  { icon: Users, title: "Mijozlar boshqaruvi", desc: "Barcha mijozlaringizni bitta joyda boshqaring. Suhbat tarixi, buyurtmalar va AI tahlillar." },
  { icon: MessageSquare, title: "Yagona inbox", desc: "Barcha kanallardan kelgan xabarlarni bitta oynada ko'ring va javob bering." },
  { icon: Shield, title: "Xizmat sifati", desc: "Real vaqtda sentiment tahlili. Muammolarni payqang va tezda hal qiling." },
  { icon: BarChart3, title: "Biznes tahlillar", desc: "Savdo, mijozlar va xizmat sifati bo'yicha chuqur tahlillar va AI bashoratlar." },
  { icon: Zap, title: "Tez sozlash", desc: "2 daqiqada ro'yxatdan o'ting va ishni boshlang. Hech qanday texnik bilim kerak emas." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">HamkorAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Imkoniyatlar</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Narxlar</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Fikrlar</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/kirish">
              <Button variant="ghost" size="sm">Kirish</Button>
            </Link>
            <Link to="/royxatdan-otish">
              <Button size="sm" className="gradient-primary text-primary-foreground border-0">Boshlash</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <Zap className="w-4 h-4" /> Yangi: AI Agent rejimi ishga tushdi
            </span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Kichik biznesingizning <br />
            <span className="gradient-text">aqlli yordamchisi</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            CRM, AI chatbot, xizmat sifati monitoringi va biznes tahlillarini bitta platformada boshqaring. 
            O'zbekiston tadbirkorlari uchun maxsus yaratilgan.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/royxatdan-otish">
              <Button size="lg" className="gradient-primary text-primary-foreground border-0 px-8 text-base animate-pulse-glow">
                2 daqiqada boshlang <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="px-8 text-base">
                Batafsil ma'lumot
              </Button>
            </a>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
            className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-primary" /> Bepul boshlash</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-primary" /> Bank karta shart emas</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-primary" /> 2 daqiqada sozlash</span>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Barcha kerakli vositalar bitta joyda</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Biznesingizni rivojlantirish uchun zarur bo'lgan barcha AI vositalar</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                      <f.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{f.title}</h3>
                    <p className="text-muted-foreground text-sm">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Oddiy va shaffof narxlar</h2>
            <p className="text-muted-foreground text-lg">Biznesingiz hajmiga mos tarif tanlang</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div key={plan.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className={`h-full relative ${plan.popular ? "border-primary shadow-lg scale-105" : "border-border"} bg-card`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-medium">
                      Mashhur
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-card-foreground">{plan.price}</span>
                      <span className="text-muted-foreground text-sm ml-2">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link to="/royxatdan-otish">
                      <Button className={`w-full ${plan.popular ? "gradient-primary text-primary-foreground border-0" : ""}`}
                        variant={plan.popular ? "default" : "outline"}>
                        {plan.cta} <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tadbirkorlar fikrlari</h2>
            <p className="text-muted-foreground text-lg">HamkorAI ishlatayotgan tadbirkorlar nima deydi</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-card-foreground text-sm mb-4 italic">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.business}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="gradient-primary rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Hoziroq boshlang!</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto">
              2 daqiqada ro'yxatdan o'ting va biznesingizni AI bilan boshqarishni boshlang.
            </p>
            <Link to="/royxatdan-otish">
              <Button size="lg" variant="secondary" className="px-8 text-base bg-background text-foreground hover:bg-background/90">
                Bepul boshlash <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">HamkorAI</span>
              </div>
              <p className="text-sm text-muted-foreground">AI Hamkor – kichik biznesingizning aqlli yordamchisi</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Mahsulot</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>AI Chatbot</li><li>CRM</li><li>Monitoring</li><li>Tahlillar</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Kompaniya</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Biz haqimizda</li><li>Blog</li><li>Bog'lanish</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Qo'llab-quvvatlash</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Yordam markazi</li><li>Maxfiylik siyosati</li><li>Foydalanish shartlari</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 HamkorAI. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </footer>
    </div>
  );
}
