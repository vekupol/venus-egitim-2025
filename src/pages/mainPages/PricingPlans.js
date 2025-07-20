import React from "react";
import { Container } from "./Login";
import styled from "styled-components";

function PricingPlans() {
  return (
    <Container>
      <Plans>
        <Plan>
          <Title>Bireysel</Title>
          <Price>
            1.000 TL <span>/ yıl</span>
          </Price>
          <Description>
            Hesabınıza özel, 1 tane aktivasyon kodu içerir. Bununla 1 bağlantı (
            öğrenci veya sınıf ) kurabilirsiniz. <br /> <span>.</span>
          </Description>
          <List>
            <li>Günlük, haftalık ve aylık raporlar</li>
            <li>Sınırsız ödevlendirme</li>
            <li>Sınırsız soru ve döküman gönderme</li>
            <li>Sınırsız bildirimler</li>
            <li>Otomatik hatırlatmalar</li>
          </List>
          <Button>Satın Al</Button>
        </Plan>
        <Plan>
          <Title>Eğitim Koçu</Title>
          <Price>
            7.500 TL <span>/ yıl</span>
          </Price>
          <Description>
            Hesabınıza özel, 10 tane aktivasyon kodu içerir. Bununla 10 bağlantı
            ( öğrenci veya sınıf ) kurabilirsiniz. <br /> <span>.</span>
          </Description>
          <List>
            <li>Günlük, haftalık ve aylık raporlar</li>
            <li>Sınırsız ödevlendirme</li>
            <li>Sınırsız soru ve döküman gönderme</li>
            <li>Sınırsız bildirimler</li>
            <li>Otomatik hatırlatmalar</li>
          </List>
          <Button>Satın Al</Button>
        </Plan>
        <Plan>
          <Title>Kurumlar İçin</Title>
          <Price>
            10.000 TL <span>/ yıl başlayan fiyatlar </span>
          </Price>
          <Description>
            Hesaplarınıza özel, dilediğiniz sayıda aktivasyon kodu içerir.
            Bununla dilediğiniz kadar bağlantı ( öğrenci veya sınıf )
            kurabilirsiniz.
          </Description>
          <List>
            <li>Günlük, haftalık ve aylık raporlar</li>
            <li>Sınırsız ödevlendirme</li>
            <li>Sınırsız soru ve döküman gönderme</li>
            <li>Sınırsız bildirimler</li>
            <li>Otomatik hatırlatmalar</li>
          </List>
          <Button>Satın Al</Button>
        </Plan>
      </Plans>
    </Container>
  );
}

const Plans = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Plan = styled.div`
  margin-top: 1rem;
  width: 310px;
  border-radius: 9px;
  box-shadow: 5px 5px 14px #666666, -5px -5px 14px #ffffff;
`;

const Title = styled.div`
  background-color: var(--third-color);
  text-align: center;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Price = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 1rem 0rem 1rem;
  margin-bottom: 1rem;

  span {
    font-size: 0.8rem;
    font-weight: normal;
    color: var(--main-color);
    display: block;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  background-color: var(--third-color);
  color: var(--main-color);
  padding: 1rem 0rem;
  border: 0.1rem solid var(--third-color);
  font-weight: bold;
  border-radius: 0px 0px 9px 9px;

  &:hover {
    background-color: var(--main-color);
    color: white;
    padding: 1rem;
    border: 0.1rem solid var(--main-color);
  }
`;

const Description = styled.div`
  padding: 0rem 1rem 1rem 1rem;
  font-size: 0.8rem;

  span {
    color: white;
  }
`;

const List = styled.div`
  padding: 0rem 1rem 1rem 1rem;

  li {
    padding: 0.5rem 0rem 0.5rem 0rem;
    font-size: 1rem;
    list-style-type: none;
    color: var(--main-color);
  }

  li::before {
    content: "✔ ";
    color: var(--main-color);
    font-size: 1rem;
    padding-right: 0.5rem;
  }
`;

export default PricingPlans;
