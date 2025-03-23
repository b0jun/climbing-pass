export const updateQueryString = (key: string, value: string | undefined, searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams.toString());
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  return params.toString();
};
