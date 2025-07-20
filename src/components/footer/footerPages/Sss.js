import React from "react";
import {
  Container,
  LeftContainer,
  RightContainer,
  MainBox,
} from "../../../pages/mainPages/Login";
import styled from "styled-components";

function Sss() {
  return (
    <Container>
      <LeftContainer>
        <MainBox style={{ color: "#fff" }}>
          <h1>Sıkça Sorulan Sorular</h1>
          <h3>Umarım yardımcı olabiliriz.</h3>
          <h4>
            Cevabı bulunmayan sorular için venusegitim2024@gmail.com adresine
            mail atabilirsiniz.
          </h4>
        </MainBox>
      </LeftContainer>
      <RightContainer>
        <MainBox>
          <Box>
            <details>
              <summary>Sayfanızın geliri nedir? Neden ücretsiz?</summary>
              <p>
                Platformumuz
                <strong>
                  öğrencilerimiz için sonsuza kadar ücretsiz kalacaktır.
                </strong>
                Bunu sağlamak için de sponsorlarımızdan gelen destekler ve
                öğretmenlerimizden alınan etkileşim ücreti kullanılmaktadır.
              </p>
            </details>
            <details>
              <summary>Matematik dışında diğer dersler de olacak mı?</summary>
              <p>
                Evet. Türkiye'de yaşayan bir öğrencinin her ne derse ihtiyacı
                var ise bu platformda olacak.
              </p>
            </details>
          </Box>
        </MainBox>
      </RightContainer>
    </Container>
  );
}

const Box = styled.div`
width:100%;
height:300px;
display:flex;
flex-direction:column;


@media (max-width: 768px) {
  summary,details,p,strong{
    color: white;
  }
}


`

export default Sss;
