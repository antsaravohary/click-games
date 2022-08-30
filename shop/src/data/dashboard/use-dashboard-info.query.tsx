import { useQuery } from "react-query";
import { DashboardService } from "./dashbaord-service";

const fetchDashboardInfo = async () => {
  const { data } = await DashboardService.fetchUrl("dashboard-info");
  return { info: data };
};

export const useDashboardInfoQuery = () => {
  return useQuery<any, Error>("dashboard-info", fetchDashboardInfo);
};
