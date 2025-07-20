import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import styled from "styled-components";
import img1 from "./Boş Koordinat Sistemi (sadece 1. bölge).svg"

function TekSoru() {
  return (
    <Container className="formulas">
      {/* Klasik Soru Tipi */}
      <SoruContainer>
        <Soru>
          1. <InlineMath math={"f(x)= x^2 + 5x + 4 "} /> olmak üzere bir
          fonksiyon tanımlanıyor. Buna göre aşağıdakilerden hangisi{" "}
          <b>yanlıştır?</b>
        </Soru>
        A) x eksenini iki farklı noktada keser.
        <br /> B) Kökler toplamı negatiftir.
        <br /> C) Kökler çarpımı pozitiftir.
        <br /> D) y eksenini pozitif bölgeden keser.
        <br /> E) Orjinden geçer.
      </SoruContainer>

      {/* Öncüllü Soru Tipi */}
      <SoruContainer>
        <Soru>
          2. Aşağıda x değişkenine bağlı birinci dereceden bir bilinmeyenli
          denklemler veriliyor. Buna göre,{" "}
          <Oncul>
            <b>I.</b> denem asbhdka
          </Oncul>
          <Oncul>
            <b>II.</b> asdkjansdklasndk
          </Oncul>
          <Oncul>
            <b>III.</b> asdhbasjdkja
          </Oncul>
          <b>ifadelerinden hangileri doğrudur?</b>
        </Soru>
        <YanYanaDayalı>
          <div>A) Yalnız I</div>
          <div>B) Yalnız II</div>
          <div>C) I,II</div>
        </YanYanaDayalı>
        <YanYanaOrtalı>
          <div>D) II,III</div>
          <div>E) I,II,III</div>
        </YanYanaOrtalı>
      </SoruContainer>
      <SoruContainer>
        <Soru>
            <Image src={img1} alt={img1} />
        </Soru>
      </SoruContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 15px 15px 15px 25px;
  line-height: 1.5em;
  box-sizing: border-box;
`;
const SoruContainer = styled.div`
  margin-bottom: 28px;
`;
const Soru = styled.div`
  margin-bottom: 6px;
`;

const Oncul = styled.div`
  padding-left: 20px;
`;

const YanYanaDayalı = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 450px;
  margin-bottom: 6px;
`;

const YanYanaOrtalı = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 450px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 250px;
  padding-left: 10%;
  padding-right: 10%;
`;

export default TekSoru;

// This is an in-line expression
//       <InlineMath math={"f\\left(x^{\\smash{2}}\\right)"} /> passed as
//       <code>math prop</code>. This is an in-line
//       <InlineMath math={"\\int_0^\\infty x^2 dx"} /> expression passed as
//       <code>children prop</code>.
