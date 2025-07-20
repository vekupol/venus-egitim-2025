import Home from "../pages/mainPages/Home";
import { Navigate } from "react-router-dom";
import TeacherPaneli from "../pages/teacher/TeacherPaneli";
import ClassEdit from "../pages/teacher/ClassEdit";
import StudentEdit from "../pages/teacher/StudentEdit";
import HomeworkDetail from "../pages/teacher/HomeworkDetail";
import AddHomework from "../pages/teacher/AddHomework";
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

export const TeacherRouter1 = [
  {
    path: "/",
    element: <Navigate to="/ogretmen-ekrani" />,
  },
  {
    path: "/giris-yap",
    element: <Navigate to="/ogretmen-ekrani" />,
  },
  {
    path: "/kayit-ol",
    element: <Navigate to="/ogretmen-ekrani" />,
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
    path: "/ogretmen-ekrani",
    element: <TeacherPaneli />,
  },
  { 
    path: "/ogretmen-ekrani/sinif-duzenle/:classUid",
    element: <ClassEdit />,
  },
  {
    path: "/ogretmen-ekrani/ogrenci-duzenle/:studentUid",
    element: <StudentEdit />,
  },
  {
    path: "/ogretmen-ekrani/sinif-duzenle/odev-ekle/:classAddedClassUid",
    element: <AddHomework />,
  },
  {
    path: "/ogretmen-ekrani/odev-detay/:itemId",
    element: <HomeworkDetail />,
  },
];




export const TeacherRouter2 = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ogretmen-ekrani",
    element: <Navigate to="/" />,
  },
];
