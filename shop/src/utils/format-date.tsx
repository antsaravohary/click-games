import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
require("dayjs/locale/fr");
dayjs.locale("fr");
export const formatDateComplet=(date:string)=>{
    if(date===undefined){
        return "";
    }
    return dayjs(date).format("DD MMMM YYYY");
}

export const formatDateCompletWithDay=(date:string)=>{
  if(date===undefined){
      return "";
  }
  return dayjs(date).format("dddd le DD MMMM YYYY");
}

export const formatDateFromNow = (date: string) => {
    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    dayjs.extend(timezone);
    if (date === undefined) {
      return "";
    }
    return dayjs.utc(date).tz(dayjs.tz.guess()).fromNow();
  };
  