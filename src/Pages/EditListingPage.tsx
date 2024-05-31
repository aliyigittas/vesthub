import Dragger from 'antd/es/upload/Dragger';
import AddHomeMarker from '../Components/AddHomeMarker';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { ButtonGroup } from 'reactstrap';
import { button } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

function EditListingPage() {
    const [homeDetails, setHomeDetails] = useState<any>(null);
    const { id } = useParams<{id: string}>();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/house/${id}`)
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
                                fiberInternet: response.data.fiberInternet === 1,
                                airConditioner: response.data.airConditioner === 1,
                                floorHeating: response.data.floorHeating === 1,
                                fireplace: response.data.fireplace === 1,
                                terrace: response.data.terrace === 1,
                                satellite: response.data.satellite === 1,
                                parquet: response.data.parquet === 1,
                                steelDoor: response.data.steelDoor === 1,
                                furnished: response.data.furnished === 1,
                                insulation: response.data.insulation === 1,
                            }
                        };
                        setHomeDetails(homedetails);
                    }
                });
        }
    }, [id]);

    


    const [selectedValue, setSelectedValue] = useState("Sale");
    const [address, setAddress] = useState<string | null>(null);
    const [getAddressLoading, setGetAddressLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [filters, setFilters] = useState({});

    //get the photos from homeDetails and append them to Upload component
    useEffect(() => {
        if (homeDetails) {
            Cookies.set("latitude", homeDetails.coordinates.lat.toString(), { expires: (1 / 1440) * 60 }); // 1 hour
            Cookies.set("longitude", homeDetails.coordinates.lng.toString(), { expires: (1 / 1440) * 60 }); // 1 hour
            const images = homeDetails.photo.map((photo: string, index: number) => {
                return {
                    uid: index,
                    name: `image-${index + 1}.png`,
                    status: 'done',
                    // get originfileobj from photo
                    originFileObj: new File([photo], `image-${index + 1}.png`, { type: 'image/png' }),
                    url: photo,
                };
            });
            setFileList(images);
        }
    }, [homeDetails]);

    const roomCount = [
        { key: '1', label: '1+1', value: '1+1' },
        { key: '2', label: '2+1', value: '2+1' },
        { key: '3', label: '3+1', value: '3+1' },
        { key: '4', label: '4+1', value: '4+1' },
        { key: '5', label: '5+1', value: '5+1' },
    ];
    const homeType = [
        { key: '1', label: 'Apartment', value: 'Apartment' },
        { key: '2', label: 'Villa', value: 'Villa' },
        { key: '3', label: 'Studio', value: 'Studio' },
    ];

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);
    
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const keyFeatures = [
        { name: "Fiber Internet", isAvailable: false },
        { name: "Air Conditioner", isAvailable: false },
        { name: "Floor Heating", isAvailable: false },
        { name: "Fireplace", isAvailable: false },
        { name: "Terrace", isAvailable: false },
        { name: "Satellite", isAvailable: false },
        { name: "Parquet", isAvailable: false },
        { name: "Steel Door", isAvailable: false },
        { name: "Furnished", isAvailable: false },
        { name: "Insulation", isAvailable: false }
    ];

    const addSearchFilter = (key: string, value: string) => {
        setFilters({
            ...filters,
            [key]: value,
        });
    };

    const handleUpdateListing = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Cookies.remove("homefullAddress");
        const data = new FormData(event.currentTarget);
        const title = data.get('name') as string;
        const fullAddress = data.get('fullAddress') as string;
        const price = data.get('price') as string;
        const description = data.get('description') as string;
        const bedroom = data.get('bedroom') as string;
        const bathroom = data.get('bathroom') as string;
        const area = data.get('area') as string;
        const floor = data.get('floor') as string;
        const totalFloor = data.get('totalFloor') as string;
        const roomCount = data.get('roomCount') as string;
        const houseType = data.get('houseType') as string;
        const city = data.get('city') as string;
        const distinct = data.get('distinct') as string;
        const street = data.get('street') as string;
        const country = homeDetails.country;
        const countryFromCookie = Cookies.get("homeCountry");   
        const cityFromCookie = Cookies.get("homeCity");
        const streetFromCookie = Cookies.get("homeStreet");
        const distinctFromCookie = Cookies.get("homeDistinct");
        const saleRent = selectedValue;
        var keyFeaturesToSend = keyFeatures.filter(feature => feature.isAvailable).map(feature => feature.name);

        if (fileList.length < 3) {
            alert("Please upload at least three images.");
            return;
        }

        if (parseInt(floor) > parseInt(totalFloor)) {
            alert("Floor should be smaller than total floor.");
            return;
        }

        const file_to_send: string[] = [];
        for (let i = 0; i < fileList.length; i++) {
            fileList[i].preview = await getBase64(fileList[i].originFileObj as FileType);
            file_to_send.push(fileList[i].preview?.toString() as string);
        }
        axios.post('http://localhost:8080/api/UpdateListing', {
            id: homeDetails.id,
            title: title,
            fullAddress: fullAddress,
            price: price,
            saleRent: saleRent,
            description: description,
            numOfBedroom: bedroom,
            numOfBathroom: bathroom,
            numOfRooms: roomCount,
            area: area,
            floor: floor,
            totalFloor: totalFloor,
            houseType: houseType,
            distinct: distinctFromCookie === null ? distinct : distinctFromCookie,
            city: cityFromCookie === null ? city : cityFromCookie,
            street: streetFromCookie === null ? street : streetFromCookie,
            country: countryFromCookie === null ? country : countryFromCookie,
            lat: Cookies.get("latitude"),
            lng: Cookies.get("longitude"),
            ownerMail: Cookies.get("Email"),
            keyFeatures: keyFeaturesToSend,
            images: file_to_send
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    async function GeoCodeFromGMaps(): Promise<string> {
        setGetAddressLoading(true);
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${Cookies.get("latitude")},${Cookies.get("longitude")}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
            Cookies.set("homefullAddress", response.data.results[0].formatted_address, { expires: (1 / 1440) * 60 }); // 1 hour
            Cookies.set("homeCity", response.data.results[0].address_components[4].long_name, { expires: (1 / 1440) * 60 }); // 1 hour
            Cookies.set("homeDistinct", response.data.results

[0].address_components[3].long_name, { expires: (1 / 1440) * 60 }); // 1 hour
            Cookies.set("homeCountry", response.data.results[0].address_components[6].long_name, { expires: (1 / 1440) * 60 }); // 1 hour
            setAddress(response.data.results[0].formatted_address);
            return response.data.results[0].formatted_address;
        } catch (error) {
            console.error(error);
            return "Failed to get address";
        } finally {
            setGetAddressLoading(false);
        }
    }

    //get the photos from homeDetails and append them to Upload component
    




    if (!homeDetails) {
        return <div>Loading...</div>;
    }

    
    

    




    return (
        <div className="min-w-screen min-h-screen place-items-center flex sm:flex-row flex-col p-4 bg-backColor space-y-4 gap-4">
            <div className="flex justify-center items-center flex-col sm:mx-auto sm:w-full sm:max-w-sm gap-4">
                <div className='flex flex-col gap-3'>
                    <>
                        <Upload
                            //action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={(file) => {
                                setFileList([...fileList, file]);
                                return false;
                            
                            }
                            }
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                            wrapperStyle={{ display: 'none' }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                            />
                        )}
                    </>
                </div>
                <AddHomeMarker />
            </div>
            <div className="mx-auto w-full max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleUpdateListing}>    
                <div>
                        <label className="block text-sm font-medium ">Title</label>
                        <input id="name" name="name" type="text" autoComplete="name" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={homeDetails.title} />
                    </div>
                    <div className= "flex flex-row gap-2">
                        <div>
                            <label className="block text-sm font-medium ">City</label>
                            <input id="city" name="city" type="text" autoComplete="city" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={homeDetails.city}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">District</label>
                            <input id="distinct" name="distinct" type="text" autoComplete="distinct" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={homeDetails.distinct}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">Street</label>
                            <input id="street" name="street" type="text" autoComplete="street" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={homeDetails.street}/>
                        </div>    
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Address</label>
                        <input id="fullAddress" name="fullAddress" type="text" autoComplete="address" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={homeDetails.address}/>
                        <button type="button" className="mt-2 flex w-full justify-center rounded-md bg-button-primary py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover disabled:bg-opacity-50" 
                        onClick={async ()=>{
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
                    <div className='flex flex-row gap-2'>
                        <div>
                            <label className="block text-sm font-medium ">Number Of Bedrooms</label>
                            <input id="bedroom" name="bedroom" type="number" autoComplete="bedroom" required min={0} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={homeDetails.numOfBedroom}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">Number Of Bathrooms</label>
                            <input id="bathroom" name="bathroom" type="number" autoComplete="bathroom" required min={0} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={homeDetails.numOfBathroom}/>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <div>
                            <label className="block text-sm font-medium ">Area</label>
                            <input id="area" name="area" type="number" autoComplete="area" required min={0} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={homeDetails.area}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">Floor</label>
                            <input id="floor" name="floor" type="number" autoComplete="floor" required min={-2} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={homeDetails.floor}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">Total Floor</label>
                            <input id="totalFloor" name="totalFloor" type="number" autoComplete="totalFloor" required min={0} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={homeDetails.totalFloor}/>
                        </div> 
                    </div>
                    <div className='flex'>
                        <div className='flex flex-row gap-2'>
                            <label className="text-black items-center flex">Room Count</label>
                            <select
                                name="roomCount"
                                className="select select-text bg-gray-50 text-gray-900 text-sm rounded-lg p-2 flex w-full max-w-[200px]"
                                defaultValue={homeDetails.numOfRooms}
                                onChange={(e) => {
                                addSearchFilter('roomCount', e.target.value);
                                console.log(e.target.value);
                                }}
                            >
                                {roomCount.map((item) => (
                                <option key={item.key} value={item.value}>{item.label}</option>
                                ))}
                            </select>
                            <label className="text-black items-center flex">House Type</label>
                            <select
                                name="houseType"
                                className="select select-text bg-gray-50 text-gray-900 text-sm rounded-lg p-2 flex w-full max-w-[200px]"
                                defaultValue={homeDetails.type}
                                onChange={(e) => {
                                addSearchFilter('houseType', e.target.value);
                                }}
                            >
                                {homeType.map((item) => (
                                <option key={item.key} value={item.value}>{item.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className=' flex justify-center items-center'>
                        <ButtonGroup className="p-[3.5px] mt-3 bg-gray-800 bg-opacity-60">
                        <button className={`${selectedValue == "Sale" ? "bg-button-secondary" : "bg-opacity-40"} ${selectedValue == "Sale" ? "" : "hover:bg-gray-700"} text-white py-1.5 px-3 rounded transition duration-300 transform`} onClick={() => setSelectedValue("Sale")}>Sale</button> {/*eslint-disable-line eqeqeq*/}
                        <button className={`${selectedValue == "Rent" ? "bg-button-secondary" : "bg-opacity-10"} ${selectedValue == "Rent" ? "" : "hover:bg-gray-700"} text-white py-1.5 px-3 rounded transition duration-300 transform`} onClick={() => setSelectedValue("Rent")}>Rent</button> {/*eslint-disable-line eqeqeq*/}
                        </ButtonGroup>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Price</label>
                        <input id="price" name="price" type="number" autoComplete="price" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={homeDetails.price}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Description</label>
                        <textarea id="description" name="description" required className="mt-2 block w-full rounded-md max-h-screen py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={homeDetails.description}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Key Features</label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {
                                keyFeatures.map((feature, index) => {
                                    return (
                                        <div key={index} className="flex items-center">
                                            <input id={feature.name} name={feature.name} type="checkbox" className="w-4 h-4 text-button-primary rounded focus:ring-0 accent-button-primary" onChange={(e) => keyFeatures[index].isAvailable = e.target.checked} defaultChecked={feature.isAvailable}/>
                                            <label htmlFor={feature.name} className="ml-2 text-sm">{feature.name}</label>
                                        </div>
                                    );
                                })
                            }
                        </div>

                    </div>
                    <input type="submit" className="flex w-full justify-center rounded-md bg-button-primary py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover" value="Update House" onClick={()=>{

                    }}/>
                </form>
                <div className="mt-3 flex flex-row items-center justify-between">
                    <label>Return to the main page?</label>
                    <button className="font-semibold text-button-primary hover:text-button-primaryHover" onClick={() => window.location.href = '/'}>Main page</button>
                </div>
            </div>
        </div>
    );
}

export default EditListingPage;