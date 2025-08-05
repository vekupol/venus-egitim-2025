import React, { useState } from "react";
import styled from "styled-components";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  Text,
  Title,
  Container,
  Main,
} from "../../student/Drawers/studentDrawerKonularim";
import {
  InputText,
  LabelTitle,
  InputSelect,
} from "../../student/studentAyarlar";
import { Form } from "./DrawerSiniflarim";
import { Button } from "../../../components/buttons/Button.styled";

const Icon = styled(IoCloudUploadOutline)`
  width: 100px;
  height: auto;
  color: var(--main-color);
  margin-bottom: 5px;
  cursor: pointer;
`;

const FileName = styled.p`
  font-size: 0.9rem;
  color: gray;
  margin-top: 5px;
  font-style: italic;
`;

const DrawerDokumanEkle = () => {
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [classValue, setClassValue] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setSelectedFileName(selected ? selected.name : ""); // ✅ Dosya adı kaydediliyor
  };

  const handleClassChange = (e) => setClassValue(e.target.value);
  const handleUnitChange = (e) => setUnitValue(e.target.value);
  const handleTagChange = (e) => setTagValue(e.target.value);

  const handleUpload = async () => {
    if (file && classValue && unitValue && tagValue) {
      const storage = getStorage();
      const storageRef = ref(storage, `documents/${file.name}`);
      const metadata = {
        contentType: file.type,
        customMetadata: {
          class: classValue,
          unit: unitValue,
          tag: tagValue,
        },
      };

      try {
        await uploadBytes(storageRef, file, metadata);
        await getDownloadURL(storageRef);
        setUploadSuccess(true);
      } catch (error) {
        console.error("Dosya yüklenirken bir hata oluştu:", error.message);
      }
    } else {
      console.error("Lütfen dosya ve tüm bilgileri doldurun.");
    }
  };

  return (
    <Container style={{ maxWidth: "600px" }}>
      <Title>
        <Text>Doküman Ekleme Bölümü</Text>
      </Title>
      <Main>
        <Form>
          {/* Dosya Yükleme Alanı */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <label htmlFor="fileInput">
              <Icon />
            </label>
            <InputText
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <LabelTitle>Dosya Yükle</LabelTitle>

            {/* ✅ Seçilen dosya adını anında göster */}
            {selectedFileName && (
              <FileName>Seçilen Dosya: {selectedFileName}</FileName>
            )}
          </div>

          {/* Form Alanları */}
          <InputSelect value={classValue} onChange={handleClassChange}>
            <option value="">Sınıf Seçiniz</option>
            <option value="class1">Sınıf 1</option>
            <option value="class2">Sınıf 2</option>
          </InputSelect>

          <InputSelect value={unitValue} onChange={handleUnitChange}>
            <option value="">Ünite Seçiniz</option>
            <option value="unit1">Ünite 1</option>
            <option value="unit2">Ünite 2</option>
          </InputSelect>

          <InputText
            type="text"
            placeholder="Etiket Ekleyiniz"
            value={tagValue}
            onChange={handleTagChange}
          />

          <Button type="button" onClick={handleUpload}>
            Dosyayı Yükle
          </Button>

          {uploadSuccess && <p>✅ Dosya başarıyla yüklendi.</p>}
        </Form>
      </Main>
    </Container>
  );
};

export default DrawerDokumanEkle;
