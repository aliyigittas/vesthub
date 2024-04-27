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
    const [address, setAddress] = useState<string | null>(null);
    const [showLoader, setShowLoader] = useState(false)
    const [getAddressLoading, setGetAddressLoading] = useState(false);
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
                {!showLoader ? "Get The Address" : 
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
                onDragEnd={(e) => {
                    console.log("Latitude: ", e.latLng?.lat());
                    console.log("Longitude: ", e.latLng?.lng());
                    setPosition({
                        latitude: e.latLng!.lat(),
                        longitude: e.latLng!.lng(),
                    });
                }}
            >
            </MarkerF>
        </GoogleMap>
        <button className="flex p-2 mt-2 justify-center rounded-md bg-button-primary py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover" 
        onClick={() => {
          //GeoCodeFromGeoApify(); 
          GeoCodeFromGMaps();
        }}
        >Get Address</button>
        <div className="mt-3 text-center"> 
          {!getAddressLoading ? (address ? `The address is: ${address}`: "") : 
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-2 border-t-[4px] border-gray-800 rounded-full animate-spin"></div> {/* Spinner */}
              <span className="ml-2">Loading...</span>
            </div>
          } 
        </div>
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



  //bu daha net ve hızlı ama limitli
  //eslint-disable-next-line
  function GeoCodeFromGMaps () {
    setGetAddressLoading(true);
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.latitude},${position.longitude}&key=AIzaSyADLFlKMT50syOfOGB0H0gavooIOrjC3m4`)
      .then((response) => {
        console.log(response.data.results);
        //Cookies.set("address", response.data.results[0].formatted_address, { expires: (1 / 1440) * 60 }); // 1 hour
        setAddress(response.data.results[0].formatted_address);
        console.log(response.data.results);
        setGetAddressLoading(false);
      })
      .catch((error) => {
        setGetAddressLoading(false);
        console.log(error);
        setAddress("Address could not be found.");
      });
  }

  //bu bedava
  function GeoCodeFromGeoApify()
  {
    setGetAddressLoading(true);
    axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.latitude}&lon=${position.longitude}&apiKey=8af1068cc41e4c56b9103ad4db20ecff`)
    .then((response) => {
      console.log(response.data.features);
      setAddress(response.data.features[0].properties.formatted);
      setGetAddressLoading(false);
    })
    .catch((error) => {
      setGetAddressLoading(false);
      console.log(error);
      setAddress("Address could not be found.");
    });
  }
  
}


export default AddHomeMarker;




