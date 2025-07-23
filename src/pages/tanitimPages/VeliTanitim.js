// src/pages/VeliTanitim.js

import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Hero,
  HeroTitle,
  HeroText,
  HeroButton,
  Section,
  SectionTitle,
  SectionSub,
  BentoGrid,
  BentoItem,
  TestimonialCarousel,
  TestimonialTrack,
  TestimonialItem,
  FAQItem,
  Question,
  Answer,
  FooterCTA,
  FooterButton,
} from "./StyledOgrenciTanitim";

export default function VeliTanitim() {
  const faqs = [
    {
      q: "Tüm içerikler ücretsiz mi?",
      a: "Evet, veli olarak öğrenciyle aynı içeriklere ücretsiz erişebilirsiniz.",
    },
    {
      q: "Öğrenci takibi nasıl çalışıyor?",
      a: "Premium veli hesabıyla çocuğunuzun gelişimini detaylı takip edebilirsiniz.",
    },
    {
      q: "Birden fazla öğrenci takip edebilir miyim?",
      a: "Şu anda yalnızca bir öğrenci takibi desteklenmektedir.",
    },
    {
      q: "Mobilde çalışıyor mu?",
      a: "Evet, tüm sistem mobil uyumludur.",
    },
  ];

  return (
    <Container>
      <Hero>
        <HeroTitle>Çocuğunuzun Öğrenme Sürecini Takip Edin</HeroTitle>
        <HeroText>
          Neyi öğrendi, nerede zorlandı? Tüm süreç sizinle birlikte şeffaf.
        </HeroText>
        <HeroButton to="/kayit-ol">👨‍👩‍👧 Veli Girişi Yap</HeroButton>
      </Hero>

      <Section>
        <SectionTitle>👨‍👩‍👧 Veli Olarak Neler Yapabilirsiniz?</SectionTitle>
        <SectionSub>
          Takip, gözlem ve destekleme için özel hazırlanmış içerikler
        </SectionSub>

        <BentoGrid>
          <BentoItem>
            <video src="..." muted playsInline preload="metadata" />
            <div className="bento-content">
              <span>📚</span>
              <h4>Öğrenci İçeriği Görüntüleme</h4>
              <p>Çocuğunuzun izlediği konu videolarını ve testleri görün.</p>
            </div>
          </BentoItem>

          <BentoItem>
            <video src="..." muted playsInline preload="metadata" />
            <div className="bento-content">
              <span>📈</span>
              <h4>İlerleme Raporları</h4>
              <p>Hangi konulara tekrar dönmesi gerektiğini kolayca keşfedin.</p>
            </div>
          </BentoItem>

          <BentoItem>
            <video src="..." muted playsInline preload="metadata" />
            <div className="bento-content">
              <span>👀</span>
              <h4>Anlık Aktivite İzleme</h4>
              <p>
                Ne zaman hangi içeriği kullandığını canlı olarak takip edin.
              </p>
            </div>
          </BentoItem>
        </BentoGrid>
      </Section>

      <Section>
        <SectionTitle>👪 Veliler Ne Diyor?</SectionTitle>
        <TestimonialCarousel>
          <TestimonialTrack>
            {[
              "“Çocuğum ne yapıyor artık takip edebiliyorum.” – Ayla Hanım",
              "“Her hafta gelişimi görebilmek çok güven verici.” – Can Bey",
              "“Testleri çözüp zorlandığı konuları görmemizi sağlıyor.” – Nur Hanım",
            ].map((yorum, index) => (
              <TestimonialItem key={index}>{yorum}</TestimonialItem>
            ))}
          </TestimonialTrack>
        </TestimonialCarousel>
      </Section>

      <Section>
        <SectionTitle>❓ Sık Sorulan Sorular</SectionTitle>
        {faqs.map((item, idx) => (
          <FAQItem key={idx}>
            <Question>{item.q}</Question>
            <Answer>{item.a}</Answer>
          </FAQItem>
        ))}
      </Section>

      <FooterCTA>
        <h2>Çocuğunuzu daha yakından takip edin</h2>
        <FooterButton to="/kayit-ol">👁‍🗨 Premium Veli Ol</FooterButton>
      </FooterCTA>
    </Container>
  );
}
