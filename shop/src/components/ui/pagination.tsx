import RCPagination, { PaginationProps } from "rc-pagination";
import { ArrowNext, ArrowNextIcon } from "@components/icons/arrow-next";
import { ArrowPrev, ArrowPrevIcon } from "@components/icons/arrow-prev";
import "rc-pagination/assets/index.css";

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <RCPagination
      nextIcon={<ArrowNext />}
      prevIcon={<ArrowPrev />}
      {...props}
    />
  );
};

export default Pagination;
