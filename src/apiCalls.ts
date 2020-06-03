import wiki from "wikijs";
import { searchResult } from "./types";

export const findSimilar = async (term: string) => {
  const corsAnywhere: string = `https://cors-anywhere.herokuapp.com/`;
  const modifiedSearchTerm: string = term.split(" ").join("+");
  const url = `${corsAnywhere}https://tastedive.com/api/similar?q=${modifiedSearchTerm}&verbose=1&k=372838-DavePern-7J59GJ8D`;
  const data = await fetch(url);
  return data;
};

export const findTitleInfo = async (term: string) => {
  const corsAnywhere: string = `https://cors-anywhere.herokuapp.com/`;
  const url = `${corsAnywhere}https://tastedive.com/api/similar?q=${term}&verbose=1&k=372838-DavePern-7J59GJ8D&limit=3`;
  // const data = await fetch(url);
  return await fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const fetchFavorites = async (favorites: string[]) => {
  const corsAnywhere: string = `https://cors-anywhere.herokuapp.com/`;
  const media: string = favorites.join("%2C");
  const url = `${corsAnywhere}https://tastedive.com/api/similar?q=${media}&verbose=1&k=372838-DavePern-7J59GJ8D&limit=1`;

  return await fetch(url).then((response) => response.json());
};

export const getWikiImage = async (wUrl: string) => {
  const page = decodeURI(wUrl.split("/").pop() as string);
  const url = await wiki()
    .page(page)
    .then((page) => page.mainImage());
  return url;
};

export const getEditorsChoice = async () => {
  const choices = await fetch("/data/editors.json").then((r) => r.json());
  let allMedia: string[] = [];
  for (const titles of Object.values<string[]>(choices)) {
    allMedia.push(...titles);
  }

  // function splits all the titles into separate arrays of length 11, the max the API can take
  // it's dumb but so is this API
  const splitMedia = allMedia.reduce(
    (acc: string[][], m) => {
      if (acc[acc.length - 1].push(m) > 10) {
        acc.push([]);
      }
      return acc;
    },
    [[]]
  );

  const datas = await Promise.all(
    splitMedia.map(async (mediaArray) => {
      const media = encodeURI(mediaArray.join());

      const corsAnywhere: string = `https://cors-anywhere.herokuapp.com/`;
      const url = `${corsAnywhere}https://tastedive.com/api/similar?q=${media}&verbose=1&k=372838-DavePern-7J59GJ8D&limit=1`;

      return fetch(url).then((r) => (r.ok ? r.json() : console.error(r)));
    })
  );

  return datas.reduce((acc, things) => [...acc, ...things.Similar.Info], []);
};
