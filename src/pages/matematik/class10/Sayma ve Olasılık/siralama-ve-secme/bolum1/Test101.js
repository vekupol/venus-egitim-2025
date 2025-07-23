import React from "react";
import Exercises from "../../../../../../components/lessons/Exercises";
import { Container } from "../../../../style/DerslerStyle";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import img1 from "../../../../../../components/lessons/bos-koordinat-1.svg";

import styled from "styled-components";

function Test101() {
  const sorular = [
    {
      id: 1,
      soru: (
        <>
          <InlineMath math={"\\frac{a}{b} = c"} /> başka bir örnek soru burada
          merhaba
        </>
      ),
      A: (
        <>
          <InlineMath math={"\\frac{a}{b} = c"} /> başka bir örnek soru burada a
        </>
      ),
      B: (
        <>
          <InlineMath math={"\\frac{a}{b} = c"} /> başka bir örnek soru burada b
        </>
      ),
      C: "14",
      D: "1",
      E: "2",
      dogruCevap: "B",
      puan: 10,
    },
    {
      id: 2,
      soru: (
        <>
          <Image src={img1} alt={img1} />
        </>
      ),
      A: "3",
      B: "4",
      C: "5",
      D: "6",
      E: "7",
      dogruCevap: "D",
      puan: 10,
    },
    {
      id: 3,
      soru: "Ali'nin kütüphanesinde 4 kırmızı, 3 mavi ve 2 yeşil kitap var. Ali, kaç farklı şekilde kitap seçebilir?",
      A: "9",
      B: "10",
      C: "11",
      D: "12",
      E: "24",
      dogruCevap: "A",
      puan: 10,
    },
    {
      id: 4,
      soru: "Bir kutuda 5 kırmızı, 4 mavi ve 3 yeşil top var. Kutudan üç top seçildiğinde, kaç farklı seçim yapılabilir?",
      A: "8",
      B: "9",
      C: "10",
      D: "11",
      E: "12",
      dogruCevap: "E",
      puan: 10,
    },
    {
      id: 5,
      soru: "Bir torbada 2 siyah, 3 beyaz ve 4 kırmızı top var. Torbadan 1 top seçiliyor. Kaç farklı şekilde top seçimi yapılabilir??",
      A: "6",
      B: "7",
      C: "8",
      D: "9",
      E: "24",
      dogruCevap: "D",
      puan: 10,
    },
  ];

  return (
    <Container>
      <Exercises sorular={sorular} />
    </Container>
  );
}

const Image = styled.img`
  width: 100%;
  max-width: 250px;
  padding-left: 10%;
  padding-right: 10%;
`;
export default Test101;
