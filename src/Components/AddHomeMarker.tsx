import { GoogleMap, MarkerF } from "@react-google-maps/api";
import LoadMaps from "./GmapsHelper";
import Homepin from "../homePin.png";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LoadingOutlined } from "@ant-design/icons";


function AddHomeMarker() {
    const isLoaded = LoadMaps(); 
    const [position, setPosition] = useState<{ latitude: number | null, longitude: number | null }>({ latitude: null, longitude: null });
    const [showLoader, setShowLoader] = useState(false)
    let latitude = Cookies.get("latitude");
    let longitude = Cookies.get("longitude");
 
    const handleClick = () => {
      setShowLoader(true);
    };

    useEffect(() => {
        if (latitude && longitude) {
            setPosition({
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            });
        }
    }, [latitude, longitude]);

    
    if (position.latitude == null || position.longitude == null) {
        return (
            <button className="flex w-full justify-center rounded-md bg-button-primary py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover disabled:bg-opacity-50" onClick={(e) => {
              getCurrentLocation();
              handleClick();
            }}
            disabled={showLoader}
            >
                {!showLoader ? "Open Map" : 
                  <div className="flex justify-center items-center gap-2">
                    <LoadingOutlined />
                    <span>Loading...</span>
                  </div>
                }
            </button>
        );
    }
    
    return isLoaded ? (
      <div className="">
        <GoogleMap
          
          mapContainerStyle={{
            height: "40vh",
            width: "40vw",
            margin: "auto",
            borderRadius: "0.75rem",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.8)",
          }}
          
          zoom={16}
          center={ {lat: position.latitude, lng: position.longitude} }
        >
            <MarkerF
                animation={google.maps.Animation.DROP}
                icon={{ url: Homepin, scaledSize: new google.maps.Size(45, 45)}}
                position={{ lat: position.latitude, lng: position.longitude }}
                draggable={true}
                onLoad={()=>{
                  Cookies.set("latitude", position.latitude!.toString(), { expires: (1 / 1440) * 60 }); // 1 hour
                  Cookies.set("longitude", position.longitude!.toString(), { expires: (1 / 1440) * 60 }); // 1 hour
                }}
                onDragEnd={(e) => {
                    console.log("Latitude: ", e.latLng?.lat());
                    console.log("Longitude: ", e.latLng?.lng());
                    setPosition({
                        latitude: e.latLng!.lat(),
                        longitude: e.latLng!.lng(),
                    });
                    Cookies.set("latitude", e.latLng!.lat().toString(), { expires: (1 / 1440) * 60 }); // 1 hour
                    Cookies.set("longitude", e.latLng!.lng().toString(), { expires: (1 / 1440) * 60 }); // 1 hour
                }}
            >
            </MarkerF>
        </GoogleMap>
      </div>
    ) : (
        //buraya gif gelecek
      <h1>Loading...</h1>
    );

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position: any) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        Cookies.set("latitude", position.coords.latitude, { expires: (1 / 1440) * 60 }); // 1 hour
        Cookies.set("longitude", position.coords.longitude, { expires: (1 / 1440) * 60 }); // 1 hour
      }, function (error) {
        if (error.code === error.PERMISSION_DENIED) {
          //check iphone settings
          if (navigator.userAgent.includes("iPhone")) {
            alert("iOS does not allow location services with HTTP.");
            setShowLoader(false);
          } else {
            alert("Please enable location services for this website.");
            setShowLoader(false);
          }
        }
      }
      );
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }
}


export default AddHomeMarker;




