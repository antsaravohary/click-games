export default function CommingSoon({ title, description }) {
  return (
    <div className="flex  mt-5 justify-center  mx-14 ">
      <div className="container">
        <div className="bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2">
          <div className="text-center">
            <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
              {title}
            </h2>
            <h3 className="text-xl md:text-3xl mt-10">Sera bientôt disponible</h3>
            <p className="text-md md:text-xl mt-10">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
