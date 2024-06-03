import { useEffect, useState } from "react";
import HomeModal from "../Components/HomeModal";
import homes from "../Components/TempHomes";
import { Tab } from '@headlessui/react';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";

function MeetingsPage() {
  const [show, setShow] = useState(false);

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
        homeid: 3,
        date: '2022-01-01T10:00:00',
        ownerid: 1,
        ownerMail: '',
        customerid: 1,
        customerMail: '',
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
        console.log(meetings);
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
        message.error("Failed to fetch meetings");
      }
    };

    fetchMeetings();
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
                <div className="flex flex-wrap justify-center min-h-full w-full bg-inherit items-top gap-4">
                  <div className="flex flex-col items-center space-y-2"> {/* Add flex and flex-col classes */}
                      <div className="flex flex-col bg-gray-300 w-[512px] h-[512px] rounded-xl p-2 gap-1 overflow-scroll">
                        {meetings.length <= 0 ? (
                        <label className="text-gray-600">No meetings</label>
                        ) : ( meetings.map((meeting, index) => {
                          return (
                            <div className="justify-between w-full h-fit items-center p-2 bg-[#e5e7e6] flex flex-row gap-3 rounded-xl shadow-md" key={index}>
                              <img src='https://media.licdn.com/dms/image/D4D03AQEaefuMTTa7Bw/profile-displayphoto-shrink_400_400/0/1676402963098?e=1719446400&v=beta&t=nXuuk9YFnu4GRiWSU7U81NWJyIilQ2-sD1FnsGqwgmw' alt='Customer' className="w-12 h-12 rounded-full shadow-xl" />
                              <label className="flex justify-center items-center">Ali Yiğit Taş</label>
                              <div className="flex flex-col justify-center items-center text-center">
                                <label>{meeting.date}</label>
                              </div>
                              <button className="bg-button-secondary text-white rounded-xl p-1 hover:bg-button-secondaryHover" onClick={() => {
                                setShow(true);
                              }}>Home Details</button>
                              <CheckCircleFilled className="text-green-500 hover:text-green-600 cursor-pointer" style={{ fontSize: '30px' }} />
                              <CloseCircleFilled className="text-red-500 hover:text-red-600 cursor-pointer" style={{ fontSize: '30px' }} />
                            </div>
                          );
                        }
                          ))}
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
              <div className="flex flex-col items-center space-y-2"> {/* Add flex and flex-col classes */}
                <div className="flex flex-col bg-gray-300 w-[512px] h-[512px] rounded-xl p-2 gap-1 overflow-scroll">
                  {meetings.length <= 0 ? (
                  <label className="text-gray-600">No meetings</label>
                  ) : ( meetings.map((meeting, index) => {
                    console.log(meeting.customerMail);
                    console.log(Cookies.get("Email"));
                    return (
                      meeting.status === 'Waiting' && meeting.customerMail === Cookies.get("Email") &&
                      <div className="justify-between w-full h-fit items-center p-2 bg-[#e5e7e6] flex flex-row gap-3 rounded-xl shadow-md" key={index}>
                        <img src='https://media.licdn.com/dms/image/D4D03AQEaefuMTTa7Bw/profile-displayphoto-shrink_400_400/0/1676402963098?e=1719446400&v=beta&t=nXuuk9YFnu4GRiWSU7U81NWJyIilQ2-sD1FnsGqwgmw' alt='Customer' className="w-12 h-12 rounded-full shadow-xl" />
                        <label className="flex justify-center items-center">Ali Yiğit Taş</label>
                        <div className="flex flex-col justify-center items-center text-center">
                          <label>{meeting.date}</label>
                        </div>
                        <CloseCircleFilled className="text-red-500 hover:text-red-600 cursor-pointer" style={{ fontSize: '30px' }} />
                        <button className="bg-button-secondary text-white rounded-xl p-1 hover:bg-button-secondaryHover" onClick={() => {
                          setShow(true);
                        }}>Home Details</button>
                      </div>
                    );
                  }
                  ))}
              </div>
            </div>
              

              </Tab.Panel>
              <Tab.Panel>
                <div className="flex flex-col items-center space-y-2"> {/* Add flex and flex-col classes */}
                    <div className="flex flex-col bg-gray-300 w-[512px] h-[512px] rounded-xl p-2 gap-1 overflow-scroll">
                      {meetings.length <= 0 ? (
                      <label className="text-gray-600">No meetings</label>
                      ) : ( meetings.map((meeting, index) => {
                        return (
                          meeting.status === 'Accepted' && meeting.date > new Date().toISOString() &&
                          <div className="justify-between w-full h-fit items-center p-2 bg-[#e5e7e6] flex flex-row gap-3 rounded-xl shadow-md" key={index}>
                            <img src='https://media.licdn.com/dms/image/D4D03AQEaefuMTTa7Bw/profile-displayphoto-shrink_400_400/0/1676402963098?e=1719446400&v=beta&t=nXuuk9YFnu4GRiWSU7U81NWJyIilQ2-sD1FnsGqwgmw' alt='Customer' className="w-12 h-12 rounded-full shadow-xl" />
                            <label className="flex justify-center items-center">Ali Yiğit Taş</label>
                            <div className="flex flex-col justify-center items-center text-center">
                              <label>{meeting.date}</label>
                            </div>
                            <CloseCircleFilled className="text-red-500 hover:text-red-600 cursor-pointer" style={{ fontSize: '30px' }} />
                            <button className="bg-button-secondary text-white rounded-xl p-1 hover:bg-button-secondaryHover" onClick={() => {
                              setShow(true);
                            }}>Home Details</button>
                          </div>
                        );
                      }
                      ))}
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
              <div className="flex flex-col items-center space-y-2"> {/* Add flex and flex-col classes */}
                    <div className="flex flex-col bg-gray-300 w-[512px] h-[512px] rounded-xl p-2 gap-1 overflow-scroll">
                      {meetings.length <= 0 ? (
                      <label className="text-gray-600">No meetings</label>
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
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          
        </div>











    
  );
}

export default MeetingsPage;