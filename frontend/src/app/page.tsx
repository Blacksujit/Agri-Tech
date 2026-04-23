import { AnimatedButton } from '@/components/motion/AnimatedButton';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-amber-50">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-green-600" />
            <span className="text-xl font-semibold">ArogyaKrishi</span>
          </div>
          <div className="flex items-center gap-3">
            <AnimatedButton asChild variant="outline" className="bg-white/70 backdrop-blur">
              <a href="/login">Login</a>
            </AnimatedButton>
            <AnimatedButton asChild glow className="bg-green-600 text-white hover:bg-green-700">
              <a href="/signup">Sign up</a>
            </AnimatedButton>
          </div>
        </header>

        <section className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              AI tools for farmers.
              <span className="block text-green-700">Simple. Fast. भरोसेमंद.</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Detect crop diseases, analyze soil, and get fertilizer recommendations — built for
              real farm workflows with a clean, mobile-first experience.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <AnimatedButton asChild size="lg" glow className="bg-green-600 text-white hover:bg-green-700">
                <a href="/signup">Get started</a>
              </AnimatedButton>
              <AnimatedButton asChild size="lg" variant="outline" className="bg-white/70 backdrop-blur">
                <a href="/login">I already have an account</a>
              </AnimatedButton>
            </div>
          </div>

          <div className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border bg-white p-4">
                <p className="text-sm font-semibold">Disease Detection</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Upload leaf photo. Get disease + confidence.
                </p>
              </div>
              <div className="rounded-xl border bg-white p-4">
                <p className="text-sm font-semibold">Soil Analysis</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Upload soil image. Get soil type + suggestions.
                </p>
              </div>
              <div className="rounded-xl border bg-white p-4">
                <p className="text-sm font-semibold">Fertilizer Advice</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enter NPK + crop. Get actionable recommendation.
                </p>
              </div>
              <div className="rounded-xl border bg-white p-4">
                <p className="text-sm font-semibold">History</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Track past predictions and learn over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 border-t pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} ArogyaKrishi
        </footer>
      </div>
    </main>
  );
}
