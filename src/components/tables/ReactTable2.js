import React from "react";
import styled from "styled-components";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const ReactTable2 = ({ data, columns }) => {
  return (
    <TableWrapper>
      <StyledTable>
        <Thead>
          <Tr>
            {columns.map((col, idx) => (
              <StyledTh key={idx}>{col.header}</StyledTh>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <StyledTr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <StyledTd key={colIndex}>
                  {col.cell ? col.cell(row) : row[col.accessorKey] ?? "-"}
                </StyledTd>
              ))}
            </StyledTr>
          ))}
        </Tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default ReactTable2;

/* 🎨 Masaüstü Tablo */
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 1rem;
`;

const StyledTable = styled(Table)`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StyledTh = styled(Th)`
  background-color: var(--main-color) !important;
  color: #fff !important;
  text-align: center !important;
  padding: 12px !important;
  font-weight: bold !important;
  border: none !important;
`;

const StyledTd = styled(Td)`
  text-align: center !important;
  padding: 10px !important;
  border-bottom: 1px solid #ddd !important;
  background: white !important;

  @media (max-width: 768px) {
    text-align: left !important;
    border-bottom: none !important;
    padding: 8px !important;
  }
`;

const StyledTr = styled(Tr)`
  &:nth-child(even) {
    background-color: var(--third-color) !important;
  }
`;

/* 🎯 Durum Renkleri */
export const Status = styled.span`
  font-weight: bold;
  color: ${({ $status }) =>
    $status === "Tamamlandı" ? "green" : "var(--delete-color)"};
`;

/* 🗂 Dosya Stili */
export const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FileLink = styled.a`
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

export const DeleteLink = styled.button`
  background: transparent;
  color: var(--delete-color);
  border: none;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const NoFile = styled.span`
  color: gray;
  font-style: italic;
`;

/* ❌ Sil Butonu */
export const ButtonSil = styled.button`
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
