import SearchResults from "../pages/mainPages/SearchResults";
import Donate from "../pages/mainPages/Donate";
import Home from "../pages/mainPages/Home";
import Login from "../pages/mainPages/Login";
import Signup from "../pages/mainPages/Signup";
import OurStory from "../components/footer/footerPages/OurStory";
import Sss from "../components/footer/footerPages/Sss";
import PricingPlans from "../pages/mainPages/PricingPlans";
import ForgotPassword from "../pages/mainPages/ForgotPassword";
import Notifications from "../pages/mainPages/Notifications";
import { Navigate } from "react-router-dom";
import Supporters from "../components/sliderLogo/logos/Supporters";
import Settings from "../pages/student/studentAyarlar";
import OgrenciTanitim from "../pages/tanitimPages/OgrenciTanitim";
import OgretmenTanitim from "../pages/tanitimPages/OgretmenTanitim";
import VeliTanitim from "../pages/tanitimPages/VeliTanitim";

export const MainRouter1 = [
  {
    path: "/",
    element: <Navigate to="/" />,
  },
  {
    path: "/giris-yap",
    element: <Navigate to="/" />,
  },
  {
    path: "/kayit-ol",
    element: <Navigate to="/" />,
  },
  {
    path: "/destek-ol",
    element: <Donate />,
  },
  {
    path: "/arama-sonuclari",
    element: <SearchResults />,
  },
  {
    path: "/hikayemiz",
    element: <OurStory />,
  },
  {
    path: "/sikca-sorulan-sorular",
    element: <Sss />,
  },
  {
    path: "/destekcilerimiz",
    element: <Supporters />,
  },
  {
    path: "/odeme-planlari",
    element: <PricingPlans />,
  },
  {
    path: "/parolami-unuttum",
    element: <ForgotPassword />,
  },
  {
    path: "/bildirimlerim",
    element: <Notifications />,
  },
  {
    path: "/ayarlar",
    element: <Settings />,
  },
  {
    path: "/ogrenci-tanitim",
    element: <OgrenciTanitim />,
  },
  {
    path: "/ogretmen-tanitim",
    element: <OgretmenTanitim />,
  },
  {
    path: "/veli-tanitim",
    element: <VeliTanitim />,
  },
];

export const MainRouter2 = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/destek-ol",
    element: <Donate />,
  },
  {
    path: "/kayit-ol",
    element: <Signup />,
  },
  {
    path: "/giris-yap",
    element: <Login />,
  },
  {
    path: "/arama-sonuclari",
    element: <SearchResults />,
  },
  {
    path: "/hikayemiz",
    element: <OurStory />,
  },
  {
    path: "/sikca-sorulan-sorular",
    element: <Sss />,
  },
  {
    path: "/destekcilerimiz",
    element: <Supporters />,
  },
  {
    path: "/odeme-planlari",
    element: <PricingPlans />,
  },
  {
    path: "/parolami-unuttum",
    element: <ForgotPassword />,
  },
  {
    path: "/ogrenci-tanitim",
    element: <OgrenciTanitim />,
  },
  {
    path: "/ogretmen-tanitim",
    element: <OgretmenTanitim />,
  },
  {
    path: "/veli-tanitim",
    element: <VeliTanitim />,
  },
];
