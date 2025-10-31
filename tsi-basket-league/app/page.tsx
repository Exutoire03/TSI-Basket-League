import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-primary shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-heading text-white">TSI BASKET LEAGUE</h1>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-text-light hover:text-accent transition-colors">CLASSEMENTS</a>
            <a href="#" className="text-text-light hover:text-accent transition-colors">ÉQUIPES</a>
            <a href="#" className="text-text-light hover:text-accent transition-colors">STATISTIQUES</a>
            <a href="#" className="text-text-light hover:text-accent transition-colors">ACTUALITÉS</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative text-white text-center py-32 px-4 bg-primary">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
          style={{backgroundImage: 'url("/basketball-hero.jpg")'}} // Placeholder for a cool basketball image
        ></div>
        <div className="relative z-10">
          <h2 className="text-7xl font-heading mb-4">
            LA COMPÉTITION ULTIME
          </h2>
          <p className="text-xl text-text-light mb-8 max-w-3xl mx-auto">
            Suivez chaque match, chaque panier et chaque moment fort de la saison. La passion du basketball commence ici.
          </p>
          <button className="bg-accent text-primary font-bold text-lg py-3 px-8 rounded-md hover:bg-yellow-400 transition-colors">
            VOIR LES PROCHAINS MATCHS
          </button>
        </div>
      </main>

      {/* Cards Section */}
      <section className="bg-background-light dark:bg-background-dark py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-heading text-primary dark:text-white mb-8 text-center">DERNIÈRES ACTUALITÉS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <div className="p-6">
                <h4 className="text-2xl font-heading text-primary dark:text-white mb-2">VICTOIRE ÉCRASANTE DE L'ÉQUIPE A</h4>
                <p className="text-text-dark dark:text-text-light mb-4 font-sans">L'équipe A a dominé le match avec un score final de 112-85...</p>
                <a href="#" className="text-accent font-bold hover:underline">LIRE LA SUITE</a>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <div className="p-6">
                <h4 className="text-2xl font-heading text-primary dark:text-white mb-2">LE JOUEUR DU MOIS DÉVOILÉ</h4>
                <p className="text-text-dark dark:text-text-light mb-4 font-sans">Découvrez qui a été élu meilleur joueur du mois de Septembre...</p>
                <a href="#" className="text-accent font-bold hover:underline">LIRE LA SUITE</a>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <div className="p-6">
                <h4 className="text-2xl font-heading text-primary dark:text-white mb-2">LES PLAYOFFS APPROCHENT</h4>
                <p className="text-text-dark dark:text-text-light mb-4 font-sans">Alors que la saison régulière touche à sa fin, la course aux playoffs s'intensifie...</p>
                <a href="#" className="text-accent font-bold hover:underline">LIRE LA SUITE</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-text-light">
          <p className="font-sans">&copy; 2025 TSI Basket League. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
