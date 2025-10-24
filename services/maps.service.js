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
export async function getdistance(origin,destination){
    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${apiKey}`;
    try {
       const response = await axios.get(url);
       if (response.data.status=='OK') {
        if (response.data.rows[0].elements[0].status=='ZERO RESULTS') {
            throw new Error('No route could be found between the origin and destination');
        }
        return response.data.rows[0].elements[0];
       }else{
        throw new Error(`Unable to fetch distance: ${response.data.status}`);
       }
    } catch (error) {
        console.error("Google Maps Distance Matrix API error:", error.message); 
        throw new Error("Error fetching distance");
    }
}

export async function getAutoCompletion(input) {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedInput = encodeURIComponent(input);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedInput}&key=${apiKey}`;
    try {
    const response = await axios.get(url);
        if (response.data.status=='OK') {
            return response.data.predictions;
        }else{
            throw new Error(`Unable to fetch autocomplete suggestions: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Google Maps Places API error:", error.message); 
        throw new Error("Error fetching autocomplete suggestions");
    }   
}
