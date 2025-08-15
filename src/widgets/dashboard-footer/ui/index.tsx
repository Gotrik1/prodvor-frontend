import Link from "next/link";
import Image from "next/image";

const Logo = () => (
    <div className="flex items-center gap-2 font-bold text-xl">
        <Link href="/" className="flex items-center gap-2">
            <Image src="https://placehold.co/64x64.png" alt="ProDvor Logo" width={40} height={40} className="object-contain" data-ai-hint="logo" />
        </Link>
    </div>
);


export function DashboardFooter() {
  return (
    <footer className="p-4 border-t text-sm text-muted-foreground">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Logo />
          <div>
            <p className="font-bold">© 2025 ProDvor.</p>
            <p>Все права защищены.</p>
            <p>Версия 1.0.0 (Прототип)</p>
          </div>
        </div>
        <div className="flex gap-8">
          <div>
            <h4 className="font-bold mb-2 text-foreground">Навигация</h4>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="hover:text-primary">
                  Команды
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Соревнования
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Поддержка
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-foreground">Информация</h4>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="hover:text-primary">
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
