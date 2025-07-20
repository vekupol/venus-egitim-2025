import React, { useState, useCallback } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, addDoc, query, where,} from 'firebase/firestore';
import { db } from '../../firebase';
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function Posts() {
   const ref = collection(db, "posts");
   
   const [body, setBody] = useState("");
   const [user, isLoadingUser] = useAuthState(auth);
   const belirliKullaniciUID = user ? user.uid : null;

   const filterQuery = query(collection(db, 'posts'), where('createdBy', '==', belirliKullaniciUID));
   const [filteredData, isLoadingFilteredData] = useCollectionData(filterQuery);
   

   const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!isLoadingUser) { 
      const timestamp = new Date();
      const userUID = user ? user.uid : null; 

      const post = {
        body: body,
        timestamp: timestamp,
        createdBy: userUID,
      };

      addDoc(ref, post);
      setBody(""); 
    }
   }, [body, user, isLoadingUser]);

   if (isLoadingFilteredData || isLoadingUser) {
    return <h1>Yükleniyor...</h1>
   }

   return (
    <div>
        <h1>Gönderileriniz</h1> 
        {filteredData ? (
            filteredData.map(post => (
                <div key={post.id}>
                <p>{post.body}</p>
                
                </div>
            ))
        ) : (
            <p>Veriler yükleniyor...</p>
        )}
        <h1>Post Ekle</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Post Ekle' value={body} onChange={(e) => setBody(e.currentTarget.value)}></input>
            <input type="submit" value="Send" ></input>
        </form>
    </div>
  );
}

export default Posts;
