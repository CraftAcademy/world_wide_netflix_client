export const getUserLocation = async () => {
  const coords = await window.navigator.geolocation.getCurrentPosition(
    (position) => {
      return position.coords;
    }
  );
  if (coords) {
    return [coords.latitude, coords.longitude];
  }
  return [null, null];
};
