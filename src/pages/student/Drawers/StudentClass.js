import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClassContainer, ClassContainer2, ClassName, Container, MyStudents, Name, Homeworks, TableRow, TableHeader, TableCell, StyledTable, ButtonO} from '../../teacher/ClassEdit';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from '../../../firebase';
import { doc,getDoc,  query as firestoreQuery } from 'firebase/firestore';



function StudentClass() {    
    const { classUid } = useParams();
    const [user] = useAuthState(auth);
    const belirliKullaniciUID = user ? user.uid : null;
    const [homeworks, setHomeworks] = useState([]);
    const [className, setClassName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch class details based on classUid
            const classRef = doc(db, 'classes', classUid);
            const classDoc = await getDoc(classRef);
    
            if (classDoc.exists()) {
              setClassName(classDoc.data().className);
            } else {
              console.error('Sınıf belirtilen UID ile bulunamadı');
            }
    
            // Fetch user's homeworks
            const userDocRef = doc(db, 'users', belirliKullaniciUID);
            const userDoc = await getDoc(userDocRef);
    
            if (userDoc.exists()) {
              const userHomeworks = userDoc.data().homeworks || [];
              const classHomeworks = userHomeworks.filter(homework => homework.classUid === classUid);
              setHomeworks(classHomeworks);
            } else {
              console.error('Kullanıcı belirtilen UID ile bulunamadı');
            }
          } catch (error) {
            console.error('Veri çekme hatası:', error.message);
          }
        };
    
        fetchData();
      }, [belirliKullaniciUID, classUid]);
    
  return (
    <ClassContainer>
        <ClassContainer2>
            <Name><ClassName>{className}</ClassName></Name>
            <Container>
                <div>
                    <Homeworks>
                        <MyStudents>Ödevler</MyStudents>
                        <StyledTable>
                            <thead>
                            <TableRow>
                                <TableHeader>Ödev Türü</TableHeader>
                                <TableHeader>Son Tarih</TableHeader>
                                <TableHeader>Tamamlanma Durumu</TableHeader>
                                <TableHeader></TableHeader>            
                            </TableRow>
                            </thead>
                            <tbody>
                            {homeworks.map((homework) => (
                                <TableRow key={homework.id}>
                                    <TableCell>{homework.homeworkType}</TableCell>
                                    <TableCell>{homework.endDate}</TableCell>
                                    <TableCell style={{ color: homework.doneStudent === 0 ? 'var(--delete-color)' : 'var(--main-color)', fontWeight: 'bold' }}>
                                    {homework.doneStudent === 0 ? 'Bekliyor' : 'Teslim Edildi'}
                                    </TableCell>

                                    <TableCell><ButtonO>Ödeve Git</ButtonO></TableCell>
                                </TableRow>
                            ))}
                            </tbody>
                        </StyledTable>
                    </Homeworks>
                    <Homeworks>
                        <MyStudents>Duyurular</MyStudents>
                    </Homeworks>
                </div>
                <div>
                    <Homeworks>
                        <MyStudents>Sınıf Sıralaması</MyStudents>
                    </Homeworks>          
                </div>

            </Container>
        </ClassContainer2>
    </ClassContainer>
  )
}

export default StudentClass
