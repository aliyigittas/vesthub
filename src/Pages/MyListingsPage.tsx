import React, { useEffect, useState } from "react";
import HomeCard from "../Components/HomeCard";
import Cookies from "js-cookie";
//import homes from "../Components/TempHomes";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import H1 from "../homePhotos/home1/1.jpeg";
import H2 from "../homePhotos/home1/2.jpeg";
import H3 from "../homePhotos/home1/3.jpeg";


function MyListingsPage() {
    return (
        <div className="flex flex-col items-center min-h-full bg-inherit p-4">
            <h1>My Listings</h1>
            <button
                className="rounded-md bg-button-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover"
                onClick={() => (window.location.href = "/addHome")}
            >
                <div className="flex items-center gap-2">
                    <PlusOutlined />
                    <span>Add a New Listing</span>
                </div>
            </button>
            <ListMyHouse /> {/* Pass filtered homes to ListMyHouse component */}
        </div>
    );
}


function ListMyHouse() {
    const [homes, setHomes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Function to fetch data
        const fetchHomes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/myListings/${Cookies.get('Email')}`); //`${Cookies.get('Email')}`
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
                }));
                setHomes(parsedHomes);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHomes();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    if (loading) {
        return <div className="flex justify-center items-center h-48">
          <h1>Loading...</h1>
        </div>;
    }

    return (
        <div className="flex flex-wrap justify-center items-center h-full bg-inherit">
            {homes.map(home => (<HomeCard key={home.id} home={home} />))}
        </div>
    );
}



export default MyListingsPage;