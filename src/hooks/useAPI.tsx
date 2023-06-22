// Below code is used to create a custom hook to fetch data from the API

export enum SearchType { // enum is a type that defines a set of named constants called members or enumerators of the type.
  all = "",
  movie = "movie",
  series = "series",
  episode = "episode",
}

export interface SearchResult {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

export interface SearchError {
  Response: string;
  Error: string;
}

export interface DetailsResult {
  Genre: string;
  Title: string;
  Poster: string;
  Year: string;
  imdbRating: string;
  Plot: string;
  Director: string;
  Actors: string;
  Website: string;
  Awards: string;
}

export const useAPI = () => {
  // useAPI is a custom hook that is used to fetch data from the API and return the data

  let URL = "http://www.omdbapi.com/";
  let apiKey = "a96ff0b";

  const searchData = async (
    title: string,
    type: SearchType
  ): Promise<SearchResult[] | SearchError> => {
    const result = await fetch(
      `${URL}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`
    );

    return result.json();
  };

  const getDetails = async (id: string): Promise<DetailsResult> => {
    const result = await fetch(`${URL}?i=${id}&plot=full&apikey=${apiKey}`);
    return result.json();
  };

  return {
    searchData,
    getDetails,
  };
};

export default useAPI;
