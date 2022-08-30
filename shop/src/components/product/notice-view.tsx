import { useNoticesQuery } from "@data/notice/use-notices.query";
type Props = {
  product_id: string;
};
const NoticeView = ({ product_id }: Props) => {
  const { data, isLoading } = useNoticesQuery({ product_id: product_id });
  let star = 0;
  var indents = [];
  console.log("data", data);
  if (isLoading) {
    return <div>Chargment ...</div>;
  }
  data?.notices.data.map((n) => {
    star += n.star;
  });
  if (data) {
    star = star / data?.notices.data.length;
  }

  for (var i = 0; i < 5; i++) {
    indents.push(
      <button key={i} value={i}>
        <svg
          className={`mx-1 w-4 h-4 fill-current cursor-pointer  hover:text-yellow-600 ${
            i <= star ? "text-yellow-500" : "text-gray-400"
          } `}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      </button>
    );
  }
  return (
    <div>
      {star > 0 && (
        <div className="flex justify-center items-center">
          <div className="flex items-center mt-2 mb-4">
            {indents.map((i) => i)}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeView;
