import { Modal } from 'antd';
import { currentUrl } from '../Pages/SearchPage';
import SingleMarkerMap from './SingleMarkerMap';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { HeartTwoTone, HeartFilled } from '@ant-design/icons';
import Avatar from 'antd/es/avatar/avatar';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from "dayjs";
import TextArea from 'antd/es/input/TextArea';
import { CheckCircleFilled, CloseCircleFilled, EditFilled , HomeFilled } from '@ant-design/icons';
import { IoBed } from "react-icons/io5";
import { BiSolidArea } from "react-icons/bi";
import { FaBath, FaBuilding} from "react-icons/fa";
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import axios from 'axios';
import DefaultProfilePicture from './../DefaultProfilePhoto.png';


function HomeModal({ show, setShow, home }: { show: boolean; setShow: () => void; home: { id: number, title: string, photo: string[] , price: string, type: string, coordinates: {lat: number, lng: number}, ownerMail: string, description: string, address:string, keyFeatures: {fiberInternet: boolean , airConditioner: boolean, floorHeating: boolean, fireplace: boolean, terrace: boolean, satellite: boolean, parquet: boolean, steelDoor: boolean, furnished: boolean, insulation: boolean}, numOfBathroom:number, numOfBedroom:number, numOfRooms:string, area:number, status:string, floor:number, totalFloor:number , houseType:string,}}) {
    const [value, setValue] = useState<Dayjs | null>(dayjs(null)); //eslint-disable-line
    const [isLiked, setIsLiked] = useState(false);
    
    const daytime = [
        {
          key: '1',
          label: 'Morning (8.00 - 11.00)',
          value: 'Morning',
        },
        {
          key: '2',
          label: 'Afternoon (11.00 - 14.00)',
          value: 'Afternoon',
        },
        {
          key: '3',
          label: 'Evening (14.00 - 17.00)',
          value: 'Evening',
        }
      ];
    const [ownerInfo, setOwnerInfo] = useState<{name: string, surname: string, phoneNumber: string, email: string, profilePicture: string}>();

      useEffect(() => {
        if (Cookies.get('Email')!=home.ownerMail) {
            //get owner name, surname, phone number and email, profile picture
            axios.get(`http://localhost:8080/api/getUser/${home.ownerMail}`)
            .then(response => {
                console.log(response.data);
                setOwnerInfo({
                    name: response.data.name,
                    surname: response.data.surname,
                    phoneNumber: response.data.phone,
                    email: response.data.email,
                    profilePicture: response.data.profilePicture
                });
            }
            ).catch(error => {
                console.log(error);
            }
            );
            console.log(ownerInfo);
        }
    }
    , [home.ownerMail]);

    return (
        <Modal
            open={show}
            onCancel={setShow}
            footer={null}
            width={window.innerWidth > 768 ? "75%" : "100%"}
            style={{ top: 0}}
            afterClose={() => {
                window.history.pushState({}, '', currentUrl);
                //rerender the featured page
                window.location.reload();
            }}
            centered
        >
            <div className="mt-4 h-full">
                <div className="rounded-lg overflow-hidden">
                    {<Images />}
                </div>
                <div className="flex justify-between mt-3">
                    <h1 className="text-3xl font-bold ">{home.title}</h1>
                    <div className="flex-row flex space-x-2">
                        <h1 className="text-3xl font-bold">{
                            home.type === "Sale" ? home.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₺" : home.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₺/month"
                        }</h1>
                        {
                        Cookies.get('Email') === home.ownerMail && home.status !== 'Rejected' && home.status !== 'Pending' && Cookies.get('currentPage') === 'myListings' &&
                        <button className="text-white animate-pulse p-2 text-[18px] font-bold bg-button-primary rounded-lg" onClick={
                            () => {
                                axios.post('http://localhost:8080/api/changeAvailability', {houseID: home.id, status: home.status === 'Available' ? home.type == 'Sale' ? 'Sold': 'Rented' : 'Available'})
                                .then(response => {
                                    console.log(response.data);
                                    if (response.data === true) {
                                        alert('House marked as ' + (home.status === 'Available' ? home.type == 'Sale' ? 'Sold': 'Rented' : 'Available'));
                                        window.history.pushState({}, '', currentUrl);
                                        window.location.reload();
                                    }
                                });
                            
                                }
                        }>{ home.status == 'Sold' ? 'Revert': home.status == 'Rented' ? 'Revert': `Mark as ${home.type === "Sale" ? "Sold" : "Rented"}`}</button>
                    }
                    </div>
                </div>
                <div className='pt-2 pb-1'>
                    <h6 className=" text-gray-600">{home.address}</h6>
                </div>
                <div className="flex flex-wrap md:flex-row gap-4 pt-4 pb-4 items-start">
                    <div className="flex flex-row items-center bg-slate-100 shadow-md gap-2 p-3 w-full md:w-auto overflow-hidden rounded-lg">
                        <IoBed className='text-[22px]'/>
                        <label className="text-[16px] font-bold">Bedroom :</label>
                        <label className="text-[16px]  font-bold">{home.numOfBedroom}</label>
                    </div>
                    <div className="flex flex-row items-center bg-slate-100 shadow-md gap-2 p-3 w-full md:w-auto overflow-hidden rounded-lg">
                        <FaBath className='text-[22px]'/>
                        <label className="text-[16px] font-bold">Bathroom :</label>
                        <label className="text-[16px] font-bold">{home.numOfBathroom}</label>
                    </div>
                    <div className="flex flex-row items-center bg-slate-100 shadow-md gap-2 p-3 w-full md:w-auto overflow-hidden rounded-lg">
                        <FaBuilding className='text-[22px]'/>
                        <label className="text-[16px] font-bold">Floor</label>
                        <label className="text-[16px] font-bold">{home.floor}/{home.totalFloor}</label>
                    </div>
                    <div className="flex flex-row items-center bg-slate-100 shadow-md gap-2 p-3 w-full md:w-auto overflow-hidden rounded-lg">
                        <BiSolidArea className='text-[22px]'/>
                        <label className="text-[16px] font-bold">Area</label>
                        <label className="text-[16px] font-bold">{home.area} m²</label>
                    </div>
                </div>
                <div className="flex flex-col items-start mt-2">
                    <h1 className="text-xl font-bold">Description</h1>
                    <p className="text-xl">{home.description}</p>
                </div>
                <div className="flex flex-col items-start mt-4">
                    <h1 className="text-xl font-bold">Key Features</h1>
                    <div className="flex flex-wrap w-full rounded-lg gap-2 pt-2">
                        {home?.keyFeatures && Object.keys(home.keyFeatures).map((key, index)=> {
                            return (
                                <div key={index} className={`flex flex-row items-center p-2 gap-2 rounded-lg ${
                                    index === 0 ? home.keyFeatures.fiberInternet ? "bg-green-100" : "bg-red-100" :
                                    index === 1 ? home.keyFeatures.airConditioner ? "bg-green-100" : "bg-red-100" :
                                    index === 2 ? home.keyFeatures.floorHeating ? "bg-green-100" : "bg-red-100" :
                                    index === 3 ? home.keyFeatures.fireplace ? "bg-green-100" : "bg-red-100" :
                                    index === 4 ? home.keyFeatures.terrace ? "bg-green-100" : "bg-red-100" :
                                    index === 5 ? home.keyFeatures.satellite ? "bg-green-100" : "bg-red-100" :
                                    index === 6 ? home.keyFeatures.parquet ? "bg-green-100" : "bg-red-100" :
                                    index === 7 ? home.keyFeatures.steelDoor ? "bg-green-100" : "bg-red-100" :
                                    index === 8 ? home.keyFeatures.furnished ? "bg-green-100" : "bg-red-100" :
                                    index === 9 ? home.keyFeatures.insulation ? "bg-green-100" : "bg-red-100" : "bg-red-100"
                                }`}>
                                    { index === 0 ? home.keyFeatures.fiberInternet ? <CheckCircleFilled className="text-green-500"/> : <CloseCircleFilled className="text-red-500"/> :
                                    index === 1 ? home.keyFeatures.airConditioner ? <CheckCircleFilled className="text-green-500"/> : <CloseCircleFilled className="text-red-500"/> :
                                    index === 2 ? home.keyFeatures.floorHeating ? <CheckCircleFilled className="text-green-500"/> : <CloseCircleFilled className="text-red-500"/> :
                                    index === 3 ? home.keyFeatures.fireplace ? <CheckCircleFilled className="text-green-500"/> : <CloseCircleFilled className="text-red-500"/> :
                                    index === 4 ? home.keyFeatures.terrace ? <CheckCircleFilled className="text-green-500"/> : <CloseCircleFilled className="text-red-500"/> :
                                    index === 5 ? home.keyFeatures.satellite ? <CheckCircleFilled className="text-green-500"/> : <CloseCircleFilled className="text-red-500"/> :
                                    index === 6 ? home.keyFeatures.parquet ? <CheckCircleFilled className="text-green-500"/> : <CloseCircleFilled className="text-red-500"/> :
                                    index === 7 ? home.keyFeatures.steelDoor ? <CheckCircleFilled className="text-green-500"/> : <CloseCircleFilled className="text-red-500"/> :
                                    index === 8 ? home.keyFeatures.furnished ? <CheckCircleFilled className="text-green-500"/> : <CloseCircleFilled className="text-red-500"/> :
                                    index === 9 ? home.keyFeatures.insulation ? <CheckCircleFilled className="text-green-500"/> : <CloseCircleFilled className="text-red-500"/> : null

                                    }
                                    <label className="text-gray-700">
                                        {index === 0 ? "Fiber Internet" :
                                        index === 1 ? "Air Conditioner" :
                                        index === 2 ? "Floor Heating" :
                                        index === 3 ? "Fireplace" :
                                        index === 4 ? "Terrace" :
                                        index === 5 ? "Satellite" :
                                        index === 6 ? "Parquet" :
                                        index === 7 ? "Steel Door" :
                                        index === 8 ? "Furnished" :
                                        index === 9 ? "Insulation" : null}
                                    </label>
                                </div>
                                );
                            }
                        )}
                    </div> 
                </div>
                <h1 className="text-xl font-bold my-4">Location</h1>
                <SingleMarkerMap marker={home} />
                {home.ownerMail !== Cookies.get('Email') &&
                    <div>
                    <h1 className="text-xl font-bold mt-4">Contact</h1>
                    <div className='flex flex-wrap items-center justify-start gap-4'> 
                        <div className="flex flex-col items-start">
                            <div className="flex flex-wrap items-center gap-4">
                                <Avatar size={85} src={ownerInfo?.profilePicture == undefined ? DefaultProfilePicture : ownerInfo.profilePicture} />
                                <div className="flex flex-col text-left gap-1 text-gray-900">
                                    <label className="text-[25px]">{ownerInfo?.name} {ownerInfo?.surname}</label>
                                    <a href={`mailto:${ownerInfo?.email}`} className="text-button-primary hover:text-button-primaryHover text-[12px]">{ownerInfo?.email}</a>
                                    <a href={`tel:+90${ownerInfo?.phoneNumber}`} className="text-button-primary hover:text-button-primaryHover text-[12px]">+90{ownerInfo?.phoneNumber}</a>
                                </div>
                            </div>
                        </div>
                        {Cookies.get('loggedIn') === 'true' &&
                            <div className="flex flex-row items-center justify-center space-x-2">
                            <div className="flex flex-col items-start space-y-2">
                                <DateTimePicker 
                                    //mobiletoolbar hidden
                                    
                                    label="Select Date"
                                    
                                    //disable past dates
                                    shouldDisableDate={(date) => {
                                        //disble past dates
                                        if (date && date.isBefore(dayjs().startOf('day'))) {
                                            return true;
                                        }
                                        return false;
                                    }}
                                    
                                    views={['year', 'month', 'day']}
                                    orientation='landscape'
                                    onChange={setValue}
                                    closeOnSelect={true}
                                    slotProps={{ textField: { size: 'small', color: 'success'}}}
                                />
                                <select className="border-1 w-full border-[#c4c4c4] focus:border-button-primary hover:border-button-primary focus:ring-0 p-2 rounded-lg" defaultValue={daytime[1].value}>
                                    {daytime.map((time) => {
                                        return (
                                            <option key={time.key} value={time.value}>{time.label}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                                <TextArea className='p-2 border-1 min-w-[200px] border-[#c4c4c4] focus:border-button-primary hover:border-button-primary focus:ring-0' placeholder="Type your message here" autoSize={{ minRows: 1, maxRows: 3 }} variant="outlined" />
                                <button className="bg-button-primary text-white rounded-lg p-2 min-w-[200px]" onClick={() => {
                                    //send the meeting request
                                    //console.log(value);
                                    console.log(value?.format('YYYY-MM-DD'));
                                    console.log('Message:', document.querySelector('textarea')?.textContent);
                                    console.log('date:', value?.format('YYYY-MM-DD').toString());
                                    console.log('daytime:', document.querySelector('select')?.value);
                                    if (value?.format('YYYY-MM-DD').toString() === 'Invalid Date') {
                                        alert('Please select a date and time');
                                        return;
                                    }
                                    axios.post('http://localhost:8080/api/addReservation', {
                                        houseID: home.id,
                                        ownerMail: home.ownerMail,
                                        clientMail: Cookies.get('Email'),
                                        date: (value?.format('YYYY-MM-DD')!).toString(),
                                        message: document.querySelector('textarea')?.textContent,
                                        daytime: document.querySelector('select')?.value
                                    }).then(response => {
                                        console.log(response.data);
                                        if (response.data === true) {
                                            alert('Meeting request sent successfully');
                                        }
                                        else{
                                            alert('Meeting request could not be sent');
                                        }
                                    }
                                    );
                                    }}>Schedule a Meeting
                                </button>
                            </div>
                        </div>}
                    </div>
                </div>}
            </div>
        </Modal>
    );

    function Images()
    {
        const [isLiked, setIsLiked] = useState(false);
        const [isLikeHovered, setIsLikeHovered] = useState(false);
        const [images, setImages] = useState<HTMLImageElement[]>([]);

        useEffect(() => {
            if (Cookies.get('loggedIn') === 'true') {
              axios.get('http://localhost:8080/api/checkFavorite', {
                params: {
                  houseID: home.id,
                  ownerMail: Cookies.get('Email')
                }
              })
              .then(response => {
                console.log("Response:"+response.data);
                if (response.data === true) {
                  setIsLiked(true);
                }
              });
            }
          }, [home.id]);

        for (let i = 0; i < home.photo.length; i++) {
            const image = new Image();
            image.src = home.photo[i];
            images.push(image);
        }

        useEffect(() => {
            const loadedImages: HTMLImageElement[] = [];
            for (let i = 0; i < home.photo.length; i++) {
              const image = new Image();
              image.onload = () => {
                loadedImages.push(image);
                setImages(loadedImages);
              };
              image.src = home.photo[i];
            }
          }, []);

        return (
            <div className="relative">
                <div className={`absolute m-1 z-10 top-1 left-1 p-1 px-2 ${home.type=="Sale" ? "bg-green-500": "bg-button-secondary"} rounded-lg shadow-md flex items-center justify-center`}> {/*eslint-disable-line eqeqeq*/}
                    <span className="text-white font-bold text-[15px]">{home.type}</span>
                </div>
                <div className="absolute z-10 bottom-0 right-0 mb-2 mr-2 text-white text-[30px] cursor-pointer" onClick={() => {}}> 
                    <div className="rounded-full bg-white w-11 h-11 flex items-center justify-center bg-transparent shadow-md"
                    onClick={
                        (e) => {

                            if (Cookies.get('loggedIn') === 'true') {
                                if (home.ownerMail === Cookies.get("Email")) {
                                window.location.href = '/editListing/' + home.id;
                                } else {
                                //setIsLiked(!isLiked);
                                if (!isLiked) {
                                    axios.post('http://localhost:8080/api/addFavorite', {houseID: home.id, ownerMail: Cookies.get("Email")})
                                    .then(response => {
                                    console.log(response.data);
                                    if (response.data === true) {
                                        setIsLiked(true);
                                    }
                                    });
                                }else
                                {
                                    axios.post('http://localhost:8080/api/removeFavorite', {houseID: home.id, ownerMail: Cookies.get("Email")})
                                    .then(response => {
                                    console.log(response.data);
                                    if (response.data === true) {
                                        setIsLiked(false);
                                    }
                                    });
                                }
                                }
                            } else {
                                window.location.href = '/login';
                            }
                            e.stopPropagation();
                        }
                    }
                    onMouseEnter={() => setIsLikeHovered(true)}
                    onMouseLeave={() => setIsLikeHovered(false)}
                    >
                        {home.ownerMail === Cookies.get("Email") ? ( // Check if the owner is 'Baran'
                            isLiked ? <EditFilled className='text-[#6fa3f7]' /> : isLikeHovered ? <EditFilled className='text-[#6fa3f7]' /> : <EditFilled className='text-[#e2e9ef]' />
                            ) : ( //if the owner is not matching, use default heart icons
                            isLiked ? <HeartFilled className='text-red-500'/> : isLikeHovered ? <HeartTwoTone twoToneColor={'#ef4444'}/> : <HeartTwoTone twoToneColor={'#9ca3af'}/>)
                        }
                    </div>
                </div>
                <Gallery>
                    <div className="grid grid-cols-5 grid-rows-6 gap-1 max-h-[512px]">
                        <div className="col-span-3 row-span-6 flex w-full">
                            <Item cropped
                                original={home.photo[0]}
                                thumbnail={home.photo[0]}
                                height={images[0].height}
                                width={images[0].width}
                                >
                                {({ ref, open }) => (
                                    <img ref={ref} onClick = {open} src={home.photo[0]} alt="House" className="w-full h-full flex cursor-pointer"/>
                                )}
                            </Item>
                    </div>
                        <div className="col-span-2 row-span-3 col-start-4">
                            <Item 
                                original={home.photo[1]}
                                thumbnail={home.photo[1]}
                                height={images[1].height}
                                width={images[1].width}
                                >
                                {({ ref, open }) => (
                                    <img ref={ref} onClick = {open} src={home.photo[1]} alt="House" className="flex w-full h-full cursor-pointer"/>
                                )}
                            </Item>
                        </div>
                        <div className="col-span-2 row-span-3 col-start-4 row-start-4">
                            <Item 
                                original={home.photo[2]}
                                thumbnail={home.photo[2]}
                                height={images[2].height}
                                width={images[2].width}
                                >
                                {({ ref, open }) => (
                                    <img ref={ref} onClick = {open} src={home.photo[2]} alt="House" className="flex w-full h-full cursor-pointer"/>
                                )}
                            </Item>
                        </div>
                    </div>
                    
                    {/*
                    Burada gridde gösterilmeyen fotolar yer alacak, 
                    burdakiler sadece tam ekran olunca erişilebilir
                    */}
                    {
                        home.photo.slice(3).map((photo, index) => {
                            
                            return (
                                <Item 
                                    key = {index} 
                                    original={photo}
                                    thumbnail={photo}
                                    height={images[index+3].height}
                                    width={images[index+3].width}
                                    >
                                    {({ ref, open }) => (
                                        <img ref={ref} onClick = {open} src={photo} alt="House" className="w-0 h-0"/>
                                    )}
                                </Item>
                            );
                        })
                    }
                </Gallery> 
            </div>
        );
    }
}

export default HomeModal;
