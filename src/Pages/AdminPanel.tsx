import { useEffect, useState } from "react";
import HomeModal from "../Components/HomeModal";
import axios from "axios";


function AdminPanel() {
    const [show, setShow] = useState(false);
    const [homes, setHomes] = useState<any[]>([]);

    useEffect(() => {
        // Function to fetch data
        const fetchHomes = async () => {
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
        };

        fetchHomes();
    }, []); // Empty dependency array means this effect runs once when the component mounts
    /*
    const updateStatus = async (id: number, status: string) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/updateStatus`, null , { params: { id, status } });
            console.log(response.data);
            // Optionally, refresh the home listings after updating the status
            const updatedHomes = homes.map(home => 
                home.id === id ? { ...home, status } : home
            );
            setHomes(updatedHomes);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };
    */

    // updateStatus function to update the status of a home listing
    function updateStatus(HomeID:number , Homestatus:String){
        axios.post('http://localhost:8080/api/updateStatus',{
            houseID: HomeID,
            status: Homestatus
        })
        .then(response => {
            console.log(response);
            window.location.reload();
        })
    }
     
  return (
    <div className="flex flex-col items-center justify-top min-h-full bg-inherit">
        <h1 className="text-4xl font-bold">Admin Panel</h1>
        <label className="text-lg mt-4">Waiting for listing approval</label>
        <div className="flex flex-wrap justify-center items-start">
        {homes.map((Home) => (
            <div>   
                <div className="flex flex-col w-full max-w-[600px] p-4">
                    <div className="flex flex-col w-full p-4 bg-gray-300 rounded-2xl space-y-3">
                        <div className="flex flex-row space-x-2">
                            <img src={Home.photo[0]} alt="placeholder" className="w-24 h-24 rounded-lg cursor-pointer" onClick={() => setShow(true)} />
                            <div className="flex flex-col">
                                <label className="text-lg font-semibold">{Home.title}</label>
                                <label className="text-sm">{Home.address}</label>
                                <label className="text-sm">{Home.price}</label>
                                <label className="text-sm text-ellipsis line-clamp-3">{Home.description}</label>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-2">
                            <button className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500" type="button" onClick={() => {
                                    updateStatus(Home.id, 'Available');
                                    alert('House accepted');
                                    }}>
                                Approve
                            </button>
                            <button className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500" type="button" onClick={() => {
                                    updateStatus(Home.id, 'Rejected');
                                    alert('House rejected');
                                    }}>
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
                <HomeModal show={show} setShow={() => setShow(false)} home={Home} />
            </div>  
            ))}
        
        
        </div>
        
    </div>
  );
}



export default AdminPanel;
