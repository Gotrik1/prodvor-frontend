import { SidebarTrigger } from "@/shared/ui/sidebar";
import { Search, ShoppingCart, Bell } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Поиск..." className="pl-9" />
          <kbd className="absolute top-1/2 -translate-y-1/2 right-3 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 hidden sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/store"><ShoppingCart /></Link>
        </Button>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <ThemeToggle />
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <AvatarFallback>G</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
