import React, { useState } from "react";
import VideoLesson from "../../../../../components/lessons/videoLesson";
import { VideoImage, PlayIcon, Container } from "../../../style/DerslerStyle";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

function Lesson1() {
  const unitLink = "sayilar"; // JSON'daki link ile aynı olmalı
  const unitNo = 1;
  const konuNo = 1;
  const partNo = 1; // bu dersin index'i (ders sırasındaki konum)
  const baslik = "Üslü İfadeler";

  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoad = async () => {
    setVideoLoaded(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return console.error("Kullanıcı oturumu yok!");

      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const dersData = data.derslerim?.[unitLink];
        if (dersData) {
          const dersler = [...dersData.dersler];
          // 🔥 Bu ders zaten tamamlandı mı kontrol et
          if (dersler[partNo - 1] === 1) {
            console.log("Bu ders zaten tamamlanmış.");
            return;
          }
          dersler[partNo - 1] = 1; // ders tamamlandı olarak işaretle
          await updateDoc(userRef, {
            [`derslerim.${unitLink}.dersler`]: dersler,
          });
          console.log("✅ Ders tamamlandı olarak işaretlendi.");
        }
      }
    } catch (err) {
      console.error("❌ Ders tamamlama hatası:", err.message);
    }
  };

  return (
    <Container style={{ alignItems: "start" }}>
      {!videoLoaded && (
        <VideoImage>
          <p>{baslik}</p>
          <PlayIcon onClick={handleVideoLoad} />
          <p>Venüs Eğitim</p>
        </VideoImage>
      )}

      {videoLoaded && (
        <VideoLesson
          baslik={baslik}
          videoUrlOut="https://www.youtube-nocookie.com/embed/oholvidpLfs?si=Sj2_ikaMN1wdoMa_"
          videoDescriptionOut={baslik}
          commentsCollection="commentsMatematikDokuz"
          unitNoOut={unitNo}
          konuNoOut={konuNo}
          partNoOut={partNo}
        />
      )}
    </Container>
  );
}

export default Lesson1;
