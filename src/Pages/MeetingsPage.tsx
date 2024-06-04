import { useEffect, useState } from "react";
import HomeModal from "../Components/HomeModal";
import { Tab } from '@headlessui/react';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { MailOutlined, CloseOutlined } from '@ant-design/icons';

//export const currentUrlMeeting = window.location.href;

function MeetingsPage() {
  const [show, setShow] = useState(false);
  const [homeDetails, setHomeDetails] = useState<any>(null);
  const [keyFeatures, setKeyFeatures] = useState<any[]>([]);

  /*
  const meetings = [
    {
      id: 1,
      homeid: 3,
      date: '2022-01-01T10:00:00',
      ownerid: 1,
      customerid: 1,
      status: 'waiting',
    },
    {
      id: 2,
      homeid: 4,
      date: '2022-01-02T10:00:00',
      ownerid: 1,
      customerid: 2,
      status: 'completed'

    },
    {
      id: 3,
      homeid: 1,
      date: '2022-01-04T10:00:00',
      ownerid: 1,
      customerid: 2,
      status: 'completed'
    },
    {
      id: 4,
      homeid: 8,
      date: '2022-01-05T10:00:00',
      ownerid: 1,
      customerid: 2,
      status: 'waiting'
    },
    {
      id: 5,
      homeid: 1,
      date: '2022-01-06T10:00:00',
      ownerid: 1,
      customerid: 2,
      status: 'waiting'
    },
    
    {
      id: 6,
      homeid: 2,
      date: '2022-01-08T10:00:00',
      ownerid: 1,
      customerid: 2,
      status: 'completed'
    },
    {
      id: 7,
      homeid: 6,
      date: '2022-01-09T10:00:00',
      ownerid: 1,
      customerid: 2,
      status: 'waiting'
    },
    {
      id: 8,
      homeid: 10,
      date: '2022-01-10T10:00:00',
      ownerid: 1,
      customerid: 2,
      status: 'completed'
    },
    {
      id: 9,
      homeid: 9,
      date: '2022-01-11T10:00:00',
      ownerid: 1,
      customerid: 2,
      status: 'completed'
    },
    {
      id: 10,
      homeid: 2,
      date: '2022-01-12T10:00:00',
      ownerid: 1,
      customerid: 2,
      status: 'completed'
    },

  ];
  */

  
  var meeting = {
    id: 1,
    homeid: 3,
    date: '2022-01-01T10:00:00',
    ownerid: 1,
    ownerMail: '',
    customerid: 1,
    customerMail: '',
    status: 'Waiting',
  };

  const [meetings, setMeetings] = useState(
    [
      {
        id: 1,
        houseID: 3,
        date: '2022-01-01T10:00:00',
        ownerid: 1,
        ownerName: 'Ali Yiğit Taş',
        ownerProfilePicture: 'https://media.licdn.com/dms/image/D4D03AQEaefuMTTa7Bw/profile-displayphoto-shrink_400_400/0/1676402963098?e=1719446400&v=beta&t=nXuuk9YFnu4GRiWSU7U81NWJyIilQ2-sD1FnsGqwgmw',
        ownerMail: '',
        customerid: 1,
        clientMail: '',
        status: 'Waiting',
        daytime: 'Morning',
        message: 'Hello, I would like to see the house.',
      }
    ]
  );
  
/*
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      homeid: 3,
      date: '2022-01-01T10:00:00',
      ownerMail: '',
      customerMail: '',
      status: 'Waiting',
      daytime: 'Morning',
      message: 'Hello, I would like to see the house.',
    },
  ]);
*/


  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        console.log("Fetching meetings...");
        const response = await axios.get(`http://localhost:8080/api/getReservations/${Cookies.get("Email")}`); // Adjust API endpoint as necessary
        console.log("Meetings fetched successfully:", response.data);
        //meetings = response.data;
        setMeetings(response.data);
        console.log("Meetings: ",meetings);
        //console.log("HOME ID: ",meetings[0].homeid);
        
        //console.log(meetings);
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
        message.error("Failed to fetch meetings");
      }
    };

    fetchMeetings();
    /*
    const getOwnerDetails = async () => {
      try
      {
        for (var i = 0; i < meetings.length; i++)
        {
          axios.get(`http://localhost:8080/api/getUser/${meetings[i].ownerMail}`)
            .then((response) => {
              console.log(response.data);
              meetings[i].ownerName = response.data.name;
              meetings[i].ownerProfilePicture = response.data.profilePicture;
              console.log("Owner: ",meetings[i].ownerName);
            }
            )
            .catch((error) => {
              console.log(error); 
            });
        }
      }
      catch (error) {
        console.error("Failed to fetch owner details:", error);
        message.error("Failed to fetch owner details");
      }
      //console.log("Updated meeting: ",meetings);
    }
    getOwnerDetails();
    */
    
  }, []);

  /*
  useEffect(() => {
    axios.get(`http://localhost:8080/api/getReservations/${Cookies.get("Email")}`)
    .then((response) => {
      console.log(response.data);
      setMeetings(
        response.data.map((meeting:any) => {
          return {
            id: meeting.id,
            homeid: meeting.homeid,
            date: meeting.date,
            ownerMail: meeting.ownerMail,
            customerMail: meeting.customerMail,
            status: meeting.status,
            daytime: meeting.daytime,
            message: meeting.message,
          }
        })
      );
    }
    )
    .catch((error) => {
      console.log(error);
    });
  }
  , []);
*/

