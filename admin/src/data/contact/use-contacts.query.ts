import { QueryParamsType, TagsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ContactPaginator, ContactsQueryOptionsType } from "@ts-types/contact-type";
import contact from "@repositories/contact";

const fetchContacts = async ({
  queryKey,
}: QueryParamsType): Promise<{ contacts: ContactPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    first_contact,
    type,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as ContactsQueryOptionsType;

  const searchString = stringifySearchQuery({
    email: text,
    first_contact,
  });
  const url = `${API_ENDPOINTS.CONTACT}?search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await contact.all(url);
  return {
    contacts: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useContactsQuery = (options: ContactsQueryOptionsType) => {
  return useQuery<{ contacts: ContactPaginator }, Error>(
    [API_ENDPOINTS.CONTACT, options],
    fetchContacts,
    {
      keepPreviousData: true,
    }
  );
};

export { useContactsQuery, fetchContacts };
