import { useEffect, useState } from "react";
import HomeModal from "../Components/HomeModal";
import axios from "axios";
import { message } from "antd";
import vesthublogo from './../vesthublogo.png';
import Cookies from "js-cookie";
import loadingGif from '../loading.gif';

function AdminPanel() {
    const [show, setShow] = useState(false);
    const [homes, setHomes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [homeDetails, setHomeDetails] = useState<any>(null);
    const [keyFeatures, setKeyFeatures] = useState<any[]>([]);

    if (Cookies.get('Email') !== 'admin@vesthub.com') {
        window.location.href = '/notFound';
    }

    useEffect(() => {
        // Function to fetch data
        const fetchHomes = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/adminListings'); //`${Cookies.get('Email')}`

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
                  city: home.city,
                  distinct: home.distinct,
                  street: home.street,
                  country: home.country,
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
            } catch (error) {
                console.error(error);

            }
            setLoading(false);
        };
        fetchHomes();
    }, [reload]);


    // updateStatus function to update the status of a home listing
    function updateStatus(HomeID:number , Homestatus:String){
        axios.post('http://localhost:8080/api/updateStatus',{
            houseID: HomeID,
            status: Homestatus
        })
        .then(response => {
            console.log(response);
            setReload(!reload);
        })
    }
    const [selectedHome, setSelectedHome] = useState<any>(null);

    useEffect(() => {
        //show modal
        show && selectedHome && setSelectedHome(selectedHome);
    } , [show, selectedHome]);


    function getHomeDetails(homeid: number) {
        axios.get(`http://localhost:8080/api/house/${homeid}`)
        .then(response => {
            if (response.data) {
                const homedetails = {
                    id: response.data.id,
                    title: response.data.title,
                    photo: response.data.images, //[H1,H2,H3]
                    price: response.data.price.toString(),
                    type: response.data.saleRent,
                    coordinates: { lat: response.data.lat, lng: response.data.lng },
                    address: response.data.fullAddress,
                    ownerMail: response.data.ownerMail,
                    description: response.data.description,
                    numOfBathroom: response.data.numOfBathroom,
                    numOfBedroom: response.data.numOfBedroom,
                    numOfRooms: response.data.numOfRooms,
                    area: response.data.area,
                    floor: response.data.floor,
                    city: response.data.city,
                    distinct: response.data.distinct,
                    street: response.data.street,
                    country: response.data.country,
                    totalFloor: response.data.totalFloor,
                    keyFeatures: {
                        fiberInternet: response.data.fiberInternet === 1 ? true : false,
                        airConditioner: response.data.airConditioner === 1 ? true : false,
                        floorHeating: response.data.floorHeating === 1 ? true : false,
                        fireplace: response.data.fireplace === 1 ? true : false,
                        terrace: response.data.terrace === 1 ? true : false,
                        satellite: response.data.satellite === 1 ? true : false,
                        parquet: response.data.parquet === 1 ? true : false,
                        steelDoor: response.data.steelDoor === 1 ? true : false,
                        furnished: response.data.furnished === 1 ? true : false,
                        insulation: response.data.insulation === 1 ? true : false
                    }
                };
                setHomeDetails(homedetails);
                console.log("EV DETAYLARI: ",homedetails);
                setKeyFeatures([
                    { name: "Fiber Internet", isAvailable: homedetails.keyFeatures.fiberInternet },
                    { name: "Air Conditioner", isAvailable: homedetails.keyFeatures.airConditioner },
                    { name: "Floor Heating", isAvailable: homedetails.keyFeatures.floorHeating },
                    { name: "Fireplace", isAvailable: homedetails.keyFeatures.fireplace },
                    { name: "Terrace", isAvailable: homedetails.keyFeatures.terrace },
                    { name: "Satellite", isAvailable: homedetails.keyFeatures.satellite },
                    { name: "Parquet", isAvailable: homedetails.keyFeatures.parquet },
                    { name: "Steel Door", isAvailable: homedetails.keyFeatures.steelDoor },
                    { name: "Furnished", isAvailable: homedetails.keyFeatures.furnished },
                    { name: "Insulation", isAvailable: homedetails.keyFeatures.insulation }
                ]);
                setShow(true);
            }
        });
        
      }

  return (
    <div className="flex flex-col items-center justify-top min-h-full bg-inherit">
        {show && <HomeModal show={show} setShow={() => 
              {
                window.history.pushState({}, "", "/adminPanel");
                setShow(false);
              }
            } home={homeDetails} />
          }
        <h1 className="text-4xl font-bold">Admin Panel</h1>
        { homes.length > 0 && !loading &&
            <label className="text-lg mt-4">Houses for approval are listed below:</label>}
        <div className="flex flex-wrap justify-center items-start">
        {homes.length === 0 && !loading &&
            <div className="text-center py-24">
            <img src={vesthublogo} alt="VestHub Logo" className="mx-auto h-60 cursor-pointer animate-pulse" onClick={() => window.location.href = '/'} />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl pt-3">
                {loading ? <div className="flex justify-center items-center h-48 flex-row">
          <img src={loadingGif} alt="Loading" className='w-[576px] h-[324px]' />
        </div> : "No houses to give approval"}
            </h1>          
            <div className="mt-10">
                <button className="rounded-md bg-button-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover" onClick={() => window.location.href = '/'}>Go back home</button>
            </div>
        </div>
        }
        {loading &&
        <label className="text-lg mt-4">Loading...</label>}
        {homes.length > 0 &&
        homes.map((Home) => (
            <div key={Home.id}>   
                <div className="flex flex-col w-full max-w-[600px] p-4">
                    <div className="flex flex-col w-full p-4 bg-gray-300 rounded-2xl space-y-3">
                        <div className="flex flex-row space-x-2">
                            <img src={Home.photo[0]} alt="placeholder" className="w-24 h-24 rounded-lg cursor-pointer" onClick={() => {
                                getHomeDetails(Home.id); 
                                window.history.pushState({}, "", "/home/"+Home.id);
                            }} />
                            <div className="flex flex-col">
                                <label className="text-lg font-semibold line-clamp-1">{Home.title}</label>
                                <label className="text-sm line-clamp-1">Address: {Home.address}</label>
                                <label className="text-sm line-clamp-1">Price: {Home.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ₺</label>
                                <label className="text-sm text-ellipsis line-clamp-3">Description: {Home.description}</label>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-2">
                            <button className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500" type="button" onClick={() => {
                                    updateStatus(Home.id, 'Available');
                                    message.success('House accepted');
                                    }}>
                                Approve
                            </button>
                            <button className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500" type="button" onClick={() => {
                                    updateStatus(Home.id, 'Rejected');
                                    message.success('House rejected');
                                    }}>
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>  
            ))}
        </div>
        
    </div>
  );
}

export default AdminPanel;
