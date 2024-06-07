import { useEffect, useRef, useState } from 'react';
import HomeCard from './HomeCard';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'js-cookie';



function FeaturedHouses() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = (scrollAmount:any) => {
    containerRef.current!.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }

  const handleScrollRight = (scrollAmount:any) => {
    containerRef.current!.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  const [homes, setHomes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch data
        const fetchHomes = async () => {
            try {
                const response = await axios.post('http://localhost:8080/api/featuredHomes', {email : Cookies.get('Email'), city : Cookies.get('City'), country: Cookies.get('Country')});
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
        return <div className="flex justify-center items-center h-48">
          <h1>Loading...</h1>
        </div>;
    }

    return (
      <div>
        <div className="flex justify-between p-4">
          {Cookies.get("loggedIn") === "true" ? <label className="bottom-0 top-0 flex text-2xl font-semibold items-center">Featured Houses in {Cookies.get('City')}</label> : <label className="bottom-0 top-0 flex text-2xl font-semibold items-center">Recent Houses</label>}
          <div className="flex justify-center items-center space-x-2 pr-6">
            <button className="bg-button-primary hover:bg-button-primaryHover text-white flex justify-center items-center p-2 rounded-xl h-10 w-10" onClick={() => handleScrollLeft(200)}><LeftOutlined /></button>
            <button className="bg-button-primary hover:bg-button-primaryHover text-white flex justify-center items-center p-2 rounded-xl h-10 w-10" onClick={() => handleScrollRight(200)}><RightOutlined /></button>
          </div>
        </div>
        <div className="snap-x flex flex-row overflow-x-auto" ref={containerRef}>
          {homes.map(({ id, title, photo, price, type, coordinates, address, ownerMail, keyFeatures, description, numOfBathroom, numOfBedroom, numOfRooms, area, status , floor , totalFloor , houseType}) => (
            <div className="snap-start" key={id}>
              <HomeCard key={id} home={{ id, title, photo, price, type, coordinates, address, ownerMail, keyFeatures, description, numOfBathroom, numOfBedroom, numOfRooms, area, status , floor , totalFloor , houseType}} />
            </div>
          ))}
        </div>
    </div>
    );
  }

export default FeaturedHouses;