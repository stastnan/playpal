import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BOARDGAMEGEEK_API_URL } from "src/utils/apiUrl";
import XMLParser from "react-xml-parser";

const handleResponse = async (response) => {
  const text = await response.text();
  const xml = new XMLParser().parseFromString(text);
  const data = xml.children;
  return data;
};

export const gamesApi = createApi({
  reducerPath: "games",
  baseQuery: fetchBaseQuery({ baseUrl: BOARDGAMEGEEK_API_URL }),
  endpoints: (builder) => ({
    getHotGames: builder.query({
      query: () => ({
        url: "/xmlapi2/hot?boardgame",
        responseHandler: handleResponse,
      }),
    }),
    getGameById: builder.query({
      query: (id) => ({
        url: `/xmlapi2/thing?id=${id}`,
        responseHandler: handleResponse,
      }),
    }),
    getUserGames: builder.query({
      query: (user) => ({
        url: `/xmlapi2/collection?username=${user}&subtype=boardgame&own=1`,
        responseHandler: handleResponse,
      }),
    }),
  }),
});

export const {
  useGetHotGamesQuery,
  useGetGameByIdQuery,
  useGetUserGamesQuery,
} = gamesApi;
