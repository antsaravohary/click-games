export default function EksBannerOne() {
    return (<div className="relative mt-4">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
        <div className="mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        className="h-full w-full object-cover"
                        src="/banner/banner-click-games-plus.png"
                        alt="People working on laptops"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply" />
                </div>
       {/**      <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                    <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        <span className="block text-white">Échangez vos Jeux d'occasion en illimité
                            avec Click Games + !</span>

                    </h1>
                    <div className=" relative flex justify-center mt-16">
                        <div className="max-w-2xl mx-auto lg:max-w-none">
                            <h2
                                id="sale-heading"
                                className="text-4xl font-extrabold text-center tracking-tight text-light sm:text-5xl lg:text-6xl"
                            >
                                <span className="text-4xl font-extrabold text-light">49,99€</span>
                                <span className="text-base font-medium text-light">/mois</span>
                            </h2>
                            <div className="flex flex-col text-light  items-center justify-center h-full">
                                <div className="">- Le catalogue du ClickGames+ contient la sélection des meilleurs jeux vidéo de moins de 18 mois sur les 5 consoles du moment. De l'aventure, du sport, de l'éducatif, du combat, du fantastique, de la réflexion... Il y en a pour tous les goûts.</div>
                                <div>- 240 Jeux disponibles pour PlayStation, Switch et Xbox</div>
                            </div>

                        </div>

                    </div>
                    <div className="flex justify-center mt-16">  <div className="bg-accent p-4 rounded-md  text-white w-96">
                        <p><span className="underline font-semibold">Bénéficiez de 14 jours d'essaie gratuits</span> en achetant un premier jeu neuf avec ArncasiaPass</p>
                    </div> </div>


                </div> */}   
            </div>
        </div>
    </div>)
}