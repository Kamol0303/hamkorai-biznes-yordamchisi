// Soliq va Hisobot moduli uchun mock ma'lumotlar

export interface Employee {
  id: number;
  ism: string;
  lavozim: string;
  oylik: number;
  holat: "aktiv" | "noaktiv";
  ishgaKirganSana: string;
  innRaqam: string;
}

export interface TaxConfig {
  soliqFoizi: number;
  ijtimoiySoliqFoizi: number;
  qoshilganQiymatSoliqi: number;
  xodimlarLimiti: number;
  daromadDeklaratsiyaLimiti: number;
  hisobotMuddati: string;
}

export interface MonthlyReport {
  oy: string;
  tushum: number;
  xarajat: number;
  sofFoyda: number;
  soliqMiqdori: number;
  holat: "topshirilgan" | "tayyorlanmoqda" | "topshirilmagan";
}

export interface ComplianceAlert {
  id: number;
  xabar: string;
  daraja: "yuqori" | "o'rta" | "past";
  sana: string;
  tavsiya: string;
  kategoriya: "xodim" | "daromad" | "muddat" | "qonun";
}

export const employees: Employee[] = [
  { id: 1, ism: "Anvar Karimov", lavozim: "Direktor", oylik: 5000000, holat: "aktiv", ishgaKirganSana: "2022-03-15", innRaqam: "301234567" },
  { id: 2, ism: "Shahlo Toshmatova", lavozim: "Bosh oshpaz", oylik: 4000000, holat: "aktiv", ishgaKirganSana: "2022-05-01", innRaqam: "302345678" },
  { id: 3, ism: "Bekzod Raxmatov", lavozim: "Ofitsiant", oylik: 2500000, holat: "aktiv", ishgaKirganSana: "2023-01-10", innRaqam: "303456789" },
  { id: 4, ism: "Malika Xasanova", lavozim: "Kassir", oylik: 2800000, holat: "aktiv", ishgaKirganSana: "2023-03-20", innRaqam: "304567890" },
  { id: 5, ism: "Sardor Ergashev", lavozim: "Yordamchi oshpaz", oylik: 3000000, holat: "aktiv", ishgaKirganSana: "2023-06-15", innRaqam: "305678901" },
  { id: 6, ism: "Zulfiya Abdullayeva", lavozim: "Tozalovchi", oylik: 2000000, holat: "noaktiv", ishgaKirganSana: "2023-08-01", innRaqam: "306789012" },
  { id: 7, ism: "Rustam Qodirov", lavozim: "Yetkazib beruvchi", oylik: 3200000, holat: "aktiv", ishgaKirganSana: "2023-09-10", innRaqam: "307890123" },
  { id: 8, ism: "Nodira Saidova", lavozim: "Hisobchi", oylik: 4500000, holat: "aktiv", ishgaKirganSana: "2022-11-01", innRaqam: "308901234" },
];

export const taxConfig: TaxConfig = {
  soliqFoizi: 12,
  ijtimoiySoliqFoizi: 12,
  qoshilganQiymatSoliqi: 12,
  xodimlarLimiti: 25,
  daromadDeklaratsiyaLimiti: 100000000,
  hisobotMuddati: "2024-04-15",
};

export const monthlyReports: MonthlyReport[] = [
  { oy: "Yanvar", tushum: 45000000, xarajat: 28000000, sofFoyda: 17000000, soliqMiqdori: 2040000, holat: "topshirilgan" },
  { oy: "Fevral", tushum: 42000000, xarajat: 26000000, sofFoyda: 16000000, soliqMiqdori: 1920000, holat: "topshirilgan" },
  { oy: "Mart", tushum: 51000000, xarajat: 30000000, sofFoyda: 21000000, soliqMiqdori: 2520000, holat: "topshirilgan" },
  { oy: "Aprel", tushum: 48000000, xarajat: 29000000, sofFoyda: 19000000, soliqMiqdori: 2280000, holat: "tayyorlanmoqda" },
  { oy: "May", tushum: 55000000, xarajat: 32000000, sofFoyda: 23000000, soliqMiqdori: 2760000, holat: "topshirilmagan" },
  { oy: "Iyun", tushum: 60000000, xarajat: 35000000, sofFoyda: 25000000, soliqMiqdori: 3000000, holat: "topshirilmagan" },
];

export const complianceAlerts: ComplianceAlert[] = [
  {
    id: 1,
    xabar: "Soliq hisobot topshirish muddati yaqinlashmoqda",
    daraja: "yuqori",
    sana: "2024-04-10",
    tavsiya: "Aprel oyi hisobotini 15-sanagacha topshiring",
    kategoriya: "muddat",
  },
  {
    id: 2,
    xabar: "Xodimlar soni soliq kategoriyasini o'zgartirishi mumkin",
    daraja: "o'rta",
    sana: "2024-04-08",
    tavsiya: "7 ta aktiv xodim mavjud. 25 tadan oshsa, katta korxona sifatida soliq to'lanadi",
    kategoriya: "xodim",
  },
  {
    id: 3,
    xabar: "Daromad o'sishi sababli yangi soliq toifasi talab qilinishi mumkin",
    daraja: "o'rta",
    sana: "2024-04-05",
    tavsiya: "Yillik daromad 100 mln so'mdan oshsa, QQS to'lovchisi bo'lishingiz kerak",
    kategoriya: "daromad",
  },
  {
    id: 4,
    xabar: "Daromad deklaratsiyasi talab qilinadi",
    daraja: "yuqori",
    sana: "2024-04-01",
    tavsiya: "Choraklik daromad deklaratsiyasini soliq inspeksiyasiga taqdim eting",
    kategoriya: "qonun",
  },
];

export const yearlyRevenueTrend = [
  { oy: "Yan", tushum: 45000000, xarajat: 28000000 },
  { oy: "Fev", tushum: 42000000, xarajat: 26000000 },
  { oy: "Mar", tushum: 51000000, xarajat: 30000000 },
  { oy: "Apr", tushum: 48000000, xarajat: 29000000 },
  { oy: "May", tushum: 55000000, xarajat: 32000000 },
  { oy: "Iyn", tushum: 60000000, xarajat: 35000000 },
];

// API-ready endpoint structures
export const taxApiEndpoints = {
  employees: "/api/v1/tax/employees",
  revenue: "/api/v1/tax/revenue",
  tax_report: "/api/v1/tax/report",
  compliance_status: "/api/v1/tax/compliance",
};
