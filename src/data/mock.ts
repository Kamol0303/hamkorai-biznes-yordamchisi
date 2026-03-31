export const businesses = [
  { id: 1, name: "Choyxona Baraka", type: "Oshxona", owner: "Anvar Karimov" },
  { id: 2, name: "Smart Do'kon", type: "Do'kon", owner: "Dilshod Toshmatov" },
  { id: 3, name: "Sartaroshxonam", type: "Sartaroshxona", owner: "Jasur Alimov" },
  { id: 4, name: "Tezkor Yetkazib Berish", type: "Yetkazib berish", owner: "Nodira Saidova" },
  { id: 5, name: "Avto Usta Pro", type: "Avtoservis", owner: "Bekzod Raxmatov" },
  { id: 6, name: "Gul Bozor", type: "Gul do'koni", owner: "Malika Xasanova" },
  { id: 7, name: "IT Academy Tashkent", type: "Ta'lim markazi", owner: "Sardor Ergashev" },
  { id: 8, name: "Milliy Taomlar", type: "Restoran", owner: "Zulfiya Abdullayeva" },
  { id: 9, name: "Fitnes Zona", type: "Sport zali", owner: "Rustam Qodirov" },
  { id: 10, name: "Oila Aptekasi", type: "Dorixona", owner: "Shahlo Mirzayeva" },
];

export const customers = [
  { id: 1, name: "Aziz Yuldashev", phone: "+998901234567", channel: "Telegram", lastOrder: "2024-01-15", totalOrders: 12, sentiment: "ijobiy", tags: ["doimiy", "VIP"] },
  { id: 2, name: "Gulnora Rahimova", phone: "+998937654321", channel: "WhatsApp", lastOrder: "2024-01-14", totalOrders: 5, sentiment: "neytral", tags: ["yangi"] },
  { id: 3, name: "Sherzod Kamolov", phone: "+998951112233", channel: "Instagram", lastOrder: "2024-01-13", totalOrders: 23, sentiment: "ijobiy", tags: ["doimiy", "VIP"] },
  { id: 4, name: "Dilfuza Normatova", phone: "+998943334455", channel: "Telegram", lastOrder: "2024-01-12", totalOrders: 8, sentiment: "salbiy", tags: ["shikoyat"] },
  { id: 5, name: "Otabek Mirzayev", phone: "+998905556677", channel: "WhatsApp", lastOrder: "2024-01-11", totalOrders: 15, sentiment: "ijobiy", tags: ["doimiy"] },
  { id: 6, name: "Madina Usmanova", phone: "+998917778899", channel: "Telegram", lastOrder: "2024-01-10", totalOrders: 3, sentiment: "neytral", tags: ["yangi"] },
  { id: 7, name: "Farhod Tursunov", phone: "+998939990011", channel: "Instagram", lastOrder: "2024-01-09", totalOrders: 19, sentiment: "ijobiy", tags: ["doimiy", "VIP"] },
  { id: 8, name: "Zilola Qosimova", phone: "+998942223344", channel: "WhatsApp", lastOrder: "2024-01-08", totalOrders: 7, sentiment: "salbiy", tags: ["shikoyat", "churn_xavfi"] },
];

export const conversations = [
  {
    id: 1,
    customer: "Aziz Yuldashev",
    channel: "Telegram" as const,
    lastMessage: "Assalomu alaykum, bugungi maxsus taom bormi?",
    time: "10:32",
    unread: 2,
    sentiment: "ijobiy" as const,
  },
  {
    id: 2,
    customer: "Gulnora Rahimova",
    channel: "WhatsApp" as const,
    lastMessage: "Buyurtmam qachon yetkaziladi?",
    time: "10:15",
    unread: 1,
    sentiment: "neytral" as const,
  },
  {
    id: 3,
    customer: "Dilfuza Normatova",
    channel: "Telegram" as const,
    lastMessage: "Xizmatdan umuman norozi bo'ldim! Menejer bilan gaplashmoqchiman.",
    time: "09:45",
    unread: 3,
    sentiment: "salbiy" as const,
  },
  {
    id: 4,
    customer: "Sherzod Kamolov",
    channel: "Instagram" as const,
    lastMessage: "Yangi menyu juda yoqdi, rahmat!",
    time: "09:30",
    unread: 0,
    sentiment: "ijobiy" as const,
  },
  {
    id: 5,
    customer: "Otabek Mirzayev",
    channel: "WhatsApp" as const,
    lastMessage: "Chegirma bormi bugun?",
    time: "09:10",
    unread: 1,
    sentiment: "neytral" as const,
  },
  {
    id: 6,
    customer: "Madina Usmanova",
    channel: "Telegram" as const,
    lastMessage: "Yangi filialingiz qayerda joylashgan?",
    time: "08:55",
    unread: 0,
    sentiment: "ijobiy" as const,
  },
];

export const chatMessages = [
  { id: 1, sender: "customer", text: "Assalomu alaykum! Bugungi maxsus taom bormi?", time: "10:30" },
  { id: 2, sender: "bot", text: "Va alaykum assalom! 😊 Ha, bugun maxsus taomimiz – Toshkent oshi va Somsa. Buyurtma bermoqchimisiz?", time: "10:30" },
  { id: 3, sender: "customer", text: "Ha, 2 porsiya osh va 4 ta somsa", time: "10:31" },
  { id: 4, sender: "bot", text: "Buyurtmangiz qabul qilindi! ✅\n\n2x Toshkent oshi – 50,000 so'm\n4x Somsa – 24,000 so'm\n\nJami: 74,000 so'm\n\nYetkazib berish vaqti: ~40 daqiqa. To'lov usulini tanlang: 💳 Click / 💵 Naqd", time: "10:32" },
];

