import React,{useEffect, useState} from 'react'
import styled from'styled-components'
import { useNavigate } from 'react-router-dom';

function NotFound() {

    const [timer,setTimer]  = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const customInterval = setInterval(() =>{
            if (timer === 0) {
                navigate('/');
            }
            setTimer(timer - 1);
        },1000)
        return () => {
            clearInterval(customInterval);
        }
    },[timer]);

  return (
    <Container>
      <h1>Sayfa Bulunamadı </h1>
      <h1>404 Not Found</h1>
      <h2>{timer} saniye sonra anasayfaya gideceksiniz</h2>
    </Container>
  )
}


const Container = styled.div`
height: calc(100vh - 200px);
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

h1,h2{
  color: var(--main-color);
}
h2{
  margin-top: 50px;
}

`

export default NotFound
