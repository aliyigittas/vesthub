import { useJsApiLoader } from "@react-google-maps/api";


const api = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const mapId = process.env.MAP_ID;

function LoadMaps(){
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: api!,
        mapIds: [mapId!],
        version: "3.55",
        //language: "tr",
      });  
    return isLoaded;
}


export default LoadMaps;
