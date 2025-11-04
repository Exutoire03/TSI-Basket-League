import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="TSI Basket League" width={32} height={32} />
              <span className="text-sm font-semibold text-text-primary">TSI Basket League</span>
            </div>
            <p className="text-sm text-text-secondary">
              TSI Basket League — Promouvoir le talent africain à travers le basketball.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:col-span-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-text-secondary hover:text-primary">Accueil</Link></li>
                <li><Link href="/matchs" className="text-text-secondary hover:text-primary">Matchs</Link></li>
                <li><Link href="/classement" className="text-text-secondary hover:text-primary">Classement</Link></li>
                <li><Link href="/equipes" className="text-text-secondary hover:text-primary">Équipes</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">Informations</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/mentions-legales" className="text-text-secondary hover:text-primary">Mentions légales</Link></li>
                <li><Link href="/confidentialite" className="text-text-secondary hover:text-primary">Confidentialité</Link></li>
                <li><Link href="/contact" className="text-text-secondary hover:text-primary">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border pt-6">
          <div className="flex items-center gap-4">
            <Link href="https://facebook.com" aria-label="Facebook" className="text-text-secondary hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.87h2.74l-.44 2.91h-2.3V22C18.34 21.21 22 17.08 22 12.06Z"/></svg>
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram" className="text-text-secondary hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7Zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3Zm11 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM12 7a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7Zm0 2a3 3 0 1 1-.001 6.001A3 3 0 0 1 12 9Z"/></svg>
            </Link>
            <Link href="https://twitter.com" aria-label="X" className="text-text-secondary hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M4 3h5.1l3.53 5.38L16.8 3H20l-5.9 8.27L20.5 21h-5.1l-3.74-5.7L7 21H3l6.61-9.27L4 3Z"/></svg>
            </Link>
            <Link href="https://youtube.com" aria-label="YouTube" className="text-text-secondary hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M23.5 6.2a4.8 4.8 0 0 0-3.4-3.4C18.3 2.2 12 2.2 12 2.2s-6.3 0-8.1.6A4.8 4.8 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8a4.8 4.8 0 0 0 3.4 3.4c1.8.6 8.1.6 8.1.6s6.3 0 8.1-.6a4.8 4.8 0 0 0 3.4-3.4c.5-1.8.5-5.8.5-5.8s0-4-.5-5.8ZM9.6 15.5v-7l6.4 3.5-6.4 3.5Z"/></svg>
            </Link>
          </div>
          <p className="text-xs text-text-secondary">© 2025 TSI Basket League. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}


