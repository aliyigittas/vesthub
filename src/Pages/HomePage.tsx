import { useEffect, useState } from 'react';
import House2 from '../House2.jpg';
import { ButtonGroup } from 'reactstrap';
import FeaturedHouses from '../Components/FeaturedHouses';
import HomeModal from '../Components/HomeModal';
import About from '../Components/About';
import axios from 'axios';

//if href contains home id, open modal i.e. /home/EvID

//optional home props
function HomePage({ home }: { home?: boolean }) {
  const [show, setShow] = useState(false);
  //take the home id from the url the id is the last part of the url
  const currentUrlLastPart = window.location.pathname?.split('/')?.pop(); //url'yi /'ye göre ayır ve sonuncuyu al
  const homeID = parseInt(currentUrlLastPart ?? ''); //sondaki id'yi al ve integer'a çevir


  //ev bilgilerini al varsa bir variable'a at
  const [homedetails, setHomeDetails] = useState<any>();
  useEffect(() => {
    if (homeID) {
      axios.get('http://localhost:8080/api/house/' + homeID)
      .then(response => {
        if (response.data) {
          const homedetails = 
          {
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
                insulation: response.data.insulation === 1 ? true : false,
            }
          }
          setHomeDetails(homedetails);
          setShow(true);
        }
      });
    }
  }
  , [homeID]);

  console.log(homedetails);

  return (
    <div>
      <main className="min-h-full place-items-center bg-backColor px-6 py-6 lg:px-8">
        <div className="">
          <div className="relative h-[25rem] text-center">
            <img
              src={House2}
              alt="House"
              className="absolute z-0 rounded-lg shadow-md object-cover w-full h-[25rem] filter brightness-50"
            />
            <div className="p-[20px] relative z-10">
              <h1 className="mt-4 text-3xl font-bold tracking-wide text-white sm:text-5xl">
                Welcome to VestHub
              </h1>
              <p className="text-white text-center font-bold">
                The best place to find your dream home
              </p>
              <SearchHouses />
            </div>
          </div>
          <FeaturedHouses />
          
          {home && homedetails && <HomeModal show={show} setShow={() => {
            window.location.href = '/';
            setShow(false);
          }} home={homedetails}/>}
          <About/>
        </div>
      </main>
    </div>
  );

  

  function SearchHouses() {
    const [selectedValue, setSelectedValue] = useState("sale");
    return (
      <div>
        <ButtonGroup className="p-[3.5px] mt-3 bg-gray-800 bg-opacity-60">
          <button className={`${selectedValue == "sale" ? "bg-button-secondary" : "bg-opacity-40"} ${selectedValue == "sale" ? "" : "hover:bg-gray-700"} text-white py-1.5 px-3 rounded transition duration-300 transform`} onClick={() => setSelectedValue("sale")}>Sale</button> {/*eslint-disable-line eqeqeq*/}
          <button className={`${selectedValue == "rent" ? "bg-button-secondary" : "bg-opacity-10"} ${selectedValue == "rent" ? "" : "hover:bg-gray-700"} text-white py-1.5 px-3 rounded transition duration-300 transform`} onClick={() => setSelectedValue("rent")}>Rent</button> {/*eslint-disable-line eqeqeq*/}
        </ButtonGroup>
        <div className="z-10 mt-5 md:px-32">
          <form className="relative" action="#" method="POST" onSubmit={(e) => getSearchText(e, selectedValue)}>
              <input type="search" id="search" className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg shadow-lg bg-gray-50 focus:outline-button-primary" placeholder="Search Houses or Enter Location" required />
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 top-2.5 bg-button-primary hover:bg-button-primaryHover focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/></svg>
                </div>
              </button>
          </form>
        </div>
      </div>
    );
  }

  function getSearchText(event: React.FormEvent<HTMLFormElement>, selectedValue: string) {
    var delimeter = "&";
    event.preventDefault();
    const search = document.getElementById('search') as HTMLInputElement;
    window.location.href = '/search/' + search.value + delimeter + 'type=' + selectedValue + delimeter +'houseType=All' + delimeter + 'roomCount=All' + delimeter + 'minPrice=-1' + delimeter + 'maxPrice=-1' + delimeter + 'minArea=-1' + delimeter + 'maxArea=-1' + delimeter + 'listingDate=All' + delimeter + 'flag=0';
    return window.location.href;
  }
}

export default HomePage;