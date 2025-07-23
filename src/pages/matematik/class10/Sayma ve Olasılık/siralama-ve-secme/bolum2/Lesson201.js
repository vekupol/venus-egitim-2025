import React, { useState } from "react";
import VideoLesson from "../../../../../../components/lessons/videoLesson";
import { VideoImage , PlayIcon, Container } from "../../../../style/DerslerStyle";


function Lesson201() {
  // Bunları giriniz. ve url yi giriniz url nin sonunda &autoplay=1 olmasına dikkat ediniz.

  const unitNo = 1;
  const konuNo = 1;
  const partNo = 13;
  const baslik = "Permütasyon";

  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <Container style={{alignItems:"start"}}>
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
          commentsCollection="commentsMatematikOn"
          unitNoOut={unitNo}
          konuNoOut={konuNo}
          partNoOut={partNo}
        />
      )}
    </Container>
  );
}



export default Lesson201;
