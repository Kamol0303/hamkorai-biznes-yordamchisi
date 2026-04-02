import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Bot, Home, Users, MessageSquare, Activity, BarChart3, Settings, Menu, X, ChevronDown, Globe, Bell, Crown, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Bosh sahifa" },
  { to: "/dashboard/mijozlar", icon: Users, label: "Mijozlar" },
  { to: "/dashboard/suhbatlar", icon: MessageSquare, label: "Suhbatlar", badge: 6 },
  { to: "/dashboard/monitoring", icon: Activity, label: "Monitoring" },
  { to: "/dashboard/tahlillar", icon: BarChart3, label: "Tahlillar" },
  { to: "/dashboard/sozlamalar", icon: Settings, label: "Sozlamalar" },
];

export default function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-sidebar-foreground">HamkorAI</span>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.to)
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
            {item.badge && (
              <Badge variant="destructive" className="ml-auto text-xs px-1.5 py-0.5 h-5">{item.badge}</Badge>
            )}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <Link to="/dashboard/sozlamalar" onClick={() => setSidebarOpen(false)}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
            <Crown className="w-4 h-4 text-warning" />
            <div className="flex-1">
              <p className="text-xs font-medium text-sidebar-foreground">Bepul tarif</p>
              <p className="text-xs text-muted-foreground">Premium ga o'ting</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-sidebar-border bg-sidebar flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 bg-sidebar z-10 shadow-xl">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-sidebar-foreground">
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-sm font-semibold text-foreground hidden sm:block">Choyxona Baraka</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Globe className="w-4 h-4" /> <span className="hidden sm:inline">O'zbek</span> <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>🇺🇿 O'zbek</DropdownMenuItem>
                <DropdownMenuItem>🇷🇺 Русский</DropdownMenuItem>
                <DropdownMenuItem>🇬🇧 English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              AK
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
