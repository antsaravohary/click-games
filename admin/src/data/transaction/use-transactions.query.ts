import { QueryParamsType, OrderQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Transactions from "@repositories/transaction";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { TransactionQueryOptionsType } from "@ts-types/transactions-type";

const fetchTransactions = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    text,
    object,
    user_id,
    page = 1,
    type,
    limit = 20,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as TransactionQueryOptionsType;
  const searchString = stringifySearchQuery({
    "user.name": text,
    user_id,
    object,
  });
  const url = `${API_ENDPOINTS.TRANSACTION}?search=${searchString};type:${type}&searchJoin=and&page=${page}&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Transactions.all(url);
  return {
    transactions: { data, paginatorInfo: mapPaginatorData({ ...rest }) },
  };
};

const useTransactionsQuery = (
  params: TransactionQueryOptionsType = {},
  options: any = {}
) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.TRANSACTION, params],
    fetchTransactions,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { useTransactionsQuery, fetchTransactions };
