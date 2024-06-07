/* eslint-disable */
import React, { useEffect, useState } from "react";
import HomeCard from "../Components/HomeCard";
import Cookies from "js-cookie";
//import homes from "../Components/TempHomes";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import vesthublogo from '../vesthublogo.png';
import loadingGif from '../loading.gif';


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
    Cookies.set('currentPage', 'myListings');
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

    if (loading) {
        return <div className="flex justify-center items-center h-48 flex-row">
        <img src={loadingGif} alt="Loading" className='w-[576px] h-[324px]' />
      </div>;
    }

    return (
        <main >
            {homes.length === 0 ? (
                <div className="text-center py-24">
                    <img src={vesthublogo} alt="VestHub Logo" className="mx-auto h-60 cursor-pointer animate-pulse" onClick={() => window.location.href = '/'} />
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl pt-3">
                        {loading ? (<div className="flex justify-center items-center h-48 flex-row">
          <img src={loadingGif} alt="Loading" className='w-[576px] h-[324px]' />
        </div>) : "No houses"}
                    </h1>          
                    <div className="mt-10">
                        <button className="rounded-md bg-button-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover" onClick={() => window.location.href = '/'}>Go back home</button>
                    </div>
                </div>
                ) : (
                <div className="flex flex-wrap items-start justify-center w-full h-full p-2">
                    {homes.map(home => <HomeCard key={home.id} home={home} />)}
                </div>
            )}
        </main>
    );
}



export default MyListingsPage;