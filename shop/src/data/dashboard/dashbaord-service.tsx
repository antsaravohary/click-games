import { CoreApi } from "@utils/api/core.api";

class Dashboard extends CoreApi {
  constructor(base_path: string) {
    super(base_path);
  }
}

export const DashboardService = new Dashboard("dashboard");
