
import { Logo } from "@/views/auth/ui";
import Link from "next/link";

export function DashboardFooter() {
  return (
    <footer className="p-4 border-t border-layout-border text-muted-foreground">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 text-center md:text-left">
        <div className="flex items-center gap-2">
          <Logo />
          <div>
            <p className="font-bold text-xs">© 2025 ProDvor.</p>
            <p className="text-xs">Все права защищены.</p>
            <p className="text-xs">Версия 1.0.0 (Прототип)</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-8">
          <div>
            <h4 className="font-bold mb-2 text-foreground text-xs">Навигация</h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/teams" className="hover:text-primary">
                  Команды
                </Link>
              </li>
              <li>
                <Link href="/competitions" className="hover:text-primary">
                  Соревнования
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-primary">
                  Поддержка
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-foreground text-xs">Информация</h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/about" className="hover:text-primary">
                  О проекте
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Условия использования
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
