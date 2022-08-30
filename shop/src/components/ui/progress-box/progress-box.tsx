import { CheckMark } from "@components/icons/checkmark";
import cn from "classnames";
import Scrollbar from "@components/ui/scrollbar";
import styles from "./progress-box.module.css";

type ProgressProps = {
  data: any[] | undefined;
  status: number;
  type:number;
};

const ProgressBox: React.FC<ProgressProps> = ({ status, data,type }) => {
  return (
    <Scrollbar
      className="w-full h-full"
      options={{
        scrollbars: {
          autoHide: "never",
        },
      }}
    >
      <div className="flex flex-col py-7 md:items-start md:justify-start w-full md:flex-row">
        {data?.map((item: any) =>{if(item.type===type) {return (
          <div className={styles.progress_container} key={item.id}>
            <div
              className={cn(
                styles.progress_wrapper,
                status >= item.serial ? styles.checked : ""
              )}
            >
              <div className={styles.status_wrapper}>
                {status >= item.serial ? (
                  <div className="w-3 h-4">
                    <CheckMark className="w-full" />
                  </div>
                ) : (
                  item.serial
                )}
              </div>
              <div className={styles.bar} />
            </div>

            <div className="flex flex-col items-start ms-5 md:items-center md:ms-0">
              {item && (
                <span className="text-base text-body-dark  font-semibold text-start md:text-center md:px-2">
                  {item?.name}
                </span>
              )}
            </div>
          </div>
        )}})}
      </div>
    </Scrollbar>
  );
};

export default ProgressBox;
