import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { IoMdDownload } from "react-icons/io";
import {
  Title,
  Text,
  Container,
  Main,
} from "../../student/Drawers/studentDrawerKonularim";
import { InputText } from "../../student/studentAyarlar";
import { Button } from "../../../components/buttons/Button.styled";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const DrawerDokumanAra = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const getFileType = (contentType) => {
    if (contentType.includes("pdf")) {
      return "Pdf";
    } else if (contentType.includes("spreadsheetml.sheet")) {
      return "Excel";
    } else if (contentType.includes("wordprocessingml.document")) {
      return "Word";
    } else if (
      contentType.includes("image/jpeg") ||
      contentType.includes("image/jpg")
    ) {
      return "Jpeg";
    } else if (contentType.includes("image/png")) {
      return "Png";
    } else if (contentType.includes("zip")) {
      return "Rar";
    } else {
      return "Diğer";
    }
  };

  const fetchFiles = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, "documents");

    try {
      const filesList = await listAll(storageRef);
      const filesData = await Promise.all(
        filesList.items.map(async (fileRef) => {
          try {
            const metadata = await getMetadata(fileRef);
            const url = await getDownloadURL(fileRef);

            return {
              name: metadata.name || "N/A",
              url,
              class: metadata.customMetadata?.class || "N/A",
              unit: metadata.customMetadata?.unit || "N/A",
              tag: metadata.customMetadata?.tag || "N/A",
              created: metadata.timeCreated || "N/A",
              contentType: metadata.contentType || "N/A",
              fileType: getFileType(metadata.contentType || ""),
            };
          } catch (error) {
            console.error(
              "⛔ Dosya metadata alınamadı:",
              fileRef.fullPath,
              error.message
            );
            return null;
          }
        })
      );

      setFiles(filesData);
    } catch (error) {
      console.error("Dosyaları çekerken bir hata oluştu:", error.message);
    }
  };

  const formatCreatedDate = (createdDate) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(createdDate).toLocaleDateString("tr-TR", options);
  };

  const handleDownloadFile = (url, fileName) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.click();
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      return; // Boş arama yapılmasını engelle
    }
    const storage = getStorage();
    const storageRef = ref(storage, "documents");

    try {
      const filesList = await listAll(storageRef);
      const filesData = await Promise.all(
        filesList.items.map(async (fileRef) => {
          try {
            const metadata = await getMetadata(fileRef);
            if (metadata) {
              const data = {
                name: metadata.name || "N/A",
                url: await getDownloadURL(fileRef),
                class: metadata.customMetadata.class || "N/A",
                unit: metadata.customMetadata.unit || "N/A",
                tag: metadata.customMetadata.tag || "N/A",
                created: metadata.timeCreated || "N/A",
                contentType: metadata.contentType || "N/A",
                fileType: getFileType(metadata.contentType || "N/A"),
              };
              if (
                data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.fileType
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                (data.created &&
                  data.created
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
                (data.contentType &&
                  data.contentType
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
              ) {
                return data;
              } else {
                return null;
              }
            } else {
              console.error("Dosya metadata alınamıyor:", fileRef);
              return null;
            }
          } catch (error) {
            console.error("Dosya referansı beklenen türde değil:", fileRef);
            return null;
          }
        })
      );

      // Filtrelenmiş dosyaları ayıklama
      const filteredFiles = filesData.filter((file) => file !== null);
      setFiles(filteredFiles);
    } catch (error) {
      console.error("Dosyaları çekerken bir hata oluştu:", error.message);
    }
  };

  const handleReset = async () => {
    setSearchTerm("");
    fetchFiles();
  };

  const highlightSearchTerm = (text) => {
    if (searchTerm !== "") {
      const regex = new RegExp(`(${searchTerm})`, "gi");
      return text.split(regex).map((part, index) =>
        regex.test(part) ? (
          <strong style={{ color: "#c4302b" }} key={index}>
            {part}
          </strong>
        ) : (
          part
        )
      );
    } else {
      return text;
    }
  };

  return (
    <Container>
      <Title>
        <Text>Doküman Ara</Text>
      </Title>
      <Main>
        <div>
          <InputText
            type="text"
            placeholder="Doküman Adı İle Ara"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button onClick={handleSearch}>Ara</Button>
          <Button onClick={handleReset}>Sıfırla</Button>
        </div>
        <CTable>
          <CThead>
            <CTr>
              <CTh>No</CTh>
              <CTh style={{ textAlign: "left", paddingLeft: "15px" }}>İsim</CTh>
              <CTh style={{ maxWidth: "50px" }}>Sınıf</CTh>
              <CTh>Türü</CTh>
              <CTh>Eklenme Tarihi</CTh>
              <CTh>İndir</CTh>
            </CTr>
          </CThead>
          <CTbody>
            {files.map(
              (file, index) =>
                file && (
                  <CTr key={index}>
                    <CTd>{index + 1}</CTd>
                    <CTd style={{ textAlign: "left", paddingLeft: "15px" }}>
                      {highlightSearchTerm(file.name || "N/A")}
                    </CTd>
                    <CTd>{highlightSearchTerm(file.class || "N/A")}</CTd>
                    <CTd>{highlightSearchTerm(file.fileType || "N/A")}</CTd>
                    <CTd>
                      {highlightSearchTerm(
                        file.created ? formatCreatedDate(file.created) : "N/A"
                      )}
                    </CTd>
                    <CTd>
                      <DownloadIcon
                        onClick={() => handleDownloadFile(file.url, file.name)}
                      />
                    </CTd>
                  </CTr>
                )
            )}
          </CTbody>
        </CTable>
      </Main>
    </Container>
  );
};

export const CTable = styled(Table)`
  border: 2px solid var(--main-color);
  border-radius: 5px;
  padding: 15px;

  @media screen and (max-width: 40em) {
    border: none;
  }
`;

export const CTbody = styled(Tbody)`
  border: none !important;
  border-radius: 5px;
  tr:nth-child(even) {
    background-color: white;
  }

  tr:nth-child(odd) {
    background-color: var(--third-color);
  }
`;

export const CThead = styled(Thead)`
  background-color: var(--main-color);
`;

export const CTr = styled(Tr)`
  border: 2px solid var(--main-color) !important;
  margin-bottom: 12px;
`;

export const CTh = styled(Th)`
  padding: 10px 0px 10px 10px;
  color: white;
  font-size: 1.1em;
  text-align: left;
  font-family: "MyCustomFont", sans-serif;
`;

export const CTd = styled(Td)`
  padding: 10px 0px 10px 10px;
  @media screen and (max-width: 40em) {
    font-size: 0.8em;
  }
`;

export const DownloadIcon = styled(IoMdDownload)`
  color: var(--main-color);
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

export default DrawerDokumanAra;
