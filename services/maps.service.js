import axios from "axios";

export async function getCoordinates(address) {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    console.log("Google Maps API raw response:", response.data); 

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(`Unable to fetch coordinates: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Google Maps API error:", error.message); 
    throw new Error("Error fetching coordinates");
  }
}
