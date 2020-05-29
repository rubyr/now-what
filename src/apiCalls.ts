export const apiCalls = async (term: string) => {
  const corsAnywhere: string = `https://cors-anywhere.herokuapp.com/`;
  const modifiedSearchTerm: string = term.split(" ").join("+");
  const url = `${corsAnywhere}https://tastedive.com/api/similar?q=${modifiedSearchTerm}&verbose=1&k=372838-DavePern-7J59GJ8D&limit=5`;
  const data = await fetch(url);
  return data;
};
