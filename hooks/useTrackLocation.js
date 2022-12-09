import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLatLongData } from "../store/action/index";

const useTrackLocation = () => {
  const dispatch=useDispatch()
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  // const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false)

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // setLatLong(`${latitude},${longitude}`);
    dispatch(setLatLongData(`${latitude},${longitude}`)) 
    setLocationErrorMsg("");
    setIsFindingLocation(false)
  };

  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location");
    setIsFindingLocation(false)
  };

  const handelTrackLocation = () => {
    setIsFindingLocation(true)
    if (!navigator.geolocation) {
      setIsFindingLocation(false)
      setLocationErrorMsg("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    // latLong,
    handelTrackLocation,
    isFindingLocation,
    locationErrorMsg,
  };
};

export default useTrackLocation;
