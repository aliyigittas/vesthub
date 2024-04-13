import { useLoadScript } from "@react-google-maps/api";

function LoadMaps(){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "", //AIzaSyADLFlKMT50syOfOGB0H0gavooIOrjC3m4
        //mapIds: ["4afa231f91b58f2f"],
      });  
    return isLoaded;
}


export default LoadMaps;