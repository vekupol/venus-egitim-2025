import React from 'react';
import { db } from "../firebase"; 
import { deleteDoc, doc } from "firebase/firestore";
import {FormGroup, LabelTitle, InputDelete} from '../pages/student/studentAyarlar';
import { getAuth, deleteUser } from "firebase/auth";

function DeleteAccount() {
    const DeleteAccount2 = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            await deleteUser(user);
            
            const userDocRef = doc(db, 'users', user.uid);
            await deleteDoc(userDocRef);
            
            console.log("Kullanıcı ve belge silindi");
        } catch (error) {
            console.error("Hata:", error);
        }
    };

    return (
        <FormGroup>
            <LabelTitle>Hesabı Sil</LabelTitle>                    
            <InputDelete type="submit" value="Hesabı Sil" onClick={DeleteAccount2}/>
        </FormGroup>
    );
}

export default DeleteAccount;
