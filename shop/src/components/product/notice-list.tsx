import { Star } from "@components/icons/category";
import { useModalState } from "@components/ui/modal/modal.context";
import { useNoticesQuery } from "@data/notice/use-notices.query";
import dayjs from "dayjs";

const RenderStart = ({ star }: any) => {
  let indents = [];
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
  return <>{indents.map((i) => i)}</>;
};

export default function NoticeList({ productId }: any) {
  const { data } = useNoticesQuery({ product_id: productId, limit: 100 });
  const notices = data?.notices?.data;

  return (
    <div className="bg-white  p-8">
      
      <div className="pb-5 border-gray-200 sm:flex sm:items-center sm:justify-between">
    
      </div>

      <div className="my-10">
        {notices &&
          notices.map((notice, noticeIdx) => (
            <div
              key={notice.id}
              className="flex w-full text-sm text-gray-500 space-x-4"
            >
            {/* <div className="flex-none py-10">
                <img
                  src={notice?.customer?.profile?.avatar?.thumbnail}
                  alt=""
                  className="w-10 h-10 bg-gray-100 rounded-full"
                />
              </div>* */} 
              <div className="border-b border-gray-200  w-full ">
              <div className="flex items-center mt-4">
                  <RenderStart star={notice.star} />
                </div>
                <h3 className="font-medium text-gray-900">
                  {notice?.pseudo ?? notice.customer.name}
                </h3>
                <p>
                  <time dateTime={notice.created_at}>
                    {/*dayjs(notice.created_at).format("DD/MM/YYYY")*/}
                  </time>
                </p>

               
                <p className="sr-only">{notice.star} out of 5 stars</p>

                <div className="mt-4 prose prose-sm max-w-none text-gray-500">
                  {notice.comment}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
