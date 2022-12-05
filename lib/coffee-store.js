import { createApi } from "unsplash-js";

const apiKey = process.env.FOURSQUARE_API_KEY;
const client_id = process.env.FOURSQUARE_CLIENT_ID;
const client_secret = process.env.FOURSQUARE_CLIENT_SECRET;

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getAllCoffeeShopPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee",
    page: 1,
    perPage: 10,
    // color: "green",
    // orientation: "portrait",
  });
  const upsplashPhoto = photos.response.results;
  return upsplashPhoto.map((result) => result.urls["small"]);
};

const fetchCoffeeStore = async () => {
  const photos = await getAllCoffeeShopPhotos();
  const queryParams = new URLSearchParams({
    ll: "21.244741247319556,72.81797116827686",
    query: "coffee shop",
    limit: 6,
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
    console.log("res", res);
    return {
      ...res,
      id: res.fsq_id,
      address: res.location.address || "",
      neighborhood: res.location.neighborhood || res.location.crossStreet || "",
      name: res.name,
      imgUrl: photos[idx],
    };
  });
};

export default fetchCoffeeStore;
