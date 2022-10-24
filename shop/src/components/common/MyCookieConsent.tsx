import storage from "@utils/storage";
import { useState } from "react";

const MyCookieConsent = () => {
    const [state, setState] = useState(storage.get("cookie_consent") == null);
    if (state) {
        return (<div className="fixed bottom-4 right-4 z-[100]">
            <div style={{ 'backgroundColor': 'rgb(255, 255, 255)' }}>
                <div className="w-96 bg-white rounded-lg shadow-md p-6" style={{ "cursor": "auto" }}>
                    <div className="w-16 mx-auto relative -mt-10 mb-3">
                        <img className="-mt-1" src="https://www.svgrepo.com/show/30963/cookie.svg" alt="Cookie Icon SVG" />
                    </div>
                    <span className="w-full  block leading-normal text-justify text-gray-800 text-md ">Nous utilisons des cookies pour vous garantir une expérience optimale sur notre site Internet.</span>
                    <a className="text-xs text-gray-400 mr-1 hover:text-gray-800 mb-4" href="/terms/politique-de-confidentialite">Politique de confidentialité</a>
                    <div className="flex items-center justify-between">
                        <div className="w-1/2 mx-4">

                            <button
                                onClick={() => {
                                    storage.set({ key: "cookie_consent", value: "none" });
                                    setState(false);
                                }}
                                type="button" className="py-2 px-4  bg-red-600 hover:bg-red-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Refuser</button>
                        </div>
                        <div className="w-1/2 mx-4">

                            <button
                                onClick={() => {
                                    storage.set({ key: "cookie_consent", value: "all" });
                                    setState(false);
                                }}
                                type="button" className="py-2 px-4  bg-accent hover:bg-accent-hiover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Accepter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    } else {
        return null;
    }

}

export default MyCookieConsent;