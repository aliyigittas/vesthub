import { GoogleMap, MarkerF } from "@react-google-maps/api";
import Homepin from '../homePin.png';
import LoadMaps from "./GmapsHelper";
import loadingGif from '../loading.gif';

function SingleMarkerMap({marker} : {marker: { id: number, coordinates: {lat: number, lng: number}}}){
    const isLoaded = LoadMaps(); 
    
    return isLoaded ? (
      <div className="relative">
        <GoogleMap
          mapContainerStyle={{
            height: "50vh",
            width: "100%",
            margin: "auto",
            borderRadius: "0.75rem",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.8)",
          }}
          zoom={16}
          center={marker.coordinates}
        >
            <MarkerF
                animation={google.maps.Animation.DROP}
                icon={{ url: Homepin, scaledSize: new google.maps.Size(45, 45)}}
                key={marker.id}
                position={marker.coordinates}
            >
            </MarkerF>
        </GoogleMap>
      </div>
    ) : (
        //buraya gif gelecek
        <div className="flex justify-center items-center h-48 flex-row">
        <img src={loadingGif} alt="Loading" className='w-[576px] h-[324px]' />
      </div>
    );
  }

export default SingleMarkerMap;