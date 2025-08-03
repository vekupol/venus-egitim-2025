import { Navigate } from "react-router-dom";
import ParentPanel from "../pages/parent/parentPanel";
import Donate from "../pages/mainPages/Donate";
import SearchResults from "../pages/mainPages/SearchResults";
import OurStory from "../components/footer/footerPages/OurStory";
import Sss from "../components/footer/footerPages/Sss";
import PricingPlans from "../pages/mainPages/PricingPlans";
import ForgotPassword from "../pages/mainPages/ForgotPassword";
import Notifications from "../pages/mainPages/Notifications";
import Supporters from "../components/sliderLogo/logos/Supporters";
import Settings from "../pages/student/studentAyarlar";
import Home from "../pages/mainPages/Home";
import Blog from "../pages/mainPages/Blog/Blog";

export const ParentRouter1 = [
  {
    path: "/",
    element: <Navigate to="/veli-ekrani" />,
  },
  {
    path: "/giris-yap",
    element: <Navigate to="/veli-ekrani" />,
  },
  {
    path: "/kayit-ol",
    element: <Navigate to="/veli-ekrani" />,
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
    path: "/blog",
    element: <Blog />,
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
    path: "/veli-ekrani",
    element: <ParentPanel />,
  },
];

export const ParentRouter2 = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/veli-ekrani",
    element: <Navigate to="/" />,
  },
];
