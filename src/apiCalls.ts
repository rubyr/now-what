import wiki from "wikijs";

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
