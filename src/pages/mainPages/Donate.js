import React from "react";
import { Container, LeftContainer, MainBox, RightContainer } from "./Login";
import styled from "styled-components";

function Donate() {
  return (
    <Container>
      <LeftContainer>
        <MainBox style={{ color: "white" }}>
          <h1>Venüs Eğitime Destek Ol</h1>
          <h3 style={{ fontSize: "1.5rem" }}>
            Venüs Eğitim Vakfı kurmak için çalışmalarımız devam etmektedir. Bu
            süreçte eğitimlerimizin artarak devam edebilmesi için desteklerinize
            ihtiyacımız var.
          </h3>
        </MainBox>
      </LeftContainer>
      <RightContainer>
        <MainBox>
          <Div>
            <h1>Bize Nasıl Yardım Edebilirsin?</h1>
            <li>
              Sınırsız soru ve döküman ihtiyacımızdan dolayı bizlere soru ve
              döküman yazıp gönderebilirsiniz.Sorularınızı isminizle birlikte
              dilerseniz yayınlayabiliriz.
            </li>
            <li style={{ marginBottom: "1rem" }}>
              Video çekimi yapabilme imkanı olan öğretmenlerimiz platformumuzda
              bize yardımcı olabilir.
            </li>
            <li style={{ listStyleType: "none", fontWeight: "bold" }}>
              İletişim için; <br /> Mail adresimiz iletisim@venusegitim.com{" "}
              <br /> WhatsApp hattımız 0530 682 68 49{" "}
            </li>
          </Div>
        </MainBox>
      </RightContainer>
    </Container>
  );
}


const Div = styled.div`

@media (max-width:768px){
  color: white;
}
`

export default Donate;
