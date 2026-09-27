import type { ReactNode } from "react";
import { Shot } from "@/components/shot";

function Pii({ children }: { children: ReactNode }) {
  return <mark className="whitespace-nowrap rounded-[0.25em] bg-[#ffd4d6] px-[0.2em] text-[#a3242a]">{children}</mark>;
}

function Masked({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-[0.3em] bg-black px-[0.35em] py-[0.05em] font-mono text-[0.88em] tracking-normal text-white">
      {children}
    </span>
  );
}

function Bubble({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-black/[0.07] bg-white px-4 py-3 shadow-[0_0.75em_2em_-1em_rgba(120,30,40,0.25)]">
      <p className="text-2xs text-black/45">{title}</p>
      <p className="mt-1 text-xs leading-relaxed">{children}</p>
    </div>
  );
}

export function MaskingShot() {
  return (
    <Shot
      tone="rose"
      size="half"
      className="xl:aspect-[4/3]"
      label="Маскирование персональных данных: имя, телефон и почта заменяются метками до отправки провайдеру"
    >
      <div className="flex h-full items-center justify-center p-6">
        <div className="w-full max-w-[25em] space-y-2">
          <Bubble title="Написал пользователь">
            Здравствуйте! Меня зовут <Pii>Анна Смирнова</Pii>, телефон <Pii>+7 916 555-01-23</Pii>, почта{" "}
            <Pii>anna@example.com</Pii>. Хочу вернуть заказ №48213.
          </Bubble>
          <div className="flex items-center gap-2 px-3 text-2xs text-black/50">
            <span className="h-px flex-1 bg-black/10" />
            ↓ скрыли 3 поля
            <span className="h-px flex-1 bg-black/10" />
          </div>
          <Bubble title="Получил провайдер">
            Здравствуйте! Меня зовут <Masked>ИМЯ_1</Masked>, телефон <Masked>ТЕЛЕФОН_1</Masked>, почта{" "}
            <Masked>EMAIL_1</Masked>. Хочу вернуть заказ №48213.
          </Bubble>
        </div>
      </div>
    </Shot>
  );
}

const SETTINGS = [
  { label: "Маскировать персональные данные", hint: "имена, телефоны, почта, карты", on: true },
  { label: "Сохранять тексты запросов", hint: "в логах останутся только метаданные", on: false },
  { label: "Провайдеры без хранения данных", hint: "zero data retention", on: true },
  { label: "Аудит-лог действий", hint: "кто, что и когда менял", on: true },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`relative h-5 w-9 shrink-0 rounded-full ${on ? "bg-black" : "bg-black/15"}`}>
      <span className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm ${on ? "left-4.5" : "left-0.5"}`} />
    </span>
  );
}

export function PrivacySettingsShot() {
  return (
    <Shot
      tone="stone"
      size="half"
      className="xl:aspect-[4/3]"
      label="Настройки приватности проекта: маскирование данных, отключённое хранение запросов, аудит-лог"
    >
      <div className="flex h-full items-center justify-center p-6">
        <div className="w-full max-w-[25em] overflow-hidden rounded-xl border border-black/[0.07] bg-white shadow-[0_1em_2em_-1em_rgba(0,0,0,0.25)]">
          <div className="border-b border-black/[0.06] px-4 py-3">
            <p className="text-sm font-semibold">Приватность</p>
            <p className="text-2xs text-black/45">Проект · prod-chat</p>
          </div>
          <ul className="divide-y divide-black/[0.06]">
            {SETTINGS.map((setting) => (
              <li key={setting.label} className="flex items-center justify-between gap-4 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="text-xs font-medium">{setting.label}</p>
                  <p className="text-2xs text-black/45">{setting.hint}</p>
                </div>
                <Toggle on={setting.on} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Shot>
  );
}
