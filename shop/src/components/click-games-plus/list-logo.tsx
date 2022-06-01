
export default function ListLogo() {
    return (
        <div className="bg-white">
            <div className=" py-4 px-4 sm:px-6 lg:py-8 lg:px-8">
                <p className="text-center text-base font-semibold uppercase text-gray-600 tracking-wider">

                </p>
                <div className="mt-2 grid grid-cols-2 gap-0.5 md:grid-cols-3 ">
                    <div className="col-span-1 flex justify-center py-4 px-4 bg-gray-50">
                        <img
                            className="max-h-24"
                            src="/logo/xbox.jpeg"
                            alt="XBOX"
                        />
                    </div>
                    <div className="col-span-1 flex justify-center py-4 px-4 bg-gray-50">
                        <img className="max-h-24" src="/logo/ps.jpeg" alt="PS" />
                    </div>
                    <div className="col-span-1 flex justify-center py-4 px-4 bg-gray-50">
                        <img className="max-h-24" src="/logo/nitendo.jpeg" alt="NITENDO" />
                    </div>

                </div>
            </div>
        </div>
    )
}
