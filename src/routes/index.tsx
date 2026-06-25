import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Heart, Instagram, Search, ShoppingBag, User } from "lucide-react";
import logoAsset from "@/assets/marry-miele-logo.png.asset.json";
import heroAtemporal from "@/assets/hero-atemporal.jpg";
import collectionSignature from "@/assets/collection-signature.jpg";
import collectionTailoring from "@/assets/collection-tailoring.jpg";
import sigBag from "@/assets/sig-bag.jpg";
import sigJewelry from "@/assets/sig-jewelry.jpg";
import curatedSilhouettes from "@/assets/curated-silhouettes.jpg";
import curatedEssentials from "@/assets/curated-essentials.jpg";
import curatedRepeat from "@/assets/curated-repeat.jpg";
import curatedFavorites from "@/assets/curated-favorites.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import highlightBanner from "@/assets/highlight-banner.jpeg.asset.json";
import lookbookLight from "@/assets/lookbook-light.jpeg.asset.json";
import whatsappEstiloEscolha from "@/assets/whatsapp-estilo-escolha.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marry Miele Boutique — Elegância Atemporal" },
      {
        name: "description",
        content:
          "Marry Miele Boutique: roupas elegantes, sofisticadas e atemporais para revelar a melhor versão de cada mulher.",
      },
      { property: "og:title", content: "Marry Miele Boutique — Elegância Atemporal" },
      {
        property: "og:description",
        content:
          "Peças com presença, refinamento e autenticidade. Uma curadoria assinada por Marry Miele.",
      },
    ],
  }),
  component: Index,
});

const NAV: { label: string; href: string; sub?: { label: string; href: string }[] }[] = [
  {
    label: "Roupas",
    href: "#colecao",
    sub: [
      { label: "Conjuntos", href: "#colecao" },
      { label: "Vestidos e Macacões", href: "#colecao" },
      { label: "Blusas", href: "#colecao" },
      { label: "Calças", href: "#colecao" },
      { label: "Saias e Shorts", href: "#colecao" },
    ],
  },
  { label: "Casacos", href: "#colecao" },
  { label: "Acessórios", href: "#curated" },
  { label: "Novidades", href: "#look" },
  { label: "Outlet", href: "#look" },
  { label: "Sobre", href: "#historia" },
];

const SIGNATURE = [
  { img: collectionSignature, name: "Vestido Atemporal", code: "MM·504" },
  { img: collectionTailoring, name: "Alfaiataria Camel", code: "MM·512" },
  { img: sigBag, name: "Bolsa Couro Noir", code: "MM·087" },
  { img: sigJewelry, name: "Joias Essenciais", code: "MM·219" },
];

const CURATED = [
  { img: curatedSilhouettes, title: "Silhuetas", kicker: "Editorial" },
  { img: curatedEssentials, title: "Essenciais", kicker: "Capsule" },
  { img: curatedRepeat, title: "Wear on Repeat", kicker: "Atemporal" },
  { img: curatedFavorites, title: "Favoritos", kicker: "Curadoria" },
];

