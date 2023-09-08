import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createCity,
  fetchItinerariesByCity,
} from "../redux/actions/cityActions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Itinerary from "../components/Itinerary";
import NoItinerariesFound from "../components/NoItinerariesFound";

const Details = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const city = useSelector((store) => store.createCityReducer.city);
  const itineraries = useSelector(
    (store) => store.createItinerariesByCityReducer.itineraries
  );

  useEffect(() => {
    dispatch(createCity(params.id));
    dispatch(fetchItinerariesByCity(params.id));
  }, []);

  useEffect(() => {
    document.title = `${city.city} - MyTinerary`;
  }, [city]);

  if (!city || !city.city || !itineraries) {
    return <div className="text-center text-8xl mt-8">LOADING...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div
        style={{ backgroundImage: `url(${city.photo})` }}
        className="h-60 bg-cover bg-center"
      >
        <h1 className="text-4xl font-semibold text-white py-10 px-64">
          {city.city}
        </h1>
        <h2 className="text-2xl font-semibold text-white px-64">
          {city.country}
        </h2>
      </div>
      <div className="container mx-auto py-6 px-4">
        <span className="text-xl">
          <p>Country: {city.country}</p>
          <p>Population: {city.population}</p>
          <p>Foundation: {city.foundation}</p>
        </span>
        <p className="mt-4">{city.description}</p>
        <div className="rounded-md text-center p-4 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 hover:shadow-md transition duration-300 ease-in-out"
          >
            Go Back to Cities
          </button>
        </div>
      </div>
      <div className="container mx-auto py-6 px-4">
        {itineraries.length === 0 ? (
          <NoItinerariesFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {itineraries.map((itinerary, index) => {
              return <Itinerary data={itinerary} key={index} />;
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Details;
