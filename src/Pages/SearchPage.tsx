import { useEffect, useState } from "react";
import HomeCard from "../Components/HomeCard";
import MultiMarkerMap from "../Components/MultiMarkerMap";
import axios from "axios";
import { ButtonGroup } from "reactstrap";


export const currentUrl = window.location.href;
const searchParamMatch = currentUrl.match(/\/search\/([^&]*)/);
const typeParamMatch = currentUrl.match(/&type=([^&]*)/);
const typeValue = typeParamMatch && typeParamMatch[1] ? typeParamMatch[1] : 'sale'; //sale is default
const searchValue = searchParamMatch && searchParamMatch[1] ? searchParamMatch[1] : '';
var searchtext = decodeURIComponent(searchValue);
var countryText = '';
var cityText = '';
var districtText = '';

console.log(typeValue);

//const dummyArray = [0,1,2,3];

const homeType = [
  {
    key: '1',
    label: 'All',
    value: 'All',
  },
  {
    key: '2',
    label: 'Apartment',
    value: 'Apartment',
  },
  {
    key: '3',
    label: 'Villa',
    value: 'Villa',
  },
  {
    key: '4',
    label: 'Studio',
    value: 'Studio',
  },
];

const roomCountOpt = [
  {
    key: '1',
    label: 'All',
    value: 'All',
  },
  {
    key: '2',
    label: '1+1',
    value: '1+1',
  },
  {
    key: '3',
    label: '2+1',
    value: '2+1',
  },
  {
    key: '4',
    label: '3+1',
    value: '3+1',
  },
  {
    key: '5',
    label: '4+1',
    value: '4+1',
  },
  {
    key: '6',
    label: '5+1',
    value: '5+1',
  },
];

function SearchPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    setSelectedValue(typeValue);
  } , [typeValue]);

  var houseType = 'All';
  var roomCount = 'All';
  var minPrice = -1;
  var maxPrice = -1;
  var listingDate = "All"; //eslint-disable-line no-unused-vars
  var minArea = -1;
  var maxArea = -1;
  var saleRent = 'sale';


  if (window.location.href.includes('houseType')) {
    houseType = window.location.href.split('houseType=')[1].split('&')[0];
    console.log(houseType);
  }

  if (window.location.href.includes('roomCount')) {
    roomCount = window.location.href.split('roomCount=')[1].split('&')[0];
    console.log(roomCount);
  }

  if (window.location.href.includes('minPrice')) {
    minPrice = parseInt(window.location.href.split('minPrice=')[1].split('&')[0]);
    console.log(minPrice);
  }

  if (window.location.href.includes('maxPrice')) {
    maxPrice = parseInt(window.location.href.split('maxPrice=')[1].split('&')[0]);
    console.log(maxPrice);
  }

  if (window.location.href.includes('minArea')) {
    minArea = parseInt(window.location.href.split('minArea=')[1].split('&')[0]);
    console.log(minArea);
  }

  if (window.location.href.includes('maxArea')) {
    maxArea = parseInt(window.location.href.split('maxArea=')[1].split('&')[0]);
    console.log(maxArea);
  }

  if (window.location.href.includes('listingDate')) {
    listingDate = window.location.href.split('listingDate=')[1].split('&')[0];
    console.log(listingDate);
  }

  if (window.location.href.includes('type')) {
    saleRent = window.location.href.split('type=')[1].split('&')[0];
    console.log(saleRent);
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    setShowMap(!isChecked);
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/sideFilter/' + searchtext)
    .then(response => {
      if (response.data) {
        countryText = response.data.country;
        cityText = response.data.city;
        districtText = response.data.district;
      }
    });
  } , [searchtext]);


  const [homes, setHomes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch data
        const fetchHomes = async () => {
            try {
                console.log(window.location.pathname);
                const response = await axios.get(`http://localhost:8080/api${window.location.pathname}`); //`${Cookies.get('Email')}`

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
                setLoading(false);
            }
        };

        fetchHomes();
    }, []); // Empty dependency array means this effect runs once when the component mounts
    
    

  return (
    <div className= "bg-inherit p-6 flex min-h-full flex-row">
      <div className="sticky top-20 w-fit h-fit">
      
        <FilterHouses />
      </div>
      <div className="flex flex-col w-full space-y-2">
        <div className="pt-2 pl-5 flex flex-row justify-between">
          <div>
            <p className="text-[30px] font-bold text-black">Search Results for: {searchtext}</p>
            <p className="text-sm text-gray-600">10 results found</p>
          </div>
          <MapSwitcher />
        </div>
        <div className="flex items-start justify-center w-full h-full">
        {showMap ? 
          <div className="px-6 w-full h-full relative">
            <MultiMarkerMap homes={homes} />
          </div> :
          <div className="flex flex-wrap justify-center">
            
            { loading ? 
              <div className="flex justify-center items-center h-48">
                <h1>Loading...</h1>
              </div> :
            homes.length === 0 ? 
              <div className="flex justify-center items-center h-48">
                <h1>No results found</h1>
              </div> : homes.map((house, index) => (<HomeCard key={index} home={house} />))
            }
          </div>
        }
        </div>
        <div className="flex justify-center">
          {/*<button className="rounded-md bg-button-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover" onClick={() => handleShowAllHouses()}>Show All Houses</button>*/}
        </div>
      </div>
    </div>
  );

  function FilterHouses() {
    //tüm filtreleri toplayıp tek formda gönder ve url'i öyle değiştir
    // parse the searchtext with space delimeter
    var localCity = '';
    var localCountry = '';
    var localDistrict = '';
    
    if (searchtext.includes(' ')) {
      localCountry = searchtext.split(' ')[0];
      localCity = searchtext.split(' ')[1];
      localDistrict = searchtext.split(' ')[2];
    } else {
      localCountry = searchtext;
    }

    return <div>
      <form className="w-[350px] bg-button-primary flex flex-col space-y-4 p-4 items-start shadow-xl rounded-lg" onSubmit={searchFilter}>
        <div className="flex flex-row w-full justify-between gap-3 items-center">
          <label className="text-white">Country</label>
          <input type="search" id="country" className="max-w-[200px] p-3 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder={countryText} onChange={(e) => { countryText = e.target.value}} defaultValue={countryText == null ? localCountry : countryText} />
        </div>
        <div className="flex flex-row w-full justify-between gap-3 items-center">
          <label className="text-white">City</label>
          <input type="search" id="city" className="max-w-[200px] p-3 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder={cityText} onChange={(e) => { cityText = e.target.value}} defaultValue={cityText == null ? localCity : cityText} />
        </div>
        <div className="flex flex-row w-full justify-between gap-3 items-center">
          <label className="text-white">District</label>
          <input type="search" id="district" className="max-w-[200px] p-3 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder={districtText} onChange={(e) => { districtText = e.target.value}} defaultValue={districtText == null ? localDistrict : districtText} />
        </div>
        <div className="flex flex-row w-full justify-between">
        <label className="text-white items-center flex">House Type</label>
          <select className="select select-text bg-gray-50 text-gray-900 text-sm rounded-lg p-2 flex w-full max-w-[200px]" defaultValue={houseType} onChange={(e) => {
            //addSearchFilter('houseType', e.target.value);
            houseType = e.target.value;
            }}
            >
              {homeType.map((item) => (
                <option key={item.key}>{item.label}</option>
              ))}
          </select>
        </div>
        <div className="flex flex-row w-full justify-between">
        <label className="text-white items-center flex">Room Count</label>
          <select className="select select-text bg-gray-50 text-gray-900 text-sm rounded-lg p-2 flex w-full max-w-[200px]" defaultValue={roomCount} onChange={(e) => {
            //addSearchFilter('roomCount', e.target.value);
            roomCount = e.target.value;
            }}
            >
              {roomCountOpt.map((item) => (
                <option key={item.key}>{item.label}</option>
              ))}
          </select>
        </div>

        <div className=" flex flex-row w-full justify-between">
          <label className="text-white">Price (₺)</label>
          <div className="flex gap-2 flex-row">
            <input type="number" id="minPrice" className="max-w-[96px] p-1 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder="Min" min={0} onChange={(e) => {
              //addSearchFilter('minPrice', e.target.value);
              minPrice = parseInt(e.target.value);
            } }
            defaultValue={minPrice === -1 ? '' : minPrice}
            />
            <input type="number" id="maxPrice" className="max-w-[96px] p-1 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder="Max" min={0} onChange={(e) => {
              //addSearchFilter('maxPrice', e.target.value);
              maxPrice = parseInt(e.target.value);
            } }
            defaultValue={maxPrice === -1 ? '' : maxPrice}
            />
          </div>
        </div>

        <div className=" flex flex-row w-full justify-between">
          <label className="text-white">Area (m2)</label>
          <div className="flex gap-2 flex-row">
            <input type="number" id="minArea" className="max-w-[96px] p-1 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder="Min" min={0} onChange={(e) => {
              //addSearchFilter('minArea', e.target.value);
              minArea = parseInt(e.target.value);
              console.log(minArea);
            } }
            defaultValue={minArea === -1 ? '' : minArea}
            />
            <input type="number" id="maxArea" className="max-w-[96px] p-1 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder="Max" min={0} onChange={(e) => {
              //addSearchFilter('maxArea', e.target.value);
              maxArea = parseInt(e.target.value);
              console.log(maxArea);
            } }
            defaultValue={maxArea === -1 ? '' : maxArea}
            />
          </div>
        </div>

        <div className="w-full space-y-2">
          <label className="self-center text-white">Listing Date</label>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <input type="radio" id="last24hours"className="w-5 h-5 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary accent-button-secondary" name="selector" onChange={(e) => {

                listingDate = 'last24hours';
              } }
              defaultChecked = {listingDate === 'last24hours' ? true : false}
              />
              <label htmlFor="last24hours" className="text-white">Last 24 hours</label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <input type="radio" id="last3days" className="w-5 h-5 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary accent-button-secondary" name="selector" onChange={(e) => {
                  
                  listingDate = 'last3days';
                } }
                defaultChecked = {listingDate === 'last3days' ? true : false}
                />
              <label htmlFor="last3days" className="text-white">Last 3 Days</label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <input type="radio" id="last1week" className="w-5 h-5 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary accent-button-secondary" name="selector" onChange={(e) => {
                    listingDate = 'last1week';
                  } }
                  defaultChecked = {listingDate === 'last1week' ? true : false}
                  />
              <label htmlFor="last1week" className="text-white">Last 1 Week</label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <input type="radio" id="allTime" className="w-5 h-5 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary accent-button-secondary" name="selector" onChange={(e) => {
                    listingDate = 'All';
                  } }
                  defaultChecked = {listingDate === 'All' ? true : false}
              />
              <label htmlFor="allTime" className="text-white">All Time</label>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <ButtonGroup className="p-[3.5px] mt-3 bg-gray-800 bg-opacity-60">
            <button className={`${selectedValue == "sale" ? "bg-button-secondary" : "bg-opacity-40"} ${selectedValue == "sale" ? "" : "hover:bg-gray-700"} text-white py-1.5 px-3 rounded transition duration-300 transform`} onClick={() => setSelectedValue("sale")}>Sale</button> {/*eslint-disable-line eqeqeq*/}
            <button className={`${selectedValue == "rent" ? "bg-button-secondary" : "bg-opacity-10"} ${selectedValue == "rent" ? "" : "hover:bg-gray-700"} text-white py-1.5 px-3 rounded transition duration-300 transform`} onClick={() => setSelectedValue("rent")}>Rent</button> {/*eslint-disable-line eqeqeq*/}
          </ButtonGroup>
          <button className="text-white bg-button-secondary hover:bg-button-secondaryHover focus:outline-none font-medium rounded-lg text-sm px-4 py-2" type="submit">
            <div className="flex flex-row justify-between items-center gap-4">
              <div className="inset-y-0 start-0 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" /></svg>
              </div>
              <span className="pointer-events-none">Apply</span>
            </div>
          </button>
        </div>
      </form>
    </div>;
  }
  function searchFilter (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //delimeter is & for multiple filters, add the filter if it is not containing in the url
    var searchTextUpdated: string = countryText + ' ' + cityText + ' ' + districtText;
    
    if (Number.isNaN(minPrice))
      minPrice = -1;
    if (Number.isNaN(maxPrice))
      maxPrice = -1;
    if (Number.isNaN(minArea))
      minArea = -1;
    if (Number.isNaN(maxArea))
      maxArea = -1;


    var newUrl = '';
    newUrl = currentUrl.replace(new RegExp('/search/[^&]*', 'g'), '/search/' + searchTextUpdated);
    if (!newUrl.includes('houseType')) {
      newUrl += '&houseType=' + houseType;
    }
    if (!newUrl.includes('roomCount')) {
      newUrl += '&roomCount=' + roomCount;
    }
    if (!newUrl.includes('minPrice')) {
      newUrl += '&minPrice=' + minPrice;
    }
    if (!newUrl.includes('maxPrice')) {
      newUrl += '&maxPrice=' + maxPrice;
    }
    if (!newUrl.includes('minArea')) {
      newUrl += '&minArea=' + minArea;
    }
    if (!newUrl.includes('maxArea')) {
      newUrl += '&maxArea=' + maxArea;
    }
    if (!newUrl.includes('listingDate')) {
      newUrl += '&listingDate=' + listingDate;
    }
    if (!newUrl.includes('type')) {
      newUrl += '&type=' + selectedValue;
    }

    //but if it is already containing, update the filter
    if (newUrl.includes('houseType')) {
      newUrl = newUrl.replace(new RegExp('houseType=[^&]*', 'g'), 'houseType=' + houseType);
    }
    if (newUrl.includes('roomCount')) {
      newUrl = newUrl.replace(new RegExp('roomCount=[^&]*', 'g'), 'roomCount=' + roomCount);
    }
    if (newUrl.includes('minPrice')) {
      newUrl = newUrl.replace(new RegExp('minPrice=[^&]*', 'g'), 'minPrice=' + minPrice);
    }
    if (newUrl.includes('maxPrice')) {
      newUrl = newUrl.replace(new RegExp('maxPrice=[^&]*', 'g'), 'maxPrice=' + maxPrice);
    }
    if (newUrl.includes('minArea')) {
      newUrl = newUrl.replace(new RegExp('minArea=[^&]*', 'g'), 'minArea=' + minArea);
    }
    if (newUrl.includes('maxArea')) {
      newUrl = newUrl.replace(new RegExp('maxArea=[^&]*', 'g'), 'maxArea=' + maxArea);
    }
    if (newUrl.includes('listingDate')) {
      newUrl = newUrl.replace(new RegExp('listingDate=[^&]*', 'g'), 'listingDate=' + listingDate);
    }
    if (newUrl.includes('type')) {
      newUrl = newUrl.replace(new RegExp('type=[^&]*', 'g'), 'type=' + selectedValue);
    }
    console.log(newUrl);
    window.location.href = newUrl;
  }

  function MapSwitcher(){
    return (
    <div className="flex items-center">
        <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only' />
          <span className='label flex items-center text-sm font-medium text-gray-600'>
            List
          </span>
          <span
            className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1  transition-colors duration-300 ${isChecked ? 'bg-button-primary' : 'bg-[#CCCCCE]'}`}>
            <span
                className={`dot h-6 w-6 rounded-full shadow-lg bg-white ${isChecked ? 'translate-x-[28px]' : 'translate-x-0'}`}></span>
            </span>
          <span className='label flex items-center text-sm font-medium text-gray-600'>Map</span>
        </label>
    </div>
      );
  }

  //eslint-disable-next-line
  function getSearchText(event: React.FormEvent<HTMLFormElement>, selectedValue: string) {
    var currentUrl = window.location.href;
    var newUrl = '';
    event.preventDefault();
    const search = document.getElementById('search') as HTMLInputElement;
    newUrl = currentUrl.replace(new RegExp('search/[^&]*', 'g'), 'search/' + search.value);
    console.log(newUrl);
    window.location.href = newUrl;
  }
}

export default SearchPage;
