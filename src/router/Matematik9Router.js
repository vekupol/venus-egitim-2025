import DokuzMatematik from "../pages/matematik/class9/DokuzMatematik";
import Sayilar from "../pages/matematik/class9/tema1/Sayilar";
import GercelSayilarinUsluVeKokluGosterimleri from "../pages/matematik/class9/tema1/bolum1/GercelSayilarinUsluVeKokluGosterimleri";
import GercelSayiAraliklariKumeIslemleri from "../pages/matematik/class9/tema1/bolum2/GercelSayiAraliklariKumeIslemleri";
import SayiKumelerininOzellikleri from "../pages/matematik/class9/tema1/bolum3/SayiKumelerininOzellikleri";
import GercelSayilarinIslemOzellikleri from "../pages/matematik/class9/tema1/bolum4/GercelSayilarinIslemOzellikleri";

export const Matematik9 = [
  {
    path: "/matematik/9-sinif",
    element: <DokuzMatematik activeDivProps={1} />,
  },
  {
    path: "/matematik/9-sinif/sayilar/intro",
    element: <DokuzMatematik activeDivProps={2} />,
  },
  {
    path: "/matematik/9-sinif/sayilar",
    element: <Sayilar activeDivProps={1} />,
  },
  {
    path: "/matematik/9-sinif/sayilar/gercel-sayilarin-uslu-ve-koklu-gosterimleri-ile-yapilan-islemler/intro",
    element: <Sayilar activeDivProps={2} />,
  },

  {
    path: "/matematik/9-sinif/sayilar/gercel-sayilarin-uslu-ve-koklu-gosterimleri-ile-yapilan-islemler",
    element: <GercelSayilarinUsluVeKokluGosterimleri startTopicProps={1} />,
  },
  {
    path: "/matematik/9-sinif/sayilar/gercel-sayilarin-uslu-ve-koklu-gosterimleri-ile-yapilan-islemler/ders-1",
    element: (
      <GercelSayilarinUsluVeKokluGosterimleri
        startTopicProps={1}
        activeLessonProp={1}
      />
    ),
  },
  {
    path: "/matematik/9-sinif/sayilar/gercel-sayilarin-uslu-ve-koklu-gosterimleri-ile-yapilan-islemler/ders-2",
    element: (
      <GercelSayilarinUsluVeKokluGosterimleri
        startTopicProps={1}
        activeLessonProp={2}
      />
    ),
  },
  {
    path: "/matematik/9-sinif/sayilar/gercel-sayi-araliklarinin-gosteriminde-ve-araliklarla-ilgili-islemlerde-kume-sembol-ve-islemleri/intro",
    element: <Sayilar activeDivProps={3} />,
  },
  {
    path: "/matematik/9-sinif/sayilar/sayi-kumelerinin-ozellikleri/intro",
    element: <Sayilar activeDivProps={4} />,
  },
  {
    path: "/matematik/9-sinif/sayilar/gercel-sayilarin-islem-ozellikleri/intro",
    element: <Sayilar activeDivProps={5} />,
  },

  {
    path: "/matematik/9-sinif/sayilar/gercel-sayi-araliklarinin-gosteriminde-ve-araliklarla-ilgili-islemlerde-kume-sembol-ve-islemleri/ders-1",
    element: (
      <GercelSayiAraliklariKumeIslemleri
        startTopicProps={1}
        activeLessonProp={1}
      />
    ),
  },
  {
    path: "/matematik/9-sinif/sayilar/sayi-kumelerinin-ozellikleri/ders-1",
    element: (
      <SayiKumelerininOzellikleri startTopicProps={1} activeLessonProp={1} />
    ),
  },
  {
    path: "/matematik/9-sinif/sayilar/gercel-sayilarin-islem-ozellikleri/ders-1",
    element: (
      <GercelSayilarinIslemOzellikleri
        startTopicProps={1}
        activeLessonProp={1}
      />
    ),
  },
];
