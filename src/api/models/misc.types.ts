import dayjs from 'dayjs';

export type ResponseData<T> = { data: T };

export type Paging = {
  total: number;
  page: number;
  limit: number;
};

export type PagedResponseData<T> = { data: T[]; meta: Paging };

export type DateString =
  `${number}-${number}-${number}T${number}:${number}:${number}Z`;

export async function iteratePagedData<T>(
  apiFunc: (limit: number, page: number) => Promise<PagedResponseData<T>>,
): Promise<T[]> {
  const allData: T[] = [];
  const limit = 20;
  let currentPage = 0;
  let total = -1;
  while (total === -1 || currentPage * limit < total) {
    currentPage++;
    const apiResponse = await apiFunc(limit, currentPage);
    allData.push(...apiResponse.data);
    total = apiResponse.meta.total;
  }
  return allData;
}

export const prettyDateTemplate = 'MMM D, YYYY h:mm A';
export function prettyDate(date: DateString) {
  return dayjs(date).format(prettyDateTemplate);
}
export function prettyNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num);
}
