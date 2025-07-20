import SendMessageToTeacher from "../components/messageApp/SendMessageToTeacher";
import Home from "../pages/mainPages/Home";
import StudentClass from "../pages/student/Drawers/StudentClass";
import EditLessons from "../pages/student/Drawers/bolumler/EditLessons";
import StudentPanel from "../pages/student/studentPanel";
import { Navigate } from "react-router-dom";
import SearchResults from "../pages/mainPages/SearchResults";
import Donate from "../pages/mainPages/Donate";
import Login from "../pages/mainPages/Login";
import Signup from "../pages/mainPages/Signup";
import OurStory from "../components/footer/footerPages/OurStory";
import Sss from "../components/footer/footerPages/Sss";
import PricingPlans from "../pages/mainPages/PricingPlans";
import ForgotPassword from "../pages/mainPages/ForgotPassword";
import Notifications from "../pages/mainPages/Notifications";
import Supporters from "../components/sliderLogo/logos/Supporters";
import Settings from "../pages/student/studentAyarlar";


export const StudentRouter1 = [
  {
    path: "/",
    element: <Navigate to="/ogrenci-ekrani" />,
  },
  {
    path: "/giris-yap",
    element: <Navigate to="/ogrenci-ekrani" />,
  },
  {
    path: "/kayit-ol",
    element: <Navigate to="/ogrenci-ekrani" />,
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
    element: <Supporters/>
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
    path: "/ogrenci-ekrani",
    element: <StudentPanel />,
  },
  {
    path: "/ogrenci-ekrani/sinifim/:classUid",
    element: <StudentClass />,
  },
  {
    path: "/ogrenci-ekrani/derslerimi-duzenle",
    element: <EditLessons />,
  }
];

export const StudentRouter2 = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ogrenci-ekrani",
    element: <Navigate to="/" />,
  },
];
