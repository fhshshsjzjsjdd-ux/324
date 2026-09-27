import { Cta } from "@/components/cta";
import { Entry } from "@/components/entry";
import { Faq } from "@/components/faq";
import { SiteFooter } from "@/components/footer";
import { Hero } from "@/components/hero";
import { DesktopNav, MobileFooterNav, MobileTopNav } from "@/components/nav";
import { Pricing } from "@/components/pricing";
import { ScrollDot } from "@/components/scroll-dot";
import { TwoUp } from "@/components/shot";
import { CatalogShot } from "@/components/shots/catalog-shot";
import { CodeShot } from "@/components/shots/code-shot";
import { DashboardShot } from "@/components/shots/dashboard-shot";
import { FallbackShot } from "@/components/shots/fallback-shot";
import { MaskingShot, PrivacySettingsShot } from "@/components/shots/privacy-shots";
import { RequestShot } from "@/components/shots/request-shot";
import { SavingsShot } from "@/components/shots/savings-shot";
import { Stats } from "@/components/stats";
import { entries } from "@/content/site";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col py-1 tracking-tight md:px-2">
      <MobileTopNav />
      <div className="w-full flex-1 text-lg">
        <div className="grid grid-cols-12 px-7">
          <div className="col-span-11 max-w-5xl pb-5 leading-relaxed md:col-span-9 lg:col-span-7">
            <Hero />
            <Stats />

            <Entry {...entries.compat}>
              <CodeShot />
            </Entry>
            <Entry {...entries.models}>
              <CatalogShot />
            </Entry>
            <Entry {...entries.reliability}>
              <TwoUp>
                <FallbackShot />
                <RequestShot />
              </TwoUp>
            </Entry>
            <Entry {...entries.savings}>
              <SavingsShot />
            </Entry>
            <Entry {...entries.control}>
              <DashboardShot />
            </Entry>
            <Entry {...entries.security}>
              <TwoUp>
                <MaskingShot />
                <PrivacySettingsShot />
              </TwoUp>
            </Entry>
            <Entry {...entries.pricing}>
              <Pricing />
            </Entry>
            <Entry {...entries.faq}>
              <Faq />
            </Entry>
            <Entry {...entries.start}>
              <Cta note={false} />
            </Entry>

            <SiteFooter />
          </div>
        </div>
      </div>
      <DesktopNav />
      <MobileFooterNav />
      <ScrollDot />
    </main>
  );
}
