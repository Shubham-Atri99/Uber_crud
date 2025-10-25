import { get } from "mongoose";
import { getdistance } from "./maps.service.js";
import Ride from "../models/ride.js";




export async function createRide({
    user,pickup,destination,vehicleType
}){
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required to create a ride");
  }
  const fare = await getfare(pickup, destination);
  const ride =await Ride.create({
    user,
    pickup,
    destination, 
    otp:getOTP(4),
    fare:fare[vehicleType],
  })
  return ride;
}

 async function getfare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required to calculate fare");
  }

  const distanceTime = await getdistance(pickup, destination);
  const distanceKm = distanceTime.distance.value / 1000;
  const timeMin = distanceTime.duration.value / 60;

  const rates = {
    auto: { baseFare: 30, perKm: 12, perMin: 1 },
    car: { baseFare: 50, perKm: 20, perMin: 2 },
    motorcycle: { baseFare: 20, perKm: 8, perMin: 0.5 },
  };

  const fare = {
    auto: (rates.auto.baseFare + distanceKm * rates.auto.perKm + timeMin * rates.auto.perMin).toFixed(2),
    car: (rates.car.baseFare + distanceKm * rates.car.perKm + timeMin * rates.car.perMin).toFixed(2),
    motorcycle: (rates.motorcycle.baseFare + distanceKm * rates.motorcycle.perKm + timeMin * rates.motorcycle.perMin).toFixed(2),
  };

  return fare;
}
function getOTP(numberOfDigits) {
  let otp = '';
    for (let i = 0; i < numberOfDigits; i++) {
        otp += Math.floor(Math.random() * 10).toString();
    }
    return parseInt(otp);
}

