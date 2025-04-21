// googleMapsAPI.js
export const fetchNearbyTurfs = async () => {
  try {
    const response = await fetch("/api/nearby-turfs"); // Replace with actual API endpoint
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching nearby turfs:", error);
    return [];
  }
};
