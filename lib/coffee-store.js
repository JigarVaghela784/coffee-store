import { createApi } from "unsplash-js";

const apiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;
const client_id = process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_SECRET;

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getAllCoffeeShopPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee",
    perPage: 40,
  });
  const upsplashPhoto = photos.response.results;
  return upsplashPhoto.map((result) => result.urls["small"]);
};

const fetchCoffeeStore = async (latLong="21.244741247319556,72.81797116827686",limit=6) => {
  const photos = await getAllCoffeeShopPhotos();
  const queryParams = new URLSearchParams({
    ll:latLong,
    query: "coffee shop",
    limit: limit,
    client_id: client_id,
    client_secret: client_secret,
  });

  const getAuthoRization = () => {
    const methodParams = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: apiKey,
      },
    };
    return methodParams;
  };

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?${queryParams}`,
    getAuthoRization()
  );

  const data = await response.json();
  return data.results.map((res, idx) => {
    return {
      ...res,
      id: res.fsq_id,
      address: res.location.address || res.location.formatted_address||"",
      neighborhood: res.location.neighborhood || res.location.crossStreet || "",
      name: res.name,
      imgUrl: photos[idx],
    };
  });
};

export default fetchCoffeeStore;