export const weeklyRevenue = [
  { kun: "Dush", savdo: 2400000 },
  { kun: "Sesh", savdo: 1800000 },
  { kun: "Chor", savdo: 3200000 },
  { kun: "Pay", savdo: 2900000 },
  { kun: "Jum", savdo: 4100000 },
  { kun: "Shan", savdo: 5200000 },
  { kun: "Yak", savdo: 3800000 },
];

export const topProducts = [
  { nomi: "Toshkent oshi", miqdor: 156 },
  { nomi: "Somsa", miqdor: 243 },
  { nomi: "Shashlik", miqdor: 98 },
  { nomi: "Lag'mon", miqdor: 87 },
  { nomi: "Non", miqdor: 312 },
];

export const sentimentTrend = [
  { kun: "Dush", ijobiy: 85, neytral: 10, salbiy: 5 },
  { kun: "Sesh", ijobiy: 78, neytral: 15, salbiy: 7 },
  { kun: "Chor", ijobiy: 82, neytral: 12, salbiy: 6 },
  { kun: "Pay", ijobiy: 90, neytral: 7, salbiy: 3 },
  { kun: "Jum", ijobiy: 75, neytral: 14, salbiy: 11 },
  { kun: "Shan", ijobiy: 88, neytral: 8, salbiy: 4 },
  { kun: "Yak", ijobiy: 92, neytral: 5, salbiy: 3 },
];

export const aiRecommendations = [
  {
    id: 1,
    title: "Hafta oxiriga maxsus taklif",
    description: "Ma'lumotlarga ko'ra, shanba kuni savdo eng yuqori. Maxsus aksiya e'lon qiling!",
    type: "savdo" as const,
  },
  {
    id: 2,
    title: "Mijoz yo'qotish xavfi",
    description: "Dilfuza Normatova oxirgi 3 ta buyurtmadan norozi. Shaxsiy qo'ng'iroq qilishni tavsiya etamiz.",
    type: "xavf" as const,
  },
  {
    id: 3,
    title: "Mashhur mahsulot",
    description: "Somsa eng ko'p buyurtma qilinadigan mahsulot. Zaxirani ko'paytiring!",
    type: "mahsulot" as const,
  },
];

export const monitoringAlerts = [
  {
    id: 1,
    message: "3 ta mijoz navbat vaqtidan norozi – o'rtacha kutish 25 daqiqa",
    severity: "yuqori" as const,
    time: "10:15",
    suggestion: "Qo'shimcha xodim chaqiring yoki tezkor menyu taklif qiling",
  },
  {
    id: 2,
    message: "Instagram'da 2 ta salbiy izoh – xizmat sifati haqida",
    severity: "o'rta" as const,
    time: "09:30",
    suggestion: "Izohlarga javob bering va uzr so'rang",
  },
  {
    id: 3,
    message: "Telegram botda 5 ta javobsiz xabar – 15 daqiqadan ortiq",
    severity: "past" as const,
    time: "08:45",
    suggestion: "Bot sozlamalarini tekshiring yoki qo'lda javob bering",
  },
];

export const pricingPlans = [
  {
    name: "Bepul",
    price: "0",
    period: "Abadiy bepul",
    features: [
      "1 ta kanal (Telegram)",
      "100 ta suhbat/oy",
      "Asosiy CRM",
      "Kunlik hisobot",
      "1 ta foydalanuvchi",
    ],
    cta: "Boshlash",
    popular: false,
  },
  {
    name: "Premium",
    price: "149 000",
    period: "so'm/oy",
    features: [
      "Barcha kanallar (Telegram, WhatsApp, Instagram)",
      "Cheksiz suhbatlar",
      "To'liq CRM + AI tahlil",
      "Xizmat sifati monitoringi",
      "AI chatbot + Agent rejimi",
      "PDF hisobotlar",
      "5 ta foydalanuvchi",
      "Ustuvor yordam",
    ],
    cta: "Premium ga o'tish",
    popular: true,
  },
  {
    name: "Biznes",
    price: "349 000",
    period: "so'm/oy",
    features: [
      "Premium ning barcha imkoniyatlari",
      "Cheksiz foydalanuvchilar",
      "API kirish",
      "Shaxsiy AI model sozlamalari",
      "Buxgalteriya integratsiyasi",
      "24/7 yordam",
    ],
    cta: "Bog'lanish",
    popular: false,
  },
];

export const testimonials = [
  {
    name: "Anvar Karimov",
    business: "Choyxona Baraka",
    text: "HamkorAI tufayli mijozlarimiz soni 40% ga oshdi. Telegram bot avtomatik buyurtma qabul qiladi, men esa taom tayyorlashga e'tibor beraman.",
    avatar: "AK",
  },
  {
    name: "Nodira Saidova",
    business: "Tezkor Yetkazib Berish",
    text: "Oldin har bir mijozga alohida javob yozardim. Endi AI chatbot barchasini hal qiladi. Vaqtim 3 baravar tejaldi!",
    avatar: "NS",
  },
  {
    name: "Jasur Alimov",
    business: "Sartaroshxonam",
    text: "Xizmat sifati monitoringi juda foydali. Norozi mijozlarni darhol ko'raman va muammoni tezda hal qilaman.",
    avatar: "JA",
  },
];
