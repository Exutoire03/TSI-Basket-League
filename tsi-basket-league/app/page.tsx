import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-16">
      {/* 1. Hero */}
      <section className="relative overflow-hidden rounded-none">
        <div className="absolute inset-0 -z-10">
          <Image src="/hero1.png" alt="TSI Basket League" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-white/70" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary">
              Bienvenue dans la TSI Basket League
            </h1>
            <p className="mt-3 text-lg text-text-secondary">L’élite du basketball africain</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/matchs" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-text-primary hover:bg-hover border border-border">
                Voir les matchs
              </Link>
              <Link href="/equipes" className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-text-primary hover:bg-hover">
                Découvrir les équipes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Derniers résultats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Derniers résultats</h2>
          <Link href="/matchs" className="text-sm text-secondary hover:text-primary">Voir tous les matchs</Link>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {home: 'Abidjan Lions', away: 'Dakar Titans', hs: 88, as: 80, date: '27 Oct 2025', venue: 'Abidjan', hl:'/teams/abidjan-lions.png', al:'/teams/dakar-titans.png'},
            {home: 'Accra Eagles', away: 'Lagos Sharks', hs: 74, as: 79, date: '26 Oct 2025', venue: 'Accra', hl:'/teams/accra-eagles.png', al:'/teams/lagos-sharks.png'},
            {home: 'Bamako Warriors', away: 'Cotonou Falcons', hs: 91, as: 89, date: '25 Oct 2025', venue: 'Bamako', hl:'/teams/bamako-warriors.png', al:'/teams/cotonou-falcons.png'},
          ].map((m, i) => (
            <div key={i} className="rounded-lg border border-border bg-surface p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Image src={m.hl} alt={m.home} width={28} height={28} />
                  <span className="text-sm text-text-primary font-medium">{m.home}</span>
                </div>
                <div className="text-sm font-semibold text-text-primary">{m.hs}</div>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Image src={m.al} alt={m.away} width={28} height={28} />
                  <span className="text-sm text-text-primary font-medium">{m.away}</span>
                </div>
                <div className="text-sm font-semibold text-text-primary">{m.as}</div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
                <span>{m.date}</span>
                <span>{m.venue}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Prochains matchs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Prochains matchs</h2>
          <Link href="/matchs" className="text-sm text-secondary hover:text-primary">Calendrier complet</Link>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {home: 'Kinshasa Royals', away: 'Ouagadougou Bulls', date: '5 Nov 2025', venue: 'Kinshasa', hl:'/teams/kinshasa-royals.png', al:'/teams/ouagadougou-bulls.png'},
            {home: 'Yaoundé Hawks', away: 'Lomé Panthers', date: '6 Nov 2025', venue: 'Yaoundé', hl:'/teams/yaounde-hawks.png', al:'/teams/lome-panthers.png'},
            {home: 'Abidjan Lions', away: 'Accra Eagles', date: '7 Nov 2025', venue: 'Abidjan', hl:'/teams/abidjan-lions.png', al:'/teams/accra-eagles.png'},
          ].map((m, i) => (
            <div key={i} className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Image src={m.hl} alt={m.home} width={28} height={28} />
                  <span className="text-sm text-text-primary font-medium">{m.home}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wide rounded-full border border-border px-2 py-0.5 text-text-secondary">À venir</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-primary font-medium">{m.away}</span>
                  <Image src={m.al} alt={m.away} width={28} height={28} />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                  <span>{m.date}</span>
                </div>
                <span>{m.venue}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Classement actuel */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Classement actuel</h2>
          <Link href="/classement" className="text-sm text-secondary hover:text-primary">Voir le classement complet</Link>
        </div>
        <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-background">
          <table className="min-w-full text-sm">
            <thead className="bg-surface text-text-secondary">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Équipe</th>
                <th className="px-4 py-2 text-left font-semibold">V</th>
                <th className="px-4 py-2 text-left font-semibold">D</th>
                <th className="px-4 py-2 text-left font-semibold">Diff</th>
              </tr>
            </thead>
            <tbody>
              {[
                {team: 'Abidjan Lions', v: 8, d: 2, diff: '+76', logo:'/teams/abidjan-lions.png'},
                {team: 'Dakar Titans', v: 7, d: 3, diff: '+40', logo:'/teams/dakar-titans.png'},
                {team: 'Accra Eagles', v: 7, d: 3, diff: '+35', logo:'/teams/accra-eagles.png'},
                {team: 'Lagos Sharks', v: 6, d: 4, diff: '+20', logo:'/teams/lagos-sharks.png'},
                {team: 'Yaoundé Hawks', v: 6, d: 4, diff: '+15', logo:'/teams/yaounde-hawks.png'},
              ].map((row, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Image src={row.logo} alt={row.team} width={24} height={24} />
                      <span className="text-text-primary">{row.team}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-text-primary">{row.v}</td>
                  <td className="px-4 py-2 text-text-primary">{row.d}</td>
                  <td className="px-4 py-2 text-text-primary">{row.diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Équipes en vedette */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Les équipes phares</h2>
          <Link href="/equipes" className="text-sm text-secondary hover:text-primary">Voir toutes les équipes</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {name:'Abidjan Lions', logo:'/teams/abidjan-lions.png', city:'Abidjan'},
            {name:'Dakar Titans', logo:'/teams/dakar-titans.png', city:'Dakar'},
            {name:'Accra Eagles', logo:'/teams/accra-eagles.png', city:'Accra'},
            {name:'Lagos Sharks', logo:'/teams/lagos-sharks.png', city:'Lagos'},
            {name:'Bamako Warriors', logo:'/teams/bamako-warriors.png', city:'Bamako'},
            {name:'Cotonou Falcons', logo:'/teams/cotonou-falcons.png', city:'Cotonou'},
          ].map((t, i) => (
            <Link key={i} href="/equipes" className="group rounded-lg border border-border bg-background p-4 hover:shadow-sm transition">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-md border border-border p-2 group-hover:border-primary">
                  <Image src={t.logo} alt={t.name} width={56} height={56} />
                </div>
                <div className="mt-2 text-sm font-semibold text-text-primary">{t.name}</div>
                <div className="text-xs text-text-secondary">{t.city}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Bannière dynamique */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-40 sm:h-64 w-full overflow-hidden rounded-lg">
          <Image src="/hero.png" alt="Highlights" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link href="/videos" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-text-primary hover:bg-hover border border-border">
              Regarder les moments forts
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CTA final */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-border bg-secondary/5 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-text-primary">Rejoignez la TSI Basket League</h2>
          <p className="mt-2 text-text-secondary">Suivez la ligue, découvrez les talents et vibrez au rythme des matchs.</p>
          <div className="mt-6">
            <Link href="/about" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-text-primary hover:bg-hover border border-border">
              Découvrir plus
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}