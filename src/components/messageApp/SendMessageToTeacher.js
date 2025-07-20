import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RiSendPlaneFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import sendAudio from "./message-sent.mp3";

function SendMessageToTeacher() {
  const navigate = useNavigate();
  const { teacherUid } = useParams();
  const [teacherData, setTeacherData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [message, setMessage] = useState("");
  const currentUser = auth.currentUser;
  const currentUserUid = currentUser ? currentUser.uid : null;
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);

  const handleGoBack = () => {
    navigate("/"); // Navigate to /ogrencipaneline
  };

  useEffect(() => {
    const teacherDocRef = doc(db, "users", teacherUid);

    // Firestore'dan öğretmen verisini dinleme
    const unsubscribe = onSnapshot(teacherDocRef, (doc) => {
      if (doc.exists()) {
        const datas = doc.data();
        setTeacherData(datas);
      } else {
        console.error("Kullanıcı belgesi bulunamadı.");
      }
    });
    if (currentUserUid) {
      const currentUserDocRef = doc(db, "users", currentUserUid);

      // Firestore'dan öğrenci verisini dinleme
      const unsubscribe = onSnapshot(currentUserDocRef, (doc) => {
        if (doc.exists()) {
          const lessons = doc.data();
          setStudentData(lessons);
        } else {
          console.error("Kullanıcı belgesi bulunamadı.");
        }
      });

      return () => unsubscribe();
    }
  }, [teacherUid, currentUserUid]);

  useEffect(() => {
    // Mesajlar listelendiğinde en altına git
    scrollToBottom();
  }, [studentData.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMessageSend = async () => {
    if (!message.trim()) return; // Mesaj boşsa gönderme

    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;

    if (teacherUid && currentUserUid) {
      try {
        const teacherDocRef = doc(db, "users", teacherUid);
        const currentUserDocRef = doc(db, "users", currentUserUid);

        // Mesaj dizisine yeni bir öğe eklemek için updateDoc ve arrayUnion kullanılır
        await Promise.all([
          updateDoc(teacherDocRef, {
            messages: arrayUnion({
              to: teacherUid,
              from: currentUserUid,
              message: message,
              timestamp: new Date().toISOString(),
            }),
          }),
          updateDoc(currentUserDocRef, {
            messages: arrayUnion({
              to: teacherUid,
              from: currentUserUid,
              message: message,
              timestamp: new Date().toISOString(),
            }),
          }),
        ]);

        // Mesaj gönderildikten sonra metni temizle
        setMessage("");

        // Yeni mesajı state'e eklemek için önce mevcut öğrenci verilerini al
        const updatedStudentData = { ...studentData };
        // Eğer studentData.messages array'i varsa, yeni mesajı bu array'e ekle
        if (updatedStudentData.messages) {
          updatedStudentData.messages.push({
            to: teacherUid,
            from: currentUserUid,
            message: message,
            timestamp: new Date().toISOString(),
          });
        } else {
          // Eğer studentData.messages array'i yoksa, yeni bir array oluştur
          updatedStudentData.messages = [
            {
              to: teacherUid,
              from: currentUserUid,
              message: message,
              timestamp: new Date().toISOString(),
            },
          ];
        }
        // Güncellenmiş öğrenci verilerini state'e ata
        setStudentData(updatedStudentData);
        // audioRef.current.play();
      } catch (error) {
        console.error("Mesaj gönderme hatası:", error);
      }
    }
  };

  useEffect(() => {
    if (studentData.messages && studentData.messages.length > 0) {
      // Öğe sayısı değiştiğinde ses çal
      audioRef.current.play();
    }
  }, [studentData.messages]);

  return (
    <Container>
      <MessageArea>
        <Up>
          <ToName>
            {teacherData.userData ? teacherData.userData.displayName : ""}
          </ToName>
          <GoBack onClick={handleGoBack}>Geri Dön</GoBack>
        </Up>
        <Middle>
          <Messages>
            {studentData.messages &&
              studentData.messages.map((msg, index) => {
                // Mesajın from ve to değerlerini kontrol ederek uygun bileşene ekle
                const formattedTimestamp = new Date(
                  msg.timestamp
                ).toLocaleString("tr-TR", {
                  hour: "numeric",
                  minute: "numeric",
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                });

                if (msg.from === teacherUid && msg.to === currentUserUid) {
                  return (
                    <MessageBox key={index}>
                      {msg.message}
                      <div>{formattedTimestamp}</div>
                    </MessageBox>
                  );
                } else if (
                  msg.from === currentUserUid &&
                  msg.to === teacherUid
                ) {
                  return (
                    <MessageBox1 key={index}>
                      {msg.message}
                      <div>{formattedTimestamp}</div>
                    </MessageBox1>
                  );
                } else {
                  return null; // Diğer durumlarda bileşen oluşturmayı atla
                }
              })}
            <div ref={messagesEndRef}></div> {/* Scroll için referans */}
          </Messages>
        </Middle>

        <Down>
          <textarea
            placeholder="Mesajınızı yazın"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <audio ref={audioRef} src={sendAudio}></audio>
          <button onClick={handleMessageSend}>
            <SendIcon />
          </button>
        </Down>
      </MessageArea>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageArea = styled.div`
  border: 1px solid var(--main-color);
  border-radius: 10px;
  padding: 40px;
  width: 700px;
  height: 80%;
  box-shadow: var(--main-color) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  overflow-y: auto; /* Scroll için ayar */
`;

const Up = styled.div`
  border: 1px solid var(--main-color);
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px 10px 0px 0px;
`;

const Middle = styled.div`
  border-left: 1px solid var(--main-color);
  border-right: 1px solid var(--main-color);
  width: 100%;
  height: calc(100% - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Down = styled.div`
  border: 1px solid var(--main-color);
  height: 110px;
  width: 100%;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  textarea {
    width: 80%;
    height: 50px;
    margin: 10px;
    border: 1px solid var(--main-color);
    border-radius: 10px;
    padding: 10px;

    ::placeholder {
      color: var(--main-color);
    }
  }

  button {
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: none;
  }
`;

const SendIcon = styled(RiSendPlaneFill)`
  font-size: 2rem;
  color: var(--main-color);
  cursor: pointer;

  &:hover {
    font-size: 2.2rem;
  }
`;

const ToName = styled.div`
  width: 70%;
  font-size: 1.4rem;
  font-weight: bold;
`;

const GoBack = styled.div`
  width: 20%;
  text-align: right;
  color: var(--delete-color);
  font-weight: bold;
  cursor: pointer;
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 20px;
`;

const MessageBox = styled.div`
  border: 1px solid var(--main-color);
  border-radius: 10px 10px 10px 0px;
  padding: 10px;
  background-color: wheat;
  max-width: 60%;
  margin-bottom: 20px;
  align-self: flex-start;
  div {
    font-size: 0.7rem;
    margin-top: 5px;
  }
`;

const MessageBox1 = styled.div`
  border: 1px solid var(--main-color);
  border-radius: 10px 10px 0px 10px;
  padding: 10px;
  background-color: var(--second-color);
  max-width: 60%;
  margin-bottom: 10px;
  align-self: flex-end;
  div {
    font-size: 0.7rem;
    text-align: right;
    margin-top: 5px;
  }
`;

export default SendMessageToTeacher;
