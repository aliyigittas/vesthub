import { useEffect, useState } from "react";
import HomeCard from "../Components/HomeCard";
import axios from "axios";
import H1 from "../homePhotos/home1/1.jpeg";
import H2 from "../homePhotos/home1/2.jpeg";
import H3 from "../homePhotos/home1/3.jpeg";
import Cookies from "js-cookie";
import vesthublogo from '../vesthublogo.png';

function FavoritesPage() {
    //const favoriteHomes =[homes[0], homes[2]]; 

    return (
        <div className="min-h-full place-items-center flex justify-top flex-col bg-backColor px-6 py-6 lg:px-8">
            <h1>Favorites</h1>
            <ListMyHouse />
        </div>
    );
}

//(`http://localhost:8080/api/favorites/${Cookies.get('Email')}`)

function ListMyHouse() {
    const [homes, setHomes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch data
        const fetchHomes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/favorites/${Cookies.get('Email')}`)
                console.log(response.data);

                //parse homes one by one to display them in HomeCard component
                const parsedHomes = response.data.map((home: any) => ({
                    id: home.id,
                    title: home.title,
                    photo: home.images, //[H1,H2,H3]
                    price: home.price.toString(),
                    type: home.saleRent,
                    coordinates: { lat: home.lat, lng: home.lng },
                    address: home.fullAddress,
                    ownerMail: home.ownerMail,
                    description: home.description,
                    numOfBathroom: home.numOfBathroom,
                    numOfBedroom: home.numOfBedroom,
                    numOfRooms: home.numOfRooms,
                    area: home.area,
                    floor: home.floor,
                    totalFloor: home.totalFloor,
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
                    status: home.status,
                }));
                setHomes(parsedHomes);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHomes();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <main >
            {homes.length === 0 ? (
                <div className="text-center py-24">
                    <img src={vesthublogo} alt="VestHub Logo" className="mx-auto h-60 cursor-pointer animate-pulse" onClick={() => window.location.href = '/'} />
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl pt-3">
                        {loading ? "Loading..." : "No houses"}
                    </h1>          
                    <div className="mt-10">
                        <button className="rounded-md bg-button-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover" onClick={() => window.location.href = '/'}>Go back home</button>
                    </div>
                </div>
                ) : (
                <div className="flex items-start justify-center w-full h-full">
                    {homes.map(home => <HomeCard key={home.id} home={home} />)}
                </div>
            )}
        </main>

    );
}


export default FavoritesPage;