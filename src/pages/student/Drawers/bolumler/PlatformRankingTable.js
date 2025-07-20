import React from 'react';
import styled from 'styled-components';

const PlatformRankingTable = () => {
  // Sıralama platformundaki verilerin örnek halini oluşturuyoruz
  const rankingData = [
    { sıra: 1, isim: 'Ahmet Efe Kale', puan: 95 },
    { sıra: 2, isim: 'Mustafa Güneş', puan: 88 },
    { sıra: 3, isim: 'Selin Yolcu', puan: 75 },
    { sıra: 4, isim: 'Mehmet Yılmaz', puan: 70 },
    { sıra: 5, isim: 'Murat Karslı', puan: 65 },
    { sıra: 6, isim: 'Yılmaz Er', puan: 65 },
    { sıra: 7, isim: 'Hande Güçlü', puan: 65 },
    // Daha fazla kullanıcı ve puan bilgisi eklenebilir
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
        {rankingData.map((user) => (
          <tr key={user.id}>
            <td>{user.sıra}</td>
            <td>{user.isim}</td>
            <td>{user.puan}</td>
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

export default PlatformRankingTable;
