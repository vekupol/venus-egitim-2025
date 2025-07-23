// src/pages/OgretmenTanitim.js

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

export default function OgretmenTanitim() {
  const faqs = [
    {
      q: "Öğrenci eklemek ücretli mi?",
      a: "Evet, sadece premium öğretmen hesapları öğrenci/sınıf ekleyebilir.",
    },
    {
      q: "Kaç öğrenci ekleyebilirim?",
      a: "Sınırsız sayıda öğrenci ve sınıf ekleyebilirsiniz.",
    },
    {
      q: "Öğrenci takibi nasıl oluyor?",
      a: "Eklediğiniz öğrencilerin tüm aktivitelerini ve başarı grafiklerini izleyebilirsiniz.",
    },
    {
      q: "Ödev verebilir miyim?",
      a: "Evet! Öğrencilere haftalık görevler ve özel PDF testler atayabilirsiniz.",
    },
  ];

  return (
    <Container>
      <Hero>
        <HeroTitle>Öğrencilerin Başarısına Yön Verin</HeroTitle>
        <HeroText>
          Sınıfınızı oluşturun, öğrencileri takip edin ve ödevlendirin. Hepsi
          tek bir yerden!
        </HeroText>
        <HeroButton to="/kayit-ol">🎓 Hemen Başlayın</HeroButton>
      </Hero>

      <Section>
        <SectionTitle>🧑‍🏫 Neler Yapabilirsiniz?</SectionTitle>
        <SectionSub>
          Takip, analiz ve ödev sistemleriyle öğretmenler için eksiksiz araçlar
        </SectionSub>

        <BentoGrid>
          <BentoItem>
            <video src="..." muted playsInline preload="metadata" />
            <div className="bento-content">
              <span>👥</span>
              <h4>Öğrenci Ekleme</h4>
              <p>
                Mevcut sistemden öğrenci veya sınıf ekleyin, yönetmeye başlayın.
              </p>
            </div>
          </BentoItem>

          <BentoItem>
            <video src="..." muted playsInline preload="metadata" />
            <div className="bento-content">
              <span>📈</span>
              <h4>İlerleme Takibi</h4>
              <p>Her öğrencinin ne kadar geliştiğini canlı olarak izleyin.</p>
            </div>
          </BentoItem>

          <BentoItem>
            <video src="..." muted playsInline preload="metadata" />
            <div className="bento-content">
              <span>📊</span>
              <h4>Sınıf Raporları</h4>
              <p>Tüm sınıfınızın konu bazlı başarı düzeyini görüntüleyin.</p>
            </div>
          </BentoItem>

          <BentoItem>
            <video src="..." muted playsInline preload="metadata" />
            <div className="bento-content">
              <span>📝</span>
              <h4>Ödev Atama</h4>
              <p>Test, PDF ve kazanım odaklı görevleri öğrencilere gönderin.</p>
            </div>
          </BentoItem>
        </BentoGrid>
      </Section>

      <Section>
        <SectionTitle>👩‍🏫 Öğretmen Görüşleri</SectionTitle>
        <TestimonialCarousel>
          <TestimonialTrack>
            {[
              "“Sınıfımı buradan yönetmek çok kolay oldu.” – Merve Öğrt.",
              "“Her öğrencinin gelişimini ayrı ayrı görebiliyorum.” – Ali Öğrt.",
              "“PDF test ve ödev verme özelliği mükemmel.” – Nalan Öğrt.",
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
        <h2>Premium Öğretmen hesabınızı oluşturun</h2>
        <FooterButton to="/kayit-ol">🎯 Hemen Başlayın</FooterButton>
      </FooterCTA>
    </Container>
  );
}
