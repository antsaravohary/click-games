const Items = ({ title, content }: any) => {
  return (
    <div>
      <a href="#" className="mt-2 block">
        <p className="text-xl font-semibold text-gray-900">
         {title}
        </p>
        <p className="mt-3 text-base text-gray-500">
        {content}
        </p>
      </a>
     {/**  <div className="mt-3">
        <a
          href="#"
          className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Read full story
        </a>
      </div>*/}
    </div>
  );
};
export default Items;