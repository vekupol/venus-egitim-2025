import React from "react";
import styled from "styled-components";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const ReactTable = ({
  data,
  fileMap,
  handleHomeworkDelete,
  handleDeleteStudentFile,
}) => {
  return (
    <TableWrapper>
      <StyledTable>
        <Thead>
          <Tr>
            <StyledTh>No</StyledTh>
            <StyledTh>Ödev Kazanımı</StyledTh>
            <StyledTh>Puanı</StyledTh>
            <StyledTh>Veriliş Tarihi</StyledTh>
            <StyledTh>Bitiş Tarihi</StyledTh>
            <StyledTh>İlerleme Durumu</StyledTh>
            <StyledTh>Ödevi Sil</StyledTh>
            <StyledTh>Ödev Dosyaları</StyledTh>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <StyledTr key={index}>
              <StyledTd>{row.no}</StyledTd>
              <StyledTd>{row.kazanims}</StyledTd>
              <StyledTd>{row.puan}</StyledTd>
              <StyledTd>{row.startDate}</StyledTd>
              <StyledTd>{row.endDate}</StyledTd>
              <StyledTd>
                <Status $status={row.durum}>{row.durum}</Status>
              </StyledTd>
              <StyledTd>
                <ButtonSil onClick={() => handleHomeworkDelete(row.id)}>
                  Sil
                </ButtonSil>
              </StyledTd>
              <StyledTd>
                {fileMap[row.id]?.length > 0 ? (
                  fileMap[row.id].map((file, i) => (
                    <FileItem key={i}>
                      <FileLink
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={file.name}
                      >
                        Dosya {i + 1}
                      </FileLink>
                      <DeleteLink
                        onClick={() =>
                          handleDeleteStudentFile(file.ref, row.id)
                        }
                      >
                        Sil
                      </DeleteLink>
                    </FileItem>
                  ))
                ) : (
                  <NoFile>Dosya yok</NoFile>
                )}
              </StyledTd>
            </StyledTr>
          ))}
        </Tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default ReactTable;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 1rem;
`;

/* 🎨 Masaüstü Tablo */
const StyledTable = styled(Table)`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StyledTh = styled(Th)`
  background-color: var(--main-color);
  color: #fff;
  text-align: center;
  padding: 12px;
  font-weight: bold;
`;

const StyledTr = styled(Tr)`
  &:nth-child(even) {
    background-color: var(--third-color);
  }
`;

const StyledTd = styled(Td)`
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  @media (max-width: 768px) {
    text-align: left;
    border-bottom: none;
    padding: 8px;
  }
`;

/* 🎯 Durum Renkleri */
const Status = styled.span`
  font-weight: bold;
  color: ${({ $status }) =>
    $status === "Tamamlandı" ? "green" : "var(--delete-color)"};
`;

/* 🗂 Dosya Stili */
const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FileLink = styled.a`
  background-color: var(--main-color);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.85rem;

  &:hover {
    background-color: #522d67;
  }
`;

const DeleteLink = styled.button`
  background: transparent;
  color: var(--delete-color);
  border: none;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    text-decoration: underline;
  }
`;

const NoFile = styled.span`
  color: gray;
  font-style: italic;
`;

/* ❌ Sil Butonu */
const ButtonSil = styled.button`
  background-color: var(--delete-color);
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;

  &:hover {
    background-color: #a3211f;
  }
`;
