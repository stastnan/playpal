import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BOARDGAMEGEEK_API_URL } from "src/utils/apiUrl";
import {
  transferXmlToJsSimple,
  transferXmlToJsWithDetails,
} from "./transferFromXmlToJs";

export const gamesApi = createApi({
  reducerPath: "games",
  baseQuery: fetchBaseQuery({ baseUrl: BOARDGAMEGEEK_API_URL }),
  endpoints: (builder) => ({
    getHotGames: builder.query({
      query: () => "/xmlapi2/hot?boardgame",
      responseHandler: async (response) => {
        if (response.headers.get("content-type")?.includes("xml")) {
          return {
            data: transferXmlToJsSimple(response),
            meta: { request: response.request, response },
          };
        } else {
          return response;
        }
      },
    }),

    getGameById: builder.query({
      query: (id) => `/xmlapi2/thing?id=${id}`,
    }),

    getUserGames: builder.query({
      query: (user) =>
        `/xmlapi2/collection?username=${user}&subtype=boardgame&own=1`,
    }),
  }),
});

export const {
  useGetHotGamesQuery,
  useGetGameByIdQuery,
  useGetUserGamesQuery,
} = gamesApi;
