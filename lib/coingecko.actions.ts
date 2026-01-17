"use server";

import qs from "query-string";

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error("Could not get base url!");
if (!API_KEY) throw new Error("Could not get api key!");

/**
 * Fetches JSON from a CoinGecko API endpoint and returns the parsed response.
 *
 * @param endpoint - The endpoint path appended to the configured BASE_URL (no leading slash required)
 * @param params - Optional query parameters to append to the URL; null and empty-string values are omitted
 * @param revalidate - Revalidation hint in seconds applied to the request (used for caching behavior)
 * @returns The parsed JSON response as type `T`
 * @throws Error when the HTTP response status is not OK; the error message includes the status code and any error detail returned by the API
 */
export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );
  console.log(`Fetching ${url} from ${endpoint}`);

  const response = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": API_KEY,
      "Content-Type": "application/json",
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      `API Error: ${response.status}: ${errorBody.error || response.statusText} `,
    );
  }

  return response.json();
}