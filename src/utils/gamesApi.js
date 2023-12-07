import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BOARDGAMEGEEK_API_URL } from "src/utils/apiUrl";
import {
  transferXmlToJsSimple,
  transferXmlToJsWithDetails,
} from "./transferFromXmlToJs";

import XMLParser from "react-xml-parser";

export const gamesApi = createApi({
  reducerPath: "games",
  baseQuery: fetchBaseQuery({ baseUrl: BOARDGAMEGEEK_API_URL }),
  endpoints: (builder) => ({
    getHotGames: builder.query({
      query: () => ({
        url: "/xmlapi2/hot?boardgame",
        responseHandler: async (response) => {
          const text = await response.text();
          const xml = new XMLParser().parseFromString(text);
          const data = xml.children;
          return data;
        },
      }),
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
