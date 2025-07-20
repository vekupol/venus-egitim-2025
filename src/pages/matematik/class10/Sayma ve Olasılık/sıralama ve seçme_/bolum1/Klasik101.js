import React from "react";
import { Container } from "../../../../style/DerslerStyle";
import Alistirmalar from "../../../../../../components/lessons/Alistirmalar";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import styled from "styled-components";
import img1 from "./../../../../../../components/lessons/Boş Koordinat Sistemi (sadece 1. bölge).svg";

function Klasik101() {
  const sorular = [
    {
      id: 1,
      soru: (
        <>
          <InlineMath math={"\\frac{a}{b} = c"} /> başka bir örnek soru burada
          merhaba
        </>
      ),

      dogruCevap: "14",
      puan: 3,
    },
    {
      id: 2,
      soru: (
        <>
          <Image src={img1} alt={img1} />
        </>
      ),
      dogruCevap: "15",
      puan: 3,
    },
    {
      id: 3,
      soru: "Ali'nin kütüphanesinde 4 kırmızı, 3 mavi ve 2 yeşil kitap var. Ali, kaç farklı şekilde kitap seçebilir?",

      dogruCevap: "16",
      puan: 3,
    },
    {
      id: 4,
      soru: "Bir kutuda 5 kırmızı, 4 mavi ve 3 yeşil top var. Kutudan üç top seçildiğinde, kaç farklı seçim yapılabilir?",

      dogruCevap: "17",
      puan: 3,
    },
    {
      id: 5,
      soru: "Bir torbada 2 siyah, 3 beyaz ve 4 kırmızı top var. Torbadan 1 top seçiliyor. Kaç farklı şekilde top seçimi yapılabilir??",

      dogruCevap: "18",
      puan: 3,
    },
  ];
  return (
    <Container>
      <Alistirmalar sorular={sorular} />
    </Container>
  );
}

const Image = styled.img`
  width: 100%;
  max-width: 250px;
  padding-left: 10%;
  padding-right: 10%;
`;
export default Klasik101;
