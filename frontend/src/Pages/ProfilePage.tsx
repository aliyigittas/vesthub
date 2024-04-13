import logo from './../logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface User {
    name: string;
    //LastName: string;
  }


function ProfilePage() {
    const [User, setUser] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    useEffect(() => {
        axios.get<User[]>('http://localhost:8080/getFromDB') //array olarak dönüyor
        .then((response) => {
            setLoading(false); // Loading'i kapatıyor
            setUser(response.data);
            console.log('Data fetched:', response.data);
        })
        .catch((error) => {
            setLoading(false);
            setError(true); 
            console.error('Error fetching data:', error);
        });
    }, []); 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button color="danger"
        onClick={() => { 
            window.location.href = '/'; // Bu şekilde anasayfaya dönülebiliyor
          }}>Geri git</Button>
        {error ? <p>Backendde sorun var!</p> : loading ? <p>Yükleniyor...</p> : <p>Merhaba {User[3].name}!</p>} 
        {/* Error olmazsa exception atıyor backend olmadığında, Loading koymayınca user gelmiyor */}
      </header>
    </div>
  );
}

export default ProfilePage;