import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const Map = () => {
  const [sellers, setSellers] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Fetch seller data from your API
    axios
      .get("http://localhost:4000/admin/users/get/sellers")
      .then((response) => {
        const sellerData = response.data;

        // Calculate the average latitude and longitude
        const totalLatitude = sellerData.reduce((acc, seller) => acc + seller.latitude, 0);
        const totalLongitude = sellerData.reduce((acc, seller) => acc + seller.longitude, 0);
        const avgLatitude = totalLatitude / sellerData.length;
        const avgLongitude = totalLongitude / sellerData.length;

        setMapCenter({ lat: avgLatitude, lng: avgLongitude });
        setSellers(sellerData);
      })
      .catch((error) => {
        console.error("Error fetching seller data: ", error);
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDhInbVp49GTp6m7xsMzO8Ns6kTCa8ZgMY">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
        }}
        center={mapCenter}
        zoom={4} // Adjust the zoom level as needed
      >
        {sellers.map((seller) => (
          <Marker
            key={seller.id}
            position={{
              lat: seller.latitude,
              lng: seller.longitude,
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
