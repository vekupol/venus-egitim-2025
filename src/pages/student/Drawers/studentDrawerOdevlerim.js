import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { Container, Main, Text, Title } from "./studentDrawerKonularim";
import ReactTable2 from "../../../components/tables/ReactTable2";

const StudentDrawerOdevlerim = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({});

  useEffect(() => {
    const fetchHomeworks = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setHomeworks(data.homeworks || []);
        }
      } catch (error) {
        console.error("Ödevler alınırken hata oluştu:", error);
      }
    };

    fetchHomeworks();
  }, []);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (homeworks.length > 0 && currentUser?.uid) {
      fetchUploadedFiles(homeworks, currentUser.uid);
    }
  }, [homeworks]);

  const fetchUploadedFiles = async (homeworks, studentUid) => {
    const fileMap = {};
    for (const item of homeworks) {
      const folderRef = ref(
        storage,
        `homework-files/${studentUid}/${item.id}/`
      );
      try {
        const res = await listAll(folderRef);
        const files = await Promise.all(
          res.items.map(async (fileRef) => ({
            name: fileRef.name,
            url: await getDownloadURL(fileRef),
            fullRef: fileRef,
          }))
        );
        fileMap[item.id] = files;
      } catch {
        fileMap[item.id] = [];
      }
    }
    setUploadedFiles(fileMap);
  };

  const handleDeleteFile = async (homeworkId, fileRef) => {
    try {
      await deleteObject(fileRef);
      const currentUser = auth.currentUser;
      if (currentUser?.uid) {
        fetchUploadedFiles(homeworks, currentUser.uid);
      }
    } catch (err) {
      console.error("Dosya silme hatası:", err);
      alert("Dosya silinemedi.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "image/jpeg",
      "image/png",
    ];
    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      alert("Desteklenmeyen dosya türü.");
      e.target.value = null;
    }
  };

  const handleUpload = async (homeworkId) => {
    const currentUser = auth.currentUser;
    if (!currentUser || !selectedFile) return;

    const filePath = `homework-files/${
      currentUser.uid
    }/${homeworkId}/${Date.now()}_${selectedFile.name}`;
    const fileRef = ref(storage, filePath);

    try {
      await uploadBytes(fileRef, selectedFile);
      alert("Dosya başarıyla yüklendi!");
      fetchUploadedFiles(homeworks, currentUser.uid);
      setSelectedFile(null);
    } catch (error) {
      console.error("Yükleme hatası:", error);
      alert("Yükleme sırasında bir hata oluştu.");
    }
  };

  const formatDate = (dateString) => dateString?.split("-").join(".");

  // ✅ ReactTable için sütunlar:
  const columns = [
    { header: "No", accessorKey: "no" },
    { header: "Kazanım", accessorKey: "kazanim" },
    { header: "Sınıf", accessorKey: "className" },
    { header: "Ünite", accessorKey: "unit" },
    { header: "Soru Sayısı", accessorKey: "soruSayisi" },
    { header: "Başlangıç", accessorKey: "startDate" },
    { header: "Bitiş", accessorKey: "endDate" },
    { header: "Durum", accessorKey: "durum" },
    {
      header: "Dosya Ekle/Yükle",
      cell: (row) => (
        <div>
          <input
            type="file"
            accept=".pdf,.docx,.xlsx,.pptx,.png,.jpg,.jpeg"
            onChange={(e) => handleFileChange(e)}
          />
          <button onClick={() => handleUpload(row.id)}>Yükle</button>
          {uploadedFiles[row.id]?.length > 0 && (
            <ul>
              {uploadedFiles[row.id].map((file, idx) => (
                <li key={idx}>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    Dosya {idx + 1}
                  </a>{" "}
                  <button
                    onClick={() => handleDeleteFile(row.id, file.fullRef)}
                  >
                    Sil
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ),
    },
  ];

  // ✅ ReactTable için data:
  const data = homeworks.map((hw, index) => ({
    id: hw.id,
    no: index + 1,
    kazanim: hw.kazanims || "-",
    className: hw.className || "-",
    unit: hw.unit || "-",
    soruSayisi: hw.soruSayisi || "-", // ✅ Doğru alan ekleniyor
    startDate: formatDate(hw.startDate),
    endDate: formatDate(hw.endDate),
    durum: hw.bittiMi === 1 ? "Tamamlandı" : "Tamamlanmadı",
  }));

  return (
    <Container>
      <Title>
        <Text>Ödevlerim</Text>
      </Title>
      <Main>
        <ReactTable2 data={data} columns={columns} />
      </Main>
    </Container>
  );
};

const UploadButton = styled.button`
  background-color: #4caf50;
  color: white;
  font-size: 0.8rem;
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 4px;
`;

export default StudentDrawerOdevlerim;
