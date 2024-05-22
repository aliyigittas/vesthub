import { useRef } from 'react';
import HomeCard from './HomeCard';
import homes from './TempHomes';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';

function FeaturedHouses() {

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = (scrollAmount:any) => {
    containerRef.current!.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }

  const handleScrollRight = (scrollAmount:any) => {
    containerRef.current!.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  axios.get('http://localhost:8080/api/featuredHomes').then(response => {
    console.log(response.data);
  });

    return (
      <div>
        <div className="flex justify-between p-4">
          <label className="bottom-0 top-0 flex text-2xl font-semibold items-center">Featured Houses</label>
          <div className="flex justify-center items-center space-x-2 pr-6">
            <button className="bg-button-primary hover:bg-button-primaryHover text-white flex justify-center items-center p-2 rounded-xl h-10 w-10" onClick={() => handleScrollLeft(200)}><LeftOutlined /></button>
            <button className="bg-button-primary hover:bg-button-primaryHover text-white flex justify-center items-center p-2 rounded-xl h-10 w-10" onClick={() => handleScrollRight(200)}><RightOutlined /></button>
          </div>
        </div>
        <div className="snap-x flex flex-row overflow-x-auto" ref={containerRef}>
          {homes.map(({ id, name, photo, price, type, coordinates, address, owner }) => (
            <div className="snap-start" key={id}>
              <HomeCard key={id} home={{ id, name, photo, price, type, coordinates, address, owner}} />
            </div>
          ))}
        </div>
    </div>
    );
  }

export default FeaturedHouses;