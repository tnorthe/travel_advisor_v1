import axios from "axios";

const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";


  
export const getPlacesData = async (sw, ne) => {
    try{
    const {data: {data}} = await axios.get(URL, {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'X-RapidAPI-Key': '46652fc490msh808d098e47d0b5ap1a84dajsnf6fd0cb90e3c',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    });
    return data;
  }
  catch (error) {
    console.log(error);
  }
}