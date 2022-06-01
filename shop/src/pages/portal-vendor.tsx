import { CheckMark } from "@components/icons/checkmark";
import FooterOne from "@components/layout/footer-one";
import Layout from "@components/layout/layout";
import Items from "@components/portal-vendor/Items";
import { SEO } from "@components/seo";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps = async (context: any) => {

  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ["common"])),
    },
  };
};

const Items1 = [
  {
    id: 1,
    title: "Vos opérations marketing simplifiées",
    content:
      "Avec les fonctionnalités de référencement intégrées de Click Univers, vous pouvez facilement améliorer le référencement de votre boutique en ligne. L'automatisation du marketing digital vous offrent un avantage concurrentiel.",
  },
  {
    id: 2,
    title: "Vendez facilement en ligne",
    content:
      "Créez votre espace e-commerce en quelques clics et concrétisez vos idées",
  },
  {
    id: 2,
    title: "Optimisation de référencement produit",
    content:
      "Aidez les clients potentiels à trouver vos produits sur les moteurs de recherche. Click Univers référence vos produits le tout en seulement quelques clics.",
  },
];
const Items2 = [
  {
    id: 1,
    title: "Variantes de produits",
    content:
      "Proposez différentes variantes de vos produits en fonction de la taille, de la couleur, du matériau, et plus. Assignez à chaque variante son prix, son code SKU, son poids et son stock.",
  },
  {
    id: 2,
    title: "Images de produits",
    content:
      "Affichez plusieurs images de vos produits afin de mettre ceux-ci en valeur sous tous les angles.",
  },
  {
    id: 2,
    title: "Produit Gagnant ",
    content:
      "Si notre algorithme détecte votre produit comme un produit gagnant nous le promouvons pour vous et cela gratuitement vous n'avez rien à faire on s'occupe de tout"
  },
];

const Item3=[
  {
    id:1,
    title:"Gestion des stocks",
    content:"Gérez l'ensemble de vos stocks avec Click Univers. Faites le suivi des comptages et arrêtez automatiquement de vendre des produits qui tombent en rupture de stock.",
  },
  {
    id:2,
    title:"Collaborations ",
    content:"Assignez à vos collaborateurs la gestion d’une ou plusieurs boutiques, ont leurs attribuons la gestion des commandes, retour, remboursement  ou bien du marketing. ",
  },
]
export default function PortalVendor() {
  return (
    <>
     <SEO  title="Mentions légales "/>
    <div className="bg-white p-4 lg:px-48">
      <main>
        {/* Hero section */}

        {/* Alternating Feature Sections */}
        <div className="flex flex-col pt-16 pb-32 overflow-hidden">
          <div className="">
            <div className="lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  <div>
                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-accent">
                      <CheckMark
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      Vendre sur Internet facilement
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      Créez votre compte vendeur et vendez en quelques clics sur
                      Click Univers
                    </p>
                    <div className="sm:grid sm:grid-cols-2 sm:gap-px mt-8">
                      {Items1.map((item) => (
                        <Items title={item.title} content={item.content} />
                      ))}
                    </div>
                
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-6"></div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="pl-4  sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 "
                    src="/portal-vendor/image-2.jpg"
                    alt="Inbox user interface"
                  />
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-6"></div>
            </div>
          </div>
        

          <div className="">
            <div className="lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl border-gray-500  ring-black ring-opacity-5  "
                    src="/portal-vendor/image-3.png"
                    alt="Inbox user interface"
                  />
                </div>
              </div>
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  <div>
                      {/**<span className="h-12 w-12 rounded-md flex items-center justify-center bg-accent">
                     <CheckMark
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>*/}
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      
                    </p>
                    <div className="sm:grid sm:grid-cols-2 sm:gap-px mt-8">
                      {Items2.map((item) => (
                        <Items title={item.title} content={item.content} />
                      ))}
                    </div>
                    
                  </div>
                </div>
                
              </div>
           
            </div>
          </div>
          <div className="">
            <div className="lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 flex justify-end lg:py-8  lg:max-w-none lg:mx-0 lg:px-0">
                <div className="mt-auto">
                  
                  <div className="mt-auto">

                    <div className="sm:grid sm:grid-cols-2 sm:gap-px mt-8">
                      {Item3.map((item) => (
                        <Items title={item.title} content={item.content} />
                      ))}
                    </div>
                   
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-6"></div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="pl-4  sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 "
                    src="/portal-vendor/image-4.png"
                    alt="Inbox user interface"
                  />
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-6"></div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-600 sm:text-4xl">
              <span className="block">Commencez à vendre avec Click Univers</span>
              <span className="block"> dès aujourd'hui</span>
            </h2>
            <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
              <a
                href="https://admin.click-univers.com/register"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-white text-base text font-bold rounded-md shadow-sm bg-accent"
              >
                Démarrer
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
    <FooterOne/>
    </>
  );
}

PortalVendor.Layout = Layout;
