import { useState, useMemo } from "react";
import { GoogleMap, InfoBoxF, MarkerF } from "@react-google-maps/api";
import Homepin from '../homePin.png';
import HomeCard from "./HomeCard";
import LoadMaps from "./GmapsHelper";

function MultiMarkerMap({homes}: {homes:{ id: number, title: string, photo: string[] , price: string, type: string, coordinates: {lat: number, lng: number}, ownerMail: string, description: string, address:string, keyFeatures: {fiberInternet: boolean , airConditioner: boolean, floorHeating: boolean, fireplace: boolean, terrace: boolean, satellite: boolean, parquet: boolean, steelDoor: boolean, furnished: boolean, insulation: boolean}, numOfBathroom:number, numOfBedroom:number, numOfRooms:string, area:number, status:string }[]}) {

    const isLoaded = LoadMaps();

    var center = useMemo(() => { return { lat: 41.0082, lng: 28.9784 }; }, []); 
  
    const [activeMarker, setActiveMarker] = useState(null);
  
    const handleActiveMarker = (marker:any) => {
      if (marker === activeMarker) {
        return;
      }
      setActiveMarker(marker);
    };
  
    const handleOnLoad = (map: { fitBounds: (arg0: google.maps.LatLngBounds) => void; }) => {
      const bounds = new google.maps.LatLngBounds();
      homes.forEach((home) => { bounds.extend(home.coordinates); });
      map.fitBounds(bounds);
    };

    return isLoaded ? (
      <div className="relative">
        <GoogleMap
          onLoad={handleOnLoad}
          mapContainerStyle={{
            height: "65vh",
            margin: "auto",
            borderRadius: "0.75rem",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.8)",
          }}
          zoom={17}
          center={center}
          onClick={(ev) => {
            console.log("latitide = ", ev.latLng?.lat());
            console.log("longitude = ", ev.latLng?.lng());
          }}
        >
          {homes.map((home) => (
            <MarkerF
              animation={google.maps.Animation.DROP}
              icon={
                {
                url: Homepin,
                scaledSize: activeMarker === home.id ? new google.maps.Size(45, 45): new google.maps.Size(30, 30),
                }
              }
              key={home.id}
              position={home.coordinates}
              onClick={() =>
                activeMarker === home.id
                  ? setActiveMarker(null)
                  : handleActiveMarker(home.id)
              }
            >
              {activeMarker === home.id ? (
                <InfoBoxF onCloseClick={() => setActiveMarker(null)}
                options={{
                  pane: "overlayMouseTarget",
                  pixelOffset: new google.maps.Size(-200, -45),
                  alignBottom: true,
                  closeBoxURL : ""
              }}
                >
                    <HomeCard key={home.id} home={home} />
                </InfoBoxF>
              ) : null}
            </MarkerF>
          ))}
        </GoogleMap>
      </div>
    ) : (
      <h1>Loading...</h1>
    );
  }

export default MultiMarkerMap;