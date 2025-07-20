import React from 'react';
import styled from 'styled-components';

const ClassListTable = () => {
  // 10. sınıf öğrencilerinin örnek listesi
  const classList = [
    { id: 1, name: 'Serpil Akyürek', grade: '2455' },
    { id: 2, name: 'Ece Solak', grade: '2302' },
    { id: 3, name: 'Kadir Doğulu', grade: '1999' },
    { id: 4, name: 'Mehmet Yılmaz', grade: '1678' },
    { id: 5, name: 'Murat Karslı', grade: '1297' },
    { id: 6, name: 'Yılmaz Er', grade: '1001' },
    { id: 7, name: 'Hande Güçlü', grade: '1000' },
    { id: 8, name: 'Ahmet Efe Kale', grade: '994' },
    { id: 9, name: 'Mustafa Güneş', grade: '893' },
    { id: 10, name: 'Selin Yolcu', grade: '709' },
    // Daha fazla öğrenci eklenebilir
  ];

  return (
    <Table>
      <thead>
        <tr>
          <th>Sıra</th>
          <th>İsim</th>
          <th>Puan</th>
        </tr>
      </thead>
      <tbody>
        {classList.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.grade}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
border-top: 3px solid var(--main-color);
width: 100%;
height: 100%;


th{
  text-align: left;
}
`

export default ClassListTable;
