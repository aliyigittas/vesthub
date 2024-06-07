import React from "react";

function About() {
    const people = [
        {
            name: 'Mehmet Kuzucu',
            role: 'Leader',
            imageUrl: 'https://media.licdn.com/dms/image/D4D03AQHMZNVQuyaZjw/profile-displayphoto-shrink_400_400/0/1679240366215?e=1719446400&v=beta&t=4xiG4iuMRprZ13nqhy1TZ6lAR___odUzfgxJRThw3bA'    
        },
        {
            name: 'Ali Taş',
            role: 'Head of Frontend',
            imageUrl: 'https://media.licdn.com/dms/image/D4D03AQEaefuMTTa7Bw/profile-displayphoto-shrink_400_400/0/1676402963098?e=1719446400&v=beta&t=nXuuk9YFnu4GRiWSU7U81NWJyIilQ2-sD1FnsGqwgmw'    
        },
        {
            name: 'Şevval Çetin',
            role: 'Head of Backend',
            imageUrl: 'https://media.licdn.com/dms/image/D4D03AQG-7pkLxBnbFg/profile-displayphoto-shrink_400_400/0/1677058164198?e=1719446400&v=beta&t=QFQl874qdSo-2z6lFmS1fo3EuFy3g5K-koLi6hG0YAw'
        },
        {   
            name: 'Şafak Gün',
            role: 'Head of Documentation',
            imageUrl: 'https://media.licdn.com/dms/image/D4D03AQFoC3EqM4zdJQ/profile-displayphoto-shrink_400_400/0/1708075535493?e=1723075200&v=beta&t=LaknkJF3H59xnjFac83ZtOe1VKJq010KywGMwVvJ-DU'
        },
        {   
            name: 'Baran Aslan',
            role: 'Head of Testing',
            imageUrl: 'https://media.licdn.com/dms/image/D4D03AQFb8mEzYCykhQ/profile-displayphoto-shrink_400_400/0/1680524183298?e=1719446400&v=beta&t=V3_Tk-04HQzUybAEzc-AuxtW8gmSjGJO2mlTXOmJP8I'
        }
      ];
      
  return (
    <div>
        <div id="about" className="">
            <hr className="my-8 h-0.5 border-t-0 bg-gray-900 p-[1px] mx-4" />
            <h1 className="text-3xl font-bold p-4">About VestHub</h1>
            <p className="text-lg p-4">VestHub is a real estate platform that allows users to find their dream homes. We provide a wide range of houses for sale or rent. We also offer a platform for users to list their houses for sale or rent. Our platform is designed to be user-friendly and easy to use. We aim to provide the best experience for our users and help them find their dream homes.</p>
        </div>
        <h1 className="text-3xl font-bold p-4">Meet the Team</h1>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
            {people.map((person, index) => (
                <div key={index} className="flex flex-col items-center bg-[#cdd1cf] bg-opacity-75 rounded-3xl p-4 justify-center hover:scale-105 transition-transform duration-300">
                    <img src={person.imageUrl} alt={person.name} className="w-48 h-48 rounded-2xl" />
                    <h2 className="mt-4 text-xl font-bold">{person.name}</h2>
                    <p className="text-gray-500">{person.role}</p>
                </div>
                ))}
        </div>
    </div>
  );
}

export default About;