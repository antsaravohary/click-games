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
                    <span className="w-full  block leading-normal text-justify text-gray-800 text-md mb-3">Nous utilisons des cookies pour vous garantir la meilleure expérience sur notre site web. Si vous continuez à utiliser ce site, nous supposerons que vous en êtes satisfait.</span>
                    <div className="flex items-center justify-between">
                        <a className="text-xs text-gray-400 mr-1 hover:text-gray-800" href="/terms/politique-de-confidentialité">Politique de confidentialité</a>
                        <div className="w-1/2">
                            <button
                                onClick={() => {
                                    storage.set({ key: "cookie_consent", value: "all" });
                                    setState(false);
                                }}
                                type="button" className="py-2 px-4  bg-accent hover:bg-accent-hiover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }else{
        return null;
    }

}

export default MyCookieConsent;