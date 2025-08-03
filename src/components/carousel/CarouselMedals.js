import React, { useEffect, useState } from "react";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import styled from "styled-components";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";

function CarouselMedals({ medals }) {
  const [medalImages, setMedalImages] = useState([]);

  useEffect(() => {
    const fetchMedalImages = async () => {
      if (!medals || medals.length === 0) return;

      const urls = await Promise.all(
        medals.map(async (medalNumber) => {
          try {
            const medalRef = ref(storage, `medals/${medalNumber}.png`);
            return await getDownloadURL(medalRef);
          } catch (error) {
            console.error(`Madalya ${medalNumber} yüklenirken hata:`, error);
            return null;
          }
        })
      );

      setMedalImages(urls.filter((url) => url !== null));
    };

    fetchMedalImages();
  }, [medals]);

  return (
    <CarouselWrapper>
      <ScrollingCarousel>
        {medalImages.map((imgUrl, index) => (
          <Medal key={index}>
            <Img src={imgUrl} alt={`Madalya ${index + 1}`} />
          </Medal>
        ))}
      </ScrollingCarousel>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  height: 120px; /* Sabit yükseklik */
`;

const Medal = styled.div`
  display: inline-block;
  margin-right: 10px;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid var(--main-color);
`;

const Img = styled.img`
  width: 80px; /* Küçük sabit boyut */
  height: 80px;
  object-fit: contain;
`;

export default CarouselMedals;
