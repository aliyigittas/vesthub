import Dragger from 'antd/es/upload/Dragger';
import AddHomeMarker from '../Components/AddHomeMarker';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { get } from 'http';
import { ButtonGroup } from 'reactstrap';
import { button } from '@material-tailwind/react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

function CreateListingPage()
{
    const [selectedValue, setSelectedValue] = useState("Sale");
    const [address, setAddress] = useState<string | null>(null);
    const [getAddressLoading, setGetAddressLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
    ]);
    const [filters, setFilters] = useState({});
    const roomCount = [
        {
          key: '1',
          label: '1+1',
          value: '1+1',
        },
        {
          key: '2',
          label: '2+1',
          value: '2+1',
        },
        {
          key: '3',
          label: '3+1',
          value: '3+1',
        },
        {
          key: '4',
          label: '4+1',
          value: '4+1',
        },
        {
          key: '5',
          label: '5+1',
          value: '5+1',
        },
      ];
      const homeType = [
        {
          key: '1',
          label: 'Apartment',
          value: 'Apartment',
        },
        {
          key: '2',
          label: 'Villa',
          value: 'Villa',
        },
        {
          key: '3',
          label: 'Studio',
          value: 'Studio',
        },
      ];
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as FileType);
        }
        
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
      };
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      );
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
    const addSearchFilter = (key: string, value: string) => {
        setFilters({
            ...filters,
            [key]: value,
        });
    };

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
                <form className="space-y-6" action="#" method="POST" onSubmit={handleCreateListing}>    
                <div>
                        <label className="block text-sm font-medium ">Title</label>
                        <input id="name" name="name" type="text" autoComplete="name" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                    </div>
                    <div className= "flex flex-row gap-2">
                        <div>
                            <label className="block text-sm font-medium ">City</label>
                            <input id="city" name="city" type="text" autoComplete="city" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" value={Cookies.get("homeCity")}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">District</label>
                            <input id="distinct" name="distinct" type="text" autoComplete="distinct" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" value={Cookies.get("homeDistinct")}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">Street</label>
                            <input id="street" name="street" type="text" autoComplete="street" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" value={Cookies.get("homeStreet")}/>
                        </div>    
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Address</label>
                        <input id="fullAddress" name="fullAddress" type="text" autoComplete="address" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" />
                        <button type="button" className="mt-2 flex w-full justify-center rounded-md bg-button-primary py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover disabled:bg-opacity-50"  onClick={async ()=>{
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
                            <input id="bedroom" name="bedroom" type="number" autoComplete="bedroom" required min={0} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">Number Of Bathrooms</label>
                            <input id="bathroom" name="bathroom" type="number" autoComplete="bathroom" required min={0} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <div>
                            <label className="block text-sm font-medium ">Area</label>
                            <input id="area" name="area" type="number" autoComplete="area" required min={0} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">Floor</label>
                            <input id="floor" name="floor" type="number" autoComplete="floor" required min={-2} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">Total Floor</label>
                            <input id="totalFloor" name="totalFloor" type="number" autoComplete="totalFloor" required min={0} className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                        </div> 
                    </div>
                    <div className='flex'>
                        <div className='flex flex-row gap-2'>
                            <label className="text-black items-center flex">Room Count</label>
                            <select
                                name="roomCount"
                                className="select select-text bg-gray-50 text-gray-900 text-sm rounded-lg p-2 flex w-full max-w-[200px]"
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
                    <input type="submit" className="flex w-full justify-center rounded-md bg-button-primary py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover" value="Add House" onClick={()=>{

                    }}/>
                </form>
                <div className="mt-3 flex flex-row items-center justify-between">
                    <label>Return to the main page?</label>
                    <button className="font-semibold text-button-primary hover:text-button-primaryHover" onClick={() => window.location.href = '/'}>Main page</button>
                </div>
            </div>
        </div>
    );

    async function handleCreateListing (event: React.FormEvent<HTMLFormElement>)
    {
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
        const city = Cookies.get("homeCity");
        const distinct = Cookies.get("homeDistinct");
        const street = Cookies.get("homeStreet");
        const country = Cookies.get("homeCountry");
        const saleRent = selectedValue;
        var keyFeaturesToSend = keyFeatures.filter(feature => feature.isAvailable).map(feature => feature.name);
        
        

        if(fileList.length < 3){
            alert("Please upload at least three image.");
            return;
        }        

        //floor shouldnt be bigger than total floor
        if(parseInt(floor) > parseInt(totalFloor)){
            alert("Floor should be smaller than total floor.");
            return;
        }

       

        var file_to_send:string[] = [];
        for (let i = 0; i < fileList.length; i++) {
            fileList[i].preview = await getBase64(fileList[i].originFileObj as FileType);
            file_to_send.push(fileList[i].preview?.toString() as string);
        }


        axios.post('http://localhost:8080/api/CreateListing', {
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
            distinct: distinct,
            city: city,
            street: street,
            country: country,
            lat: Cookies.get("latitude"),
            lng: Cookies.get("longitude"),
            ownerMail: Cookies.get("Email"),
            keyFeatures: keyFeaturesToSend,
            images: file_to_send
            
        })
        .then(function (response) {
            console.log(response);
            //window.location.href = '/';
        })
        .catch(function (error) {
            console.log(error);
            //window.location.href = '/';
        });

        axios.get('http://localhost:8080/api/getPhotos/21')
        .then(function (response) {
            console.log(response);
        })
    }

    //bu daha net ve hızlı ama limitli
    async function GeoCodeFromGMaps() :Promise<string> {
        setGetAddressLoading(true);
        try
        {
            const response =await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${Cookies.get("latitude")},${Cookies.get("longitude")}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
            console.log(response.data.results);
            Cookies.set("homefullAddress", response.data.results[0].formatted_address, { expires: (1 / 1440) * 60 }); // 1 hour
            Cookies.set("homeCity", response.data.results[0].address_components[4].long_name, { expires: (1 / 1440) * 60 }); // 1 hour
            Cookies.set("homeDistinct", response.data.results[0].address_components[3].long_name, { expires: (1 / 1440) * 60 }); // 1 hour
            Cookies.set("homeStreet", response.data.results[0].address_components[1].long_name, { expires: (1 / 1440) * 60 }); // 1 hour
            Cookies.set("homeCountry", response.data.results[0].address_components[5].long_name, { expires: (1 / 1440) * 60 }); // 1 hour
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