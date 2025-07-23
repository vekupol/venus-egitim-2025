import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  font-family: "Segoe UI", sans-serif;
  background-color: #efecf3;
  color: #1c1c1c;
  width: 100%;
  padding: 0;
  margin: 0;
`;

export const Hero = styled.section`
  background: #674188;
  color: white;
  text-align: center;
  padding: 100px 20px 80px;
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 700;
`;

export const HeroText = styled.p`
  font-size: 1.5rem;
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
`;

export const HeroButton = styled(Link)`
  background-color: white;
  color: #674188;
  padding: 16px 36px;
  font-size: 1.2rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #f4f0f8;
    transform: translateY(-2px);
  }
`;

export const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--main-color);
`;

export const SectionSub = styled.p`
  font-size: 1.2rem;
  color: var(--main-color);
  margin-bottom: 50px;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  padding: 40px;
`;

export const Card = styled.div`
  background: var(--main-color);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  width: 320px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
`;

export const VideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
`;

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
`;

export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  padding-top: 4px;
`;

export const BentoItem = styled.div`
  background: white;
  border-radius: 16px;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  border: 2px solid #c3acd0;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  video {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
  }

  .bento-content {
    padding: 16px;
    text-align: center;
  }
`;

export const CardContent = styled.div`
  padding: 24px;
`;

export const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 12px;
`;

export const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 12px;
  color: white;
`;

export const CardText = styled.p`
  font-size: 1rem;
  color: white;
`;

export const Testimonial = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  max-width: 750px;
  margin: 30px auto;
  font-style: italic;
  font-size: 1.1rem;
  color: #333;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;
export const TestimonialCarousel = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  position: relative;
  margin: 0 auto;
`;

export const TestimonialTrack = styled.div`
  display: flex;
  gap: 24px;
  width: max-content;
  animation: scroll-left 30s linear infinite;

  @keyframes scroll-left {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;

export const TestimonialItem = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
  width: 250px;
  height: 250px;
  flex: 0 0 auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  font-style: italic;
  color: #333;
  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    font-size: 0.9rem;
  }
`;

export const FAQItem = styled.div`
  text-align: left;
  max-width: 800px;
  margin: 0 auto 30px;
`;

export const Question = styled.h4`
  font-size: 1.2rem;
  color: #674188;
  margin-bottom: 10px;
`;

export const Answer = styled.p`
  font-size: 1.05rem;
  color: #444;
`;

export const FooterCTA = styled.div`
  background: #efecf3;
  color: var(--main-color);
  text-align: center;
  padding: 80px 20px;
`;

export const FooterButton = styled(Link)`
  display: inline-block;
  margin-top: 25px;
  background: var(--main-color);
  color: white;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    color: var(--main-color);
    background: #e5d5f1;
    border: 1px solid var(--main-color);
  }
`;