const LOOK = [
  { name: "Vestido Catena Midi", price: "R$ 689", img: product1 },
  { name: "Blusa Laço Seda Cru", price: "R$ 459", img: product2 },
  { name: "Casaco Camel Atemporal", price: "R$ 1.290", img: product3 },
  { name: "Macacão Noir Dourado", price: "R$ 879", img: product4 },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header />
      <Hero />
      <SignatureCollections />
      <EditorialBreak />
      <CuratedForYou />
      <CompleteTheLook />
      <Story />
      <ConsultoriaCTA />
      <Manifesto />
      <Footer />
    </div>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        let best: string | null = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      {
        rootMargin: "-160px 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join("|")]);
  return active;
}

function AnnouncementBar() {
  return (
    <div className="bg-chocolate-deep border-b border-border/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[10px] uppercase tracking-luxe text-muted-foreground sm:text-[11px]">
        <span className="hidden sm:inline">Frete cortesia acima de R$ 600</span>
        <span className="text-gold">Novos arrivals · Coleção Atemporal 2026</span>
        <span className="hidden sm:inline">Atendimento VIP · WhatsApp</span>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const activeId = useActiveSection(["colecao", "curated", "look", "historia"]);
  const close = () => {
    setOpen(false);
    setOpenSub(null);
  };
  const isActive = (href: string) => href === `#${activeId}`;
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/90 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-foreground/80 lg:hidden"
        >
          <span className="block h-px w-6 bg-current" />
          <span className="mt-1.5 block h-px w-6 bg-current" />
          <span className="mt-1.5 block h-px w-4 bg-current" />
        </button>

        <a href="#" className="justify-self-center">
          <img
            src={logoAsset.url}
            alt="Marry Miele Boutique"
            width={140}
            height={130}
            className="h-16 w-auto sm:h-20"
          />
        </a>

        <div className="flex items-center justify-end gap-4 text-foreground/80 sm:gap-5">
          <Search className="h-4 w-4 cursor-pointer transition-colors hover:text-gold" />
          <User className="hidden h-4 w-4 cursor-pointer transition-colors hover:text-gold sm:block" />
          <Heart className="hidden h-4 w-4 cursor-pointer transition-colors hover:text-gold sm:block" />
          <button className="relative flex items-center gap-2 text-[11px] uppercase tracking-luxe transition-colors hover:text-gold">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Sacola</span>
            <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-gold text-[9px] font-semibold text-primary-foreground">
              2
            </span>
          </button>
        </div>
      </div>

      <nav className="hidden border-t border-border/40 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-10 px-6 py-3">
          {NAV.map((item) => (
            <div key={item.label} className="group relative">
              <a
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative flex items-center gap-1 py-1 text-[11px] font-medium uppercase tracking-luxe transition-colors hover:text-gold ${
                  isActive(item.href) ? "text-gold" : "text-foreground/80"
                }`}
              >
                {item.label}
                {item.sub && <ChevronDown className="h-3 w-3" />}
                <span
                  className={`pointer-events-none absolute -bottom-[13px] left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-300 ${
                    isActive(item.href) ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </a>
              {item.sub && (
                <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 border border-border/60 bg-card/95 py-3 opacity-0 shadow-luxe backdrop-blur-md transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  {item.sub.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="block px-5 py-2 text-[11px] uppercase tracking-luxe text-foreground/75 transition-colors hover:bg-secondary hover:text-gold"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/50 lg:hidden">
          <nav className="flex flex-col px-4 py-2">
            {NAV.map((i) => {
              const expanded = openSub === i.label;
              const active = isActive(i.href);
              return (
                <div key={i.label} className="border-b border-border/30 last:border-0">
                  <div className="flex items-center justify-between">
                    <a
                      href={i.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`flex-1 border-l-2 py-3 pl-3 text-[12px] uppercase tracking-luxe transition-colors hover:text-gold ${
                        active ? "border-gold text-gold" : "border-transparent text-foreground/80"
                      }`}
                    >
                      {i.label}
                    </a>
                    {i.sub && (
                      <button
                        aria-label={`Expandir ${i.label}`}
                        aria-expanded={expanded}
                        onClick={() => setOpenSub(expanded ? null : i.label)}
                        className="grid h-10 w-10 place-items-center text-foreground/70 transition-colors hover:text-gold"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>
                  {i.sub && expanded && (
                    <div className="flex flex-col pb-2 pl-3">
                      {i.sub.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          onClick={close}
                          className="py-2 text-[11px] uppercase tracking-luxe text-foreground/65 transition-colors hover:text-gold"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[80vh] min-h-[600px] w-full">
        <img
          src={lookbookLight.url}
          alt="Coleção Atemporal — Marry Miele Boutique"
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/15 to-background/70" />
        <div className="shimmer-glow" />
        <div className="shimmer-overlay" />

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <span className="text-[11px] uppercase tracking-luxe text-gold/90">
            · · · Coleção 2026 · · ·
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] text-pearl drop-shadow-lg sm:text-7xl lg:text-8xl">
            Coleção <em className="not-italic text-gold">Atemporal</em>
          </h1>
          <p className="mt-6 max-w-xl text-sm text-pearl/85 sm:text-base">
            Uma curadoria assinada para a mulher contemporânea — peças que carregam presença,
            refinamento e a essência única de cada silhueta.
          </p>
          <a
            href="#colecao"
            className="group mt-10 inline-flex items-center gap-3 border border-gold bg-gold/95 px-9 py-3.5 text-[11px] uppercase tracking-luxe text-primary-foreground transition-all hover:bg-transparent hover:text-gold"
          >
            Explorar a coleção
            <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
          </a>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-luxe text-pearl/70">
          · · · · · ·
        </div>
      </div>
    </section>
  );
}

function SignatureCollections() {
  return (
    <section id="colecao" className="border-t border-gold/15 bg-transparent py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="text-[10px] uppercase tracking-luxe text-gold/80">· · · · · ·</span>
          <h2 className="mt-4 font-display text-4xl text-pearl sm:text-5xl">Signature Collections</h2>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground">
            Quatro pilares atemporais para compor um guarda-roupa de presença e propósito.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {SIGNATURE.map((c) => (
            <a
              key={c.name}
              href="#"
              className="group block border border-border/40 bg-card/40 p-3 transition-colors hover:border-gold/50"
            >
              <div className="overflow-hidden bg-background">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  width={896}
                  height={1120}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="px-1 pt-4 pb-2 text-center">
                <h3 className="font-display text-lg text-pearl">{c.name}</h3>
                <p className="mt-1 text-[10px] uppercase tracking-luxe text-gold/80">{c.code}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialBreak() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[460px] w-full sm:h-[560px]">
        <img
          src={highlightBanner.url}
          alt="Destaques — Você está pronta para assumir seu poder?"
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-chocolate-deep/55" />
        <div className="shimmer-glow" />
        <div className="shimmer-overlay" />
        <button
          aria-label="Anterior"
          className="absolute left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center border border-pearl/30 text-pearl/80 transition-colors hover:border-gold hover:text-gold sm:left-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          aria-label="Próximo"
          className="absolute right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center border border-pearl/30 text-pearl/80 transition-colors hover:border-gold hover:text-gold sm:right-8"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-4 text-center">
          <p className="font-script text-3xl text-gold">~ Editor's Pick ~</p>
          <h2 className="mt-4 font-display text-3xl italic leading-tight text-pearl sm:text-5xl">
            "Elegância não é seguir padrões, é revelar a melhor versão de si."
          </h2>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-3 bg-gold px-7 py-3 text-[11px] uppercase tracking-luxe text-primary-foreground transition-all hover:bg-gold-light"
          >
            Shop the Look
          </a>
        </div>
      </div>
    </section>
  );
}

function CuratedForYou() {
  return (
    <section id="curated" className="bg-transparent py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-[10px] uppercase tracking-luxe text-gold/80">Lifestyle</span>
          <h2 className="mt-3 font-display text-4xl text-pearl sm:text-5xl">Curated for You</h2>
        </div>

        <div className="relative">
          <button
            aria-label="Anterior"
            className="absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center border border-pearl/20 text-pearl/70 transition-colors hover:border-gold hover:text-gold sm:grid"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Próximo"
            className="absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center border border-pearl/20 text-pearl/70 transition-colors hover:border-gold hover:text-gold sm:grid"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CURATED.map((c) => (
              <a
                key={c.title}
                href="#"
                className="group relative block aspect-[16/10] overflow-hidden border border-border/40"
              >
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-chocolate-deep/10 via-chocolate-deep/40 to-chocolate-deep/85" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-[10px] uppercase tracking-luxe text-gold/80">{c.kicker}</span>
                  <h3 className="mt-2 font-display text-3xl text-pearl sm:text-4xl">{c.title}</h3>
                  <span className="mt-5 inline-flex border border-pearl/50 px-5 py-2 text-[10px] uppercase tracking-luxe text-pearl transition-colors group-hover:border-gold group-hover:text-gold">
                    Explorar
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CompleteTheLook() {
  return (
    <section id="look" className="border-t border-gold/15 bg-transparent py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-[10px] uppercase tracking-luxe text-gold/80">Category Highlights</span>
          <h2 className="mt-3 font-display text-4xl text-pearl sm:text-5xl">Complete the Look</h2>
        </div>

        <div className="relative">
          <button
            aria-label="Anterior"
            className="absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center border border-pearl/20 text-pearl/70 transition-colors hover:border-gold hover:text-gold sm:grid"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Próximo"
            className="absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center border border-pearl/20 text-pearl/70 transition-colors hover:border-gold hover:text-gold sm:grid"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {LOOK.map((p) => (
              <a key={p.name} href="#" className="group block border border-border/40 bg-card/30 p-3">
                <div className="relative overflow-hidden bg-background">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={800}
                    height={1024}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    aria-label="Favoritar"
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-background/80 text-foreground/80 backdrop-blur-sm transition-colors hover:text-gold"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="px-1 pt-4 pb-2 text-center">
                  <h3 className="truncate font-display text-base text-pearl">{p.name}</h3>
                  <p className="mt-1 text-[11px] text-gold">{p.price}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="historia" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <img
            src={collectionTailoring}
            alt="Marry Miele Boutique"
            loading="lazy"
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute -bottom-6 -right-6 hidden border border-gold/40 bg-background p-6 lg:block">
            <p className="font-script text-3xl text-gold">desde 2026</p>
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-luxe text-gold">Nossa história</p>
          <h2 className="mt-3 font-display text-4xl text-pearl sm:text-5xl">
            Mais do que moda, <em className="not-italic text-gold">um estilo de vida.</em>
          </h2>
          <div className="hairline my-8 w-24" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Marry Miele é consultora de imagem, moda e estilo, formada pelo Centro Universitário Belas Artes
            de São Paulo e membro da AICI — a mais renomada associação internacional de consultores de imagem.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Com formações nacionais e internacionais e experiências em mais de 34 países, Marry une
            estratégia, estética e comportamento para ajudar mulheres a construírem uma imagem com presença,
            autenticidade e intenção.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Em julho de 2026, nasceu a Marry Miele Boutique: roupas elegantes, sofisticadas e atemporais,
            capazes de valorizar a essência e a identidade única de cada mulher.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-3 border border-gold px-7 py-3.5 text-[11px] uppercase tracking-luxe text-gold transition-all hover:bg-gold hover:text-primary-foreground"
          >
            Conhecer Marry
            <span className="h-px w-6 bg-current" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ConsultoriaCTA() {
  return (
    <section className="border-y border-gold/30 bg-transparent">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_auto_1fr] lg:py-20">
        <div>
          <p className="font-script text-3xl text-gold">Está com dúvidas?</p>
          <h3 className="mt-3 font-display text-3xl text-pearl sm:text-4xl">
            Agende uma consultoria de imagem e estilo.
          </h3>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Descubra peças, combinações e silhuetas pensadas para a sua essência. Atendimento personalizado
            assinado por Marry Miele.
          </p>
        </div>
        <div className="hidden h-32 w-px bg-gold/40 lg:block" />
        <div className="flex flex-col gap-3">
          <a
            href="https://www.estilomiele.com.br"
            className="inline-flex items-center justify-center gap-3 bg-gold px-7 py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-all hover:bg-gold-light"
          >
            estilomiele.com.br
          </a>
          <a
            href="https://instagram.com/marrymiele"
            className="inline-flex items-center justify-center gap-3 border border-gold/60 px-7 py-4 text-[11px] uppercase tracking-luxe text-gold transition-all hover:bg-gold/10"
          >
            <Instagram className="h-4 w-4" />
            @marrymiele
          </a>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={whatsappEstiloEscolha.url}
        alt="Estilo é escolha. Confiança é tudo. Uma mulher empoderada não precisa abrir a boca para dizer nada."
        className="block h-auto w-full"
        loading="lazy"
      />
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-chocolate-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2">
            <p className="font-display text-3xl text-gold">Marry Miele</p>
            <p className="mt-1 text-[10px] uppercase tracking-luxe text-muted-foreground">Boutique</p>
            <p className="mt-6 max-w-sm text-sm text-muted-foreground">
              Elegância, sofisticação e atemporalidade para mulheres que vestem presença e autenticidade.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com/marrymiele"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterCol
            title="Loja"
            items={["Novidades", "Vestidos", "Conjuntos", "Alfaiataria", "Outlet"]}
          />
          <FooterCol
            title="Atendimento"
            items={["Contato", "Trocas e devoluções", "Guia de tamanhos", "WhatsApp VIP"]}
          />
        </div>

        <div className="hairline mt-14" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-[10px] uppercase tracking-luxe text-muted-foreground sm:flex-row">
          <p>© 2026 Marry Miele Boutique · Todos os direitos reservados</p>
          <p>marrymiele.com.br</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-luxe text-gold">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-gold">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
