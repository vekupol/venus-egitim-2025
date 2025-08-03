import React, { useRef } from "react";
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
  FAQItem,
  Question,
  Answer,
  FooterCTA,
  FooterButton,
  TestimonialTrack,
  TestimonialItem,
  TestimonialCarousel,
  BentoGrid,
  BentoItem,
} from "./StyledOgrenciTanitim";

function BentoVideoItem({ icon, title, description, src }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <BentoItem onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <video ref={videoRef} src={src} muted playsInline preload="metadata" />
      <div className="bento-content">
        <span>{icon}</span>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </BentoItem>
  );
}

export default function OgrenciTanitim() {
  const faqs = [
    {
      q: "İçerikler gerçekten ücretsiz mi?",
      a: "Evet, tüm öğrenciler için her şey tamamen ücretsizdir.",
    },
    {
      q: "Kayıt olmak zorunlu mu?",
      a: "Hayır, birçok içeriğe giriş yapmadan da ulaşabilirsin.",
    },
    {
      q: "Mobilde kullanabilir miyim?",
      a: "Evet, tüm içerikler mobil uyumludur.",
    },
    {
      q: "PDF’leri indirebilir miyim?",
      a: "Evet, testleri PDF formatında indirebilir ve yazdırabilirsin.",
    },
  ];

  return (
    <Container>
      <Hero>
        <HeroTitle>Her Öğrenci Eşit Şansa Sahip Olmalı</HeroTitle>
        <HeroText>
          Ücretsiz, kaliteli ve modern öğrenme deneyimiyle tanış!
        </HeroText>
        <HeroButton to="/kayit-ol">🚀 Hemen Başla</HeroButton>
      </Hero>

      <Section>
        <SectionTitle>📚 Burada Neler Var?</SectionTitle>
        <SectionSub>
          Video destekli anlatımlar, etkileşimli testler ve daha fazlası...
        </SectionSub>

        <BentoGrid>
          <BentoItem className="a">
            <video
              src="https://firebasestorage.googleapis.com/v0/b/venus-2-cdd18.appspot.com/o/videolar%2Fanlatim.mp4?alt=media"
              muted
              playsInline
              preload="metadata"
            />
            <div className="bento-content">
              <span>🎥</span>
              <h4>Konu Anlatım Videoları</h4>
              <p>Her konu için sade, anlaşılır videolar.</p>
            </div>
          </BentoItem>

          <BentoItem className="b">
            <video
              src="https://firebasestorage.googleapis.com/v0/b/venus-2-cdd18.appspot.com/o/videolar%2Fsoru.mp4?alt=media"
              muted
              playsInline
              preload="metadata"
            />
            <div className="bento-content">
              <span>🧠</span>
              <h4>Etkileşimli Sorular</h4>
              <p>Videolardan sonra aktif olarak öğrendiğini ölçen sorular.</p>
            </div>
          </BentoItem>

          <BentoItem className="c">
            <video
              src="https://firebasestorage.googleapis.com/v0/b/venus-2-cdd18.appspot.com/o/videolar%2Fpdf.mp4?alt=media"
              muted
              playsInline
              preload="metadata"
            />
            <div className="bento-content">
              <span>📝</span>
              <h4>PDF Testler</h4>
              <p>Yazdırılabilir, seviyeye uygun testlerle pekiştir.</p>
            </div>
          </BentoItem>

          <BentoItem className="d">
            <video
              src="https://firebasestorage.googleapis.com/v0/b/venus-2-cdd18.appspot.com/o/videolar%2Fkazan%C4%B1m.mp4?alt=media"
              muted
              playsInline
              preload="metadata"
            />
            <div className="bento-content">
              <span>📊</span>
              <h4>Kazanım Takibi</h4>
              <p>Konular bazında öğrenme seviyeni grafiklerle gör.</p>
            </div>
          </BentoItem>

          <BentoItem className="e">
            <video
              src="https://firebasestorage.googleapis.com/v0/b/venus-2-cdd18.appspot.com/o/videolar%2Fgorevler.mp4?alt=media"
              muted
              playsInline
              preload="metadata"
            />
            <div className="bento-content">
              <span>⏳</span>
              <h4>Haftalık Görevler</h4>
              <p>Sana özel haftalık ödevler ve çalışma planı.</p>
            </div>
          </BentoItem>

          <BentoItem className="f">
            <video
              src="https://firebasestorage.googleapis.com/v0/b/venus-2-cdd18.appspot.com/o/videolar%2Frozetler.mp4?alt=media"
              muted
              playsInline
              preload="metadata"
            />
            <div className="bento-content">
              <span>🏅</span>
              <h4>Öğrenci Rozetleri</h4>
              <p>Başarılarını rozetlerle taçlandır, motive ol.</p>
            </div>
          </BentoItem>

          <BentoItem className="g">
            <video
              src="https://firebasestorage.googleapis.com/v0/b/venus-2-cdd18.appspot.com/o/videolar%2Filerleme.mp4?alt=media"
              muted
              playsInline
              preload="metadata"
            />
            <div className="bento-content">
              <span>📈</span>
              <h4>İlerleme Raporları</h4>
              <p>
                Gelişimini gör, hangi konulara tekrar dönmen gerektiğini keşfet.
              </p>
            </div>
          </BentoItem>
        </BentoGrid>
      </Section>

      <Section>
        <SectionTitle>⭐ Öğrenciler Ne Diyor?</SectionTitle>
        <TestimonialCarousel>
          <TestimonialTrack>
            {[
              "“Matematikten nefret ederdim, artık çözmek için sabırsızlanıyorum!” – Ayşe (7. Sınıf)",
              "“PDF testleri yazdırıp çözüyorum. Videolar çok net.” – Berk (5. Sınıf)",
              "“Konu anlatımları kısa, net ve etkili. Tam bana göre!” – Ece (6. Sınıf)",
              "“Hiçbir şey anlamıyordum, şimdi eğlenerek öğreniyorum.” – Mehmet (4. Sınıf)",
              "“Annemle birlikte PDF çözüyoruz, çok faydalı.” – Elif (3. Sınıf)",
              "“İçeriklerin ücretsiz olması büyük avantaj.” – Arda (8. Sınıf)",
              "“Her gün girip biraz izliyorum, sıkılmadan öğreniyorum.” – Zeynep (5. Sınıf)",
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
        <h2>Sen de ücretsiz katıl, farkı hisset!</h2>
        <FooterButton to="/kayit-ol">💡 Şimdi Öğrenmeye Başla</FooterButton>
      </FooterCTA>
    </Container>
  );
}
