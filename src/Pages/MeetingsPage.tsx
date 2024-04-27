import { useState } from "react";
import HomeModal from "../Components/HomeModal";
import homes from "../Components/TempHomes";
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

function MeetingsPage() {
  const [show, setShow] = useState(false);

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

  return (
    <div className="flex flex-wrap justify-center min-h-full w-full bg-inherit items-center gap-4">
      <HomeModal show={show} setShow={() => setShow(false)} home={homes[meetings[2].homeid]} />

      <div className="flex flex-col items-center space-y-2"> {/* Add flex and flex-col classes */}
          <h1>Meeting Schedule</h1>
          <div className="flex flex-col bg-gray-300 w-[512px] h-[512px] rounded-xl p-2 gap-1 overflow-scroll">
            {meetings.length <= 0 ? (
            <label className="text-gray-600">No meetings</label>
            ) : ( meetings.map((meeting, index) => {
              return (
                meeting.status === 'waiting' &&
                <div className="justify-between w-full h-fit items-center p-2 bg-[#e5e7e6] flex flex-row gap-3 rounded-xl shadow-md" key={index}>
                  <img src='https://media.licdn.com/dms/image/D4D03AQEaefuMTTa7Bw/profile-displayphoto-shrink_400_400/0/1676402963098?e=1719446400&v=beta&t=nXuuk9YFnu4GRiWSU7U81NWJyIilQ2-sD1FnsGqwgmw' alt='Customer' className="w-12 h-12 rounded-full shadow-xl" />
                  <label className="flex justify-center items-center">Ali Yiğit Taş</label>
                  <div className="flex flex-col justify-center items-center text-center">
                    <label>24 Nisan Çar 13:30</label>
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
      <div className="flex flex-col items-center space-y-2"> {/* Add flex and flex-col classes */}
          <h1>Previous Meetings</h1>
          <div className="flex flex-col bg-gray-300 w-[512px] h-[512px] rounded-xl p-2 gap-1 overflow-scroll">
            {meetings.length <= 0 ? (
            <label className="text-gray-600">No meetings</label>
            ) : ( meetings.map((meeting, index) => {
              return (

                <div className="justify-between w-full h-fit items-center p-2 bg-[#e5e7e6] flex flex-row gap-3 rounded-xl shadow-md" key={index}>

                  <img src='https://media.licdn.com/dms/image/D4D03AQEaefuMTTa7Bw/profile-displayphoto-shrink_400_400/0/1676402963098?e=1719446400&v=beta&t=nXuuk9YFnu4GRiWSU7U81NWJyIilQ2-sD1FnsGqwgmw' alt='Customer' className="w-12 h-12 rounded-full shadow-xl" />
                  <label className="flex justify-center items-center">Ali Yiğit Taş</label>
                  <div className="flex flex-col justify-center items-center text-center">
                    <label>24 Nisan Çar 13:30</label>
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
    </div>
  );
}

export default MeetingsPage;