function updateMeetingStatus(meetingID:number , meetingStatus:String){
  axios.post('http://localhost:8080/api/updateMeetingStatus',{
    meetingID: meetingID,
    meetingStatus: meetingStatus
  })
  .then(response => {
      console.log(response);
      window.location.reload();
  })
}

  return (
    <div className=" p-4 flex-col items-center space-y-2 bg-inherit min-h-full"> {/* Add flex and flex-col classes */}
          <Tab.Group>
            <div className="flex items-center justify-items-center justify-center"> 
              <Tab.List className="flex justify-between p-1 space-x-1 bg-gray-300 rounded-2xl">
                <Tab className={({ selected }) =>
                  `${selected ? 'bg-button-primary text-white' : 'text-gray-600'} px-4 py-2 rounded-xl focus:outline-none`
                }>
                  Waiting Meetings Sent To Me
                </Tab>
                <Tab className={({ selected }) =>
                  `${selected ? 'bg-button-primary text-white' : 'text-gray-600'} px-4 py-2 rounded-xl focus:outline-none`
                }>
                  Waiting Meetings Sent By Me
                </Tab>
                <Tab className={({ selected }) =>
                  `${selected ? 'bg-button-primary text-white' : 'text-gray-600'} px-4 py-2 rounded-xl focus:outline-none`
                }>
                  Upcoming Meetings
                </Tab>
                <Tab className={({ selected }) =>
                  `${selected ? 'bg-button-primary text-white' : 'text-gray-600'} px-4 py-2 rounded-xl focus:outline-none`
                }>
                  Previous Meetings
                </Tab>
              </Tab.List>
            </div>
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <WaitingMeetingsSentToMe />
              </Tab.Panel>
              <Tab.Panel>
                <WaitingMeetingsSentByMe />
              </Tab.Panel>
              <Tab.Panel>
                <UpcomingMeetings />
              </Tab.Panel>
              <Tab.Panel>
                <PreviousMeetings />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
  );


  function WaitingMeetingsSentToMe()
  {
    var WaitingMeetingsSentToMe: any[] = [];
    for (var i = 0; i < meetings.length; i++) {
      if (meetings[i].status === 'Waiting' && meetings[i].ownerMail === Cookies.get("Email")) {
        WaitingMeetingsSentToMe = [...WaitingMeetingsSentToMe, meetings[i]];
      }
    }
    console.log("WAITING: ", meetings[0].ownerName);
    return (
      <div className="flex flex-wrap justify-center min-h-full w-full bg-inherit items-top gap-4">
        
        <div className="flex flex-col items-center space-y-2"> {/* Add flex and flex-col classes */}
          {show && <HomeModal show={show} setShow={() => 
              {
                window.history.pushState({}, "", "/meetings");
                setShow(false);
              }
            } home={homeDetails} />
          }
            <div className="flex flex-col bg-gray-300 w-[512px] h-[512px] rounded-xl p-2 gap-1 overflow-scroll">
              {WaitingMeetingsSentToMe.length === 0
              ? (
                <div className="flex flex-col items-center justify-items-center mt-2">
                  <h3 className="text-gray-600">No meetings</h3>
                </div>
              ) : ( WaitingMeetingsSentToMe.map((meeting, index) => {
                return (
                  <div className="justify-between w-full h-fit items-center p-2 bg-[#e5e7e6] flex flex-row gap-3 rounded-xl shadow-md" key={index}>
                    
                    <img src='https://media.licdn.com/dms/image/D4D03AQEaefuMTTa7Bw/profile-displayphoto-shrink_400_400/0/1676402963098?e=1719446400&v=beta&t=nXuuk9YFnu4GRiWSU7U81NWJyIilQ2-sD1FnsGqwgmw' alt='Customer' className="w-12 h-12 rounded-full shadow-xl" />
                    <label className="flex justify-center items-center">{meeting.ownerName}</label>
                    <div className="flex flex-col justify-center items-center text-center">
                      <label>{meeting.date}</label>
                      <label>{meeting.daytime}</label>
                      
                    </div>
                    <button className="bg-button-secondary text-white rounded-xl p-1 hover:bg-button-secondaryHover" onClick={() => {
                      console.log("Home ID: ",meeting.houseID);
                      getHomeDetails(meeting.houseID); 
                      window.history.pushState({}, "", "/home/"+meeting.houseID);
                    }}>Home Details</button>
                    <button onClick={
                      () => {
                        message.open({
                          //type: 'info',
                          duration: 0,
                          content: (
                            <div>
                              {/*Close the message when x is pressed */}
                              <div className="flex justify-end">
                                <button onClick={() => message.destroy()}><CloseOutlined/></button>
                              </div>
                              <h4>{meeting.message ==='' ? 'No message': 'Message'}</h4>
                              <p>{meeting.message}</p>
                            </div>
                          )
                        });
                  
                      }
                    }>
                    <MailOutlined/>
                    </button>
                    <button onClick={() => updateMeetingStatus(meeting.id, 'Accepted')}>
                      <CheckCircleFilled className="text-green-500 hover:text-green-600 cursor-pointer" style={{ fontSize: '30px' }} />
                    </button>
                    <button onClick={() => updateMeetingStatus(meeting.id, 'Rejected')}>
                      <CloseCircleFilled className="text-red-500 hover:text-red-600 cursor-pointer" style={{ fontSize: '30px' }} />
                    </button>
                  </div>
                  
                );
              }
                ))
                }
          </div>
        </div>
      </div>
    );
  }

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

  function WaitingMeetingsSentByMe()
  {
    var WaitingMeetingsSentByMeCount = 0;
    for (var i = 0; i < meetings.length; i++) {
      if (meetings[i].status === 'Waiting' && meetings[i].clientMail === Cookies.get("Email")) {
        WaitingMeetingsSentByMeCount++;
      }
    }
    return (
      <div className="flex flex-col items-center space-y-2"> {/* Add flex and flex-col classes */}
        <div className="flex flex-col bg-gray-300 w-[512px] h-[512px] rounded-xl p-2 gap-1 overflow-scroll">
        {show && <HomeModal show={show} setShow={() => 
            {
              window.history.pushState({}, "", "/meetings");
              setShow(false);
            }
          } home={homeDetails} />
        }
          {WaitingMeetingsSentByMeCount === 0
          ? (
            <div className="flex flex-col items-center justify-items-center mt-2"> {/* Add flex and flex-col classes */}
              <h3 className="text-gray-600">No meetings</h3>
            </div>
          ) : ( meetings.map((meeting, index) => {
            console.log(meeting.clientMail);
            console.log(Cookies.get("Email"));
            return (
              meeting.status === 'Waiting' && meeting.clientMail === Cookies.get("Email") &&
              <div className="justify-between w-full h-fit items-center p-2 bg-[#e5e7e6] flex flex-row gap-3 rounded-xl shadow-md" key={index}>
                <img src='https://media.licdn.com/dms/image/D4D03AQEaefuMTTa7Bw/profile-displayphoto-shrink_400_400/0/1676402963098?e=1719446400&v=beta&t=nXuuk9YFnu4GRiWSU7U81NWJyIilQ2-sD1FnsGqwgmw' alt='Customer' className="w-12 h-12 rounded-full shadow-xl" />
                <label className="flex justify-center items-center">{meeting.ownerName}</label>
                <div className="flex flex-col justify-center items-center text-center">
                  <label>{meeting.date}</label>
                  <label>{meeting.daytime}</label>
                </div>
                <button className="bg-button-secondary text-white rounded-xl p-1 hover:bg-button-secondaryHover" onClick={() => {
                  console.log("Home ID: ",meeting.houseID);
                  getHomeDetails(meeting.houseID); 
                  window.history.pushState({}, "", "/home/"+meeting.houseID);
                }}>Home Details</button>
                <button onClick={
                  () => {
                    message.open({
                      //type: 'info',
                      duration: 0,
                      content: (
                        <div>
                          {/*Close the message when x is pressed */}
                          <div className="flex justify-end">
                            <button onClick={() => message.destroy()}><CloseOutlined/></button>
                          </div>
                          <h4>{meeting.message ==='' ? 'No message': 'Message'}</h4>
                          <p>{meeting.message}</p>
                        </div>
                      )
                    });
              
                  }
                }>
                <MailOutlined/>
                </button>
                <button onClick={() => updateMeetingStatus(meeting.id, 'Cancelled')}>
                  <CloseCircleFilled className="text-red-500 hover:text-red-600 cursor-pointer" style={{ fontSize: '30px' }} />
                </button>
              </div>
            );
          }
          ))}
      </div>
    </div>
    );
  }

  function UpcomingMeetings()
  {
    var UpcomingMeetingsCount = 0;
    for (var i = 0; i < meetings.length; i++) {
      if (meetings[i].status === 'Accepted') {
        UpcomingMeetingsCount++;
      }
    }
    console.log("UPCOMING: ",UpcomingMeetingsCount);
    return (
      <div className="flex flex-col items-center space-y-2"> {/* Add flex and flex-col classes */}
        <div className="flex flex-col bg-gray-300 w-[512px] h-[512px] rounded-xl p-2 gap-1 overflow-scroll">
          {UpcomingMeetingsCount === 0
          ? (
            <div className="flex flex-col items-center justify-items-center mt-2"> {/* Add flex and flex-col classes */}
              <h3 className="text-gray-600">No meetings</h3>
            </div>
          ) : ( meetings.map((meeting, index) => {
            return (
              meeting.status === 'Accepted' && //meeting.date > new Date().toISOString() &&
              <div className="justify-between w-full h-fit items-center p-2 bg-[#e5e7e6] flex flex-row gap-3 rounded-xl shadow-md" key={index}>
                <img src='https://media.licdn.com/dms/image/D4D03AQEaefuMTTa7Bw/profile-displayphoto-shrink_400_400/0/1676402963098?e=1719446400&v=beta&t=nXuuk9YFnu4GRiWSU7U81NWJyIilQ2-sD1FnsGqwgmw' alt='Customer' className="w-12 h-12 rounded-full shadow-xl" />
                <label className="flex justify-center items-center">{meeting.ownerName}</label>
                <div className="flex flex-col justify-center items-center text-center">
                  <label>{meeting.date}</label>
                </div>
                <button className="bg-button-secondary text-white rounded-xl p-1 hover:bg-button-secondaryHover" onClick={() => {
                  setShow(true);
                }}>Home Details</button>
                <button onClick={
                  () => {
                    message.open({
                      //type: 'info',
                      duration: 0,
                      content: (
                        <div>
                          {/*Close the message when x is pressed */}
                          <div className="flex justify-end">
                            <button onClick={() => message.destroy()}><CloseOutlined/></button>
                          </div>
                          <h4>{meeting.message ==='' ? 'No message': 'Message'}</h4>
                          <p>{meeting.message}</p>
                        </div>
                      )
                    });
              
                  }
                }>
                <MailOutlined/>
                </button>
                <button onClick={() => updateMeetingStatus(meeting.id, 'Cancelled')}>
                  <CloseCircleFilled className="text-red-500 hover:text-red-600 cursor-pointer" style={{ fontSize: '30px' }} />
                </button>
              </div>
            );
          }
          ))}
      </div>
    </div>
    );
  }

  function PreviousMeetings()
  {
    var PreviousMeetingsCount = 0;
    for (var i = 0; i < meetings.length; i++) {
      if (meetings[i].status === 'Accepted' && meetings[i].date < new Date().toISOString()) {
        PreviousMeetingsCount++;
      }
    }

    return (
      <div className="flex flex-col items-center space-y-2"> {/* Add flex and flex-col classes */}
        <div className="flex flex-col bg-gray-300 w-[512px] h-[512px] rounded-xl p-2 gap-1 overflow-scroll">
          {PreviousMeetingsCount === 0
          ? (
            <div className="flex flex-col items-center justify-items-center mt-2"> {/* Add flex and flex-col classes */}
              <h3 className="text-gray-600">No meetings</h3>
            </div>
          ) : ( meetings.map((meeting, index) => {
            return (
              <div className="justify-between w-full h-fit items-center p-2 bg-[#e5e7e6] flex flex-row gap-3 rounded-xl shadow-md" key={index}>
                <img src='https://media.licdn.com/dms/image/D4D03AQEaefuMTTa7Bw/profile-displayphoto-shrink_400_400/0/1676402963098?e=1719446400&v=beta&t=nXuuk9YFnu4GRiWSU7U81NWJyIilQ2-sD1FnsGqwgmw' alt='Customer' className="w-12 h-12 rounded-full shadow-xl" />
                <label className="flex justify-center items-center">Ali Yiğit Taş</label>
                <div className="flex flex-col justify-center items-center text-center">
                  <label>{meeting.date}</label>
                </div>
                <label className={`${meeting.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>{meeting.status === 'completed' ? 'Completed' : 'Cancelled'}</label>
                <button className="bg-button-secondary text-white rounded-xl p-1 hover:bg-button-secondaryHover" onClick={() => {
                  setShow(true);
                }}>Home Details</button>
              </div>
            );
          }
          ))}
      </div>
    </div>
    );
  }


}

export default MeetingsPage;
