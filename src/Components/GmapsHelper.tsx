import { useJsApiLoader } from "@react-google-maps/api";

function LoadMaps(){
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "", //AIzaSyADLFlKMT50syOfOGB0H0gavooIOrjC3m4
        //mapIds: ["4afa231f91b58f2f"],
        version: "3.55",
        //language: "tr",
      });  
    return isLoaded;
}


export default LoadMaps;