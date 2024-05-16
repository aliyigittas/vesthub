import Dragger from 'antd/es/upload/Dragger';
import AddHomeMarker from '../Components/AddHomeMarker';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

function CreateListingPage()
{

    const [address, setAddress] = useState<string | null>(null);
    const [getAddressLoading, setGetAddressLoading] = useState(false);
    const keyFeatures =[{
        name: "Fiber Internet",
        isAvailable: false
    },
    {
        name: "Air Conditioner",
        isAvailable: false
    },
    {
        name: "Floor Heating",
        isAvailable: false
    },
    {
        name: "Fireplace",
        isAvailable: false
    },
    {
        name: "Terrace",
        isAvailable: false
    },
    {
        name: "Satellite",
        isAvailable: false
    },
    {
        name: "Parquet",
        isAvailable: false
    },
    {
        name: "Steel Door",
        isAvailable: false
    },
    {
        name: "Furnished",
        isAvailable: false
    },
    {
        name: "Insulation",
        isAvailable: false
    }
    ];

    return (
        <div className="min-w-screen min-h-screen place-items-center flex sm:flex-row flex-col p-4 bg-backColor space-y-4 gap-4">
            <div className="flex justify-center items-center flex-col sm:mx-auto sm:w-full sm:max-w-sm gap-4">
            <Dragger
                name="file"
                multiple={true}
                listType="picture"
                className="w-full bg-gray-300 text-white rounded-md"
            >
                <p className="ant-upload-drag-icon text-button-primary">
                <InboxOutlined className='text-white'/>
                </p>
                <p className="ant-upload-text">Click or drag photo(s) to this area to upload</p>
                <p className="ant-upload-hint">Upload a photo of the house.</p>
            </Dragger>
                <AddHomeMarker />
            </div>

            <div className="mx-auto w-full max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleCreateListing}>
                    <div>
                        <label className="block text-sm font-medium ">Title</label>
                        <input id="name" name="name" type="text" autoComplete="name" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Address</label>
                        
                        <input id="fullAddress" name="fullAddress" type="text" autoComplete="address" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                        <button type="button" className="mt-2 flex w-full justify-center rounded-md bg-button-primary py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover disabled:bg-opacity-50" onClick={async ()=>{
                            const address= await GeoCodeFromGMaps();
                            if (address !== "Address could not be found.")
                            {
                                document.getElementById("fullAddress")?.setAttribute("value", address);
                            }
                            else
                            {
                                alert("Address could not be found. Please make sure location services are enabled.");
                            }
                        }}
                        disabled={getAddressLoading}
                        
                        >
                            {!getAddressLoading ? "Get Address from Current Location" : 
                            <div className="flex justify-center items-center gap-2">
                                <LoadingOutlined />
                                <span>Loading...</span>
                            </div>
                            }
                        </button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Price</label>
                        <input id="price" name="price" type="number" autoComplete="price" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Description</label>
                        <textarea id="description" name="description" required className="mt-2 block w-full rounded-md max-h-screen py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Key Features</label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {
                                keyFeatures.map((feature, index) => {
                                    return (
                                        <div key={index} className="flex items-center">
                                            <input id={feature.name} name={feature.name} type="checkbox" className="w-4 h-4 text-button-primary rounded focus:ring-0 accent-button-primary" onChange={(e) => keyFeatures[index].isAvailable = e.target.checked}/>
                                            <label htmlFor={feature.name} className="ml-2 text-sm">{feature.name}</label>
                                        </div>
                                    );
                                })
                            }
                        </div>

                    </div>
                    <input type="submit" className="flex w-full justify-center rounded-md bg-button-primary py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover" value="Add House" onClick={()=>{}}/>
                </form>
                <div className="mt-3 flex flex-row items-center justify-between">
                    <label>Return to the main page?</label>
                    <button className="font-semibold text-button-primary hover:text-button-primaryHover" onClick={() => window.location.href = '/'}>Main page</button>
                </div>
            </div>
        </div>
    );

    function handleCreateListing(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        Cookies.remove("homefullAddress");
        const data = new FormData(event.currentTarget);
        const title = data.get('name') as string;
        const fullAddress = data.get('fullAddress') as string;
        const price = data.get('price') as string;
        const description = data.get('description') as string;
        const keyFeaturesToSend = keyFeatures.filter(feature => feature.isAvailable).map(feature => feature.name);
        axios.post('http://localhost:8080/api/CreateListing', {
            title: title,
            fullAddress: fullAddress,
            price: price,
            description: description,
            keyFeatures: keyFeaturesToSend
        })
        .then(function (response) {
            console.log(response);
            //window.location.href = '/';
        })
        .catch(function (error) {
            console.log(error);
            //window.location.href = '/';
        });
    }

    //bu daha net ve hızlı ama limitli
    async function GeoCodeFromGMaps() :Promise<string> {
        setGetAddressLoading(true);
        try
        {
            const response =await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${Cookies.get("latitude")},${Cookies.get("longitude")}&key=AIzaSyADLFlKMT50syOfOGB0H0gavooIOrjC3m4`);
            console.log(response.data.results);
            Cookies.set("homefullAddress", response.data.results[0].formatted_address, { expires: (1 / 1440) * 60 }); // 1 hour
            setAddress(response.data.results[0].formatted_address);
            setGetAddressLoading(false);
            return response.data.results[0].formatted_address;
        }
        catch(error)
        {
            setGetAddressLoading(false);
            console.log(error);
            setAddress("Address could not be found.");
            return "Address could not be found.";
        }
    }

    //bu bedava
    //eslint-disable-next-line
    function GeoCodeFromGeoApify()
    {
        setGetAddressLoading(true);
        axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${Cookies.get("latitude")}&lon=${Cookies.get("longitude")}&apiKey=8af1068cc41e4c56b9103ad4db20ecff`)
        .then((response) => {
        console.log(response.data.features);
        setAddress(response.data.features[0].properties.formatted);
        setGetAddressLoading(false);
        })
        .catch((error) => {
        setGetAddressLoading(false);
        console.log(error);
        setAddress("Address could not be found.");
        });
    }
}

export default CreateListingPage;