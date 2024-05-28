import { useEffect, useState } from "react";
import HomeCard from "../Components/HomeCard";
import homes from "../Components/TempHomes";
import axios from "axios";
import H1 from "../homePhotos/home1/1.jpeg";
import H2 from "../homePhotos/home1/2.jpeg";
import H3 from "../homePhotos/home1/3.jpeg";
import Cookies from "js-cookie";

function FavoritesPage() {
    const favoriteHomes =[homes[0], homes[2]]; 

    return (
        <div className="min-h-full place-items-center flex justify-top flex-col bg-backColor px-6 py-6 lg:px-8">
            <h1>Favorites</h1>
            <ListMyHouse />
        </div>
    );
}

function ListMyHouse() {
    const [homes, setHomes] = useState<any[]>([]);

    useEffect(() => {
        // Function to fetch data
        const fetchHomes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/favorites/${Cookies.get('Email')}`); //`${Cookies.get('Email')}`
                console.log(response.data);

                //parse homes one by one to display them in HomeCard component
                const parsedHomes = response.data.map((home: any) => ({
                    id: home.id,
                    title: home.title,
                    photo: [H1,H2,H3],
                    price: home.price.toString(),
                    type: home.saleRent,
                    coordinates: { lat: home.lat, lng: home.lng },
                    address: home.fullAddress,
                    ownerMail: home.ownerMail,
                    description: home.description,
                    keyFeatures: {
                        fiberInternet: home.fiberInternet === 1 ? true : false,
                        airConditioner: home.airConditioner === 1 ? true : false,
                        floorHeating: home.floorHeating === 1 ? true : false,
                        fireplace: home.fireplace === 1 ? true : false,
                        terrace: home.terrace === 1 ? true : false,
                        satellite: home.satellite === 1 ? true : false,
                        parquet: home.parquet === 1 ? true : false,
                        steelDoor: home.steelDoor === 1 ? true : false,
                        furnished: home.furnished === 1 ? true : false,
                        insulation: home.insulation === 1 ? true : false,
                    },
                }));

                setHomes(parsedHomes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHomes();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className="flex flex-wrap justify-center items-center h-full bg-inherit">
            {homes.map(home => (<HomeCard key={home.id} home={home} />))}
        </div>
    );
}


export default FavoritesPage;