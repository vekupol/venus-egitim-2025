import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MainRouter1, MainRouter2 } from "./router/MainRouter";
import { StudentRouter1, StudentRouter2 } from "./router/StudentRouter";
import MainLayout from "./layout/MainLayout";
import NotFound from "./pages/mainPages/NotFound";
import Loading from "./components/Loading";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Matematik10 } from "./router/Matematik10Router";
import { TeacherRouter1, TeacherRouter2 } from "./router/TeacherRouter";
import FooterlessLayout from "./layout/FooterlessLayout";
import SendMessageToTeacher from "./components/messageApp/SendMessageToTeacher";
import { Matematik9 } from "./router/Matematik9Router";
import { Matematik11 } from "./router/Matematik11Router";
import { Matematik12 } from "./router/Matematik12Router";
import { MatematikTyt } from "./router/MatematikTytRouter";
import { MatematikAyt } from "./router/MatematikAytRouter";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const authInstance = getAuth();
const db = getFirestore();

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState(null);
  const { pathname } = useLocation();
  console.log(accountType);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setAccountType(userDocSnap.data().userData.defaultAccountType);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          {isLoggedIn ? (
            <>
              <Route element={<MainLayout />}>
                {accountType === "öğretmen" ? ( // Ternary operator kullanımı
                  TeacherRouter1.map((item, index) => (
                    <Route key={index} {...item} />
                  ))
                ) : (
                  // "öğretmen değilse" koşulu
                  <>
                    {StudentRouter1.map((item, index) => (
                      <Route key={index} {...item} />
                    ))}
                    {/* Buraya öğretmen olmayanlar için ek rotalar ekleyebilirsiniz */}
                  </>
                )}
              </Route>
            </>
          ) : (
            <>
              <Route element={<MainLayout />}>
                {MainRouter2.map((item, index) => (
                  <Route key={index} {...item} />
                ))}
                {StudentRouter2.map((item, index) => (
                  <Route key={index} {...item} />
                ))}
                {TeacherRouter2.map((item, index) => (
                  <Route key={index} {...item} />
                ))}
              </Route>
            </>
          )}
          {/* Diğer routerlar */}
          <Route element={<MainLayout />}>
            {Matematik9.map((item, index) => (
              <Route key={index} {...item} />
            ))}
            {Matematik10.map((item, index) => (
              <Route key={index} {...item} />
            ))}
            {Matematik11.map((item, index) => (
              <Route key={index} {...item} />
            ))}
            {Matematik12.map((item, index) => (
              <Route key={index} {...item} />
            ))}
            {MatematikTyt.map((item, index) => (
              <Route key={index} {...item} />
            ))}
            {MatematikAyt.map((item, index) => (
              <Route key={index} {...item} />
            ))}
          </Route>
          <Route element={<FooterlessLayout />}>
            <Route
              path="/mesaj-gonder/:teacherUid"
              element={<SendMessageToTeacher />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
