import { adminOnly, adminOwnerAndStaffOnly } from "@utils/auth-utils";
import Layout from "@components/layouts/shop";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Uploader from "@components/common/uploader";
import Image from "next/image";
import { useEffect, useState } from "react";
import http from "@utils/api/http";
import Button from "@components/ui/button";
import Loader from "@components/ui/loader/loader";
import axios from "axios";
import { SEO } from "@components/seo";

export default function OutilMagic() {
  const [image, setImage] = useState<any>();
  const [imageFilter, setImageFilter] = useState<string>();
  const [menu, setMenu] = useState("original");
  const removeBackgroud = (id: any) => {
    setLoading(true);
    http.get("/outil-magic/" + id).then((response) => {
      setImageFilter(response.data);
      setLoading(false);
    });
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setMenu("remove");
    if (image) {
      removeBackgroud(image.id);
    }
  }, [image]);
  return (
    <>
      <SEO title="Outil magic" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Outil magique
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
            Cet outil permet de supprimer l'arrière-plan de votre photo
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8">
          <Uploader
            preview={false}
            onChange={(e: any) => setImage(e)}
            multiple={false}
          />
        </div>
        {image && (
          <div className="bg-white mt-4 max-w-3xl mx-auto rounded">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 p-4" aria-label="Tabs">
                <button
                  onClick={() => setMenu("original")}
                  className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    menu === "original" && "border-accent"
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setMenu("remove")}
                  className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    menu !== "original" && "border-accent"
                  }`}
                >
                  Supprimer l'arrière plan
                </button>
              </nav>
            </div>
            <div className="flex justify-center">
              <div className="mr-4">
                {image && (
                  <div className="p-8 ">
                    {menu === "original" ? (
                      <div className=" relative w-[350px] h-[350px]">
                        {image && (
                          <Image
                            src={image?.original}
                            layout={"fill"}
                            objectFit={"contain"}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="relative w-[350px] h-[350px]">
                          {loading ? (
                            <>
                              <div className="flex flex-col items-center align-center mt-8">
                                <Loader className="w-6 h-6" simple={true} />
                                <p>Suppression de l'arrière plan</p>
                              </div>
                            </>
                          ) : (
                            <>
                              {imageFilter && (
                                <Image
                                  src={imageFilter}
                                  layout={"fill"}
                                  objectFit={"contain"}
                                />
                              )}
                            </>
                          )}
                        </div>
                        {imageFilter && !loading && (
                          <div className="mx-auto">
                            <Button
                              onClick={() => {
                                axios
                                  .get(imageFilter, {
                                    responseType: "arraybuffer",
                                    headers: {
                                      "Content-Type": "application/json",
                                      Accept: "application/*",
                                    },
                                  })
                                  .then((response) => {
                                    const url = window.URL.createObjectURL(
                                      new Blob([response.data])
                                    );
                                    const link = document.createElement("a");
                                    link.href = url;
                                    link.setAttribute(
                                      "download",
                                      imageFilter.split("/").slice(-1)[0]
                                    ) + ".pn"; //or any other extension
                                    document.body.appendChild(link);
                                    link.click();
                                  })
                                  .catch((error) => console.log(error));
                                /*  axios.get(imageFilter).then((response) => {
                                var element = document.createElement("a");
                                var file = new Blob([response.data], {
                                  type: "image/png",
                                });
                                element.href = URL.createObjectURL(file);
                                element.download = imageFilter
                                  .split("/")
                                  .slice(-1)[0];
                                element.click();
                              });*/
                              }}
                            >
                              Télecharger l'image
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

OutilMagic.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};

OutilMagic.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
