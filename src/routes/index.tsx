import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Launchpad — Ship your idea this week" },
      {
        name: "description",
        content:
          "A simple landing page template you can adapt into a WordPress theme. Fast, clean, and conversion focused.",
      },
      { property: "og:title", content: "Launchpad — Ship your idea this week" },
      {
        property: "og:description",
        content:
          "A simple landing page template you can adapt into a WordPress theme.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            Launchpad
          </Link>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </div>
          <Button size="sm">Get started</Button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            New — v1.0 is here
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Ship your idea this week, not next quarter.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            A clean, fast landing page foundation you can customize today and
            port into a WordPress theme tomorrow.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="gap-2">
              Start building <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View demo
            </Button>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Everything you need to launch
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
              Thoughtful defaults so you can focus on your message, not the markup.
            </p>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: "Blazing fast",
                  desc: "Minimal, semantic markup that loads instantly on any device.",
                },
                {
                  icon: Shield,
                  title: "Built to convert",
                  desc: "Clear hierarchy, focused CTAs, and friction-free flows.",
                },
                {
                  icon: Sparkles,
                  title: "Easy to theme",
                  desc: "Semantic design tokens make rebranding a five-minute job.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-card p-6 text-card-foreground"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="pricing" className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Ready when you are.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Start free. Upgrade whenever you outgrow it.
          </p>
          <div className="mt-8">
            <Button size="lg" className="gap-2">
              Get started free <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Launchpad. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
