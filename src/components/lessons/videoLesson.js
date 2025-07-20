import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  getFirestore,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const authInstance = getAuth();
const db = getFirestore();

// Bu componentin 7 propa ihtiyacı var
// baslik : Dersin başlığı
// videoUrlOut: youtube da videoya girin sonra paylaş butonuna tıklayın orada yerleştir ya da göm yazıyor. ona tıkladıktan sonra
//              gelen pencerede en alta inip Oynatıcı kontrollerini göster. Geliştirilmiş gizlilik modunu etkinleştir. bu ikisi
//              seçili yapın . sonra orada src= den sonra "" iki tırnak arasındaki url yi alın.
//videoDescriptionOut: açıklama
//unitNoOut: unit no
//konuNoOut: konu no
//partNoOut: part no
//commentsCollection : commentsMatematikOn bunun gibi comments ile başlayacak ders adı ilk harfi büyük sınıf yazıyla ilk
//                      harfi büyük commentsFizikOniki ,commentsBiyolojiOnbir gibi

const VideoLesson = (props) => {
  const {
    baslik,
    videoUrlOut,
    videoDescriptionOut,
    unitNoOut,
    konuNoOut,
    partNoOut,
    commentsCollection,
  } = props;

  const [filteredComments, setFilteredComments] = useCollectionData(
    query(
      collection(db, commentsCollection),
      where("unitNo", "==", unitNoOut),
      where("konuNo", "==", konuNoOut),
      where("partNo", "==", partNoOut)
    )
  );

  const [newComment, setNewComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUid, setUserUid] = useState("");
  const [userName, setUserName] = useState("");
  const [showReplyId, setShowReplyId] = useState(null);
  const [newReply, setNewReply] = useState("");
  const [likes, setLikes] = useState({});
  const [likedComments, setLikedComments] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserUid(user.uid);
        setUserName(user.displayName);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSrc = () => {
    const hasRelParam = videoUrlOut.includes("&rel=0");
    const updatedUrl = hasRelParam ? videoUrlOut : `${videoUrlOut}&rel=0`;
    return updatedUrl;
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    const generateRandomId = () => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charLength = chars.length;
      let randomId = "";

      for (let i = 0; i < 10; i++) {
        randomId += chars.charAt(Math.floor(Math.random() * charLength));
      }

      return randomId;
    };

    const q = collection(db, commentsCollection);
    const randomRefCode = generateRandomId();

    try {
      await addDoc(q, {
        text: newComment,
        unitNo: unitNoOut,
        konuNo: konuNoOut,
        partNo: partNoOut,
        uid: userUid,
        refCode: randomRefCode,
        createdAt: serverTimestamp(),
        likes: 0,
        replies: [],
        name: userName,
      });
      setNewComment("");
    } catch (error) {
      console.error("Yorum eklenirken bir hata oluştu:", error);
    }
  };

  const handleReplyAreaShow = (commentId) => {
    setShowReplyId(commentId === showReplyId ? null : commentId);
  };

  const handleAddReply = async (commentRefCode) => {
    const commentQuery = query(
      collection(db, commentsCollection),
      where("refCode", "==", commentRefCode)
    );
    const querySnapshot = await getDocs(commentQuery);

    const generateRandomId = () => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charLength = chars.length;
      let randomId = "";

      for (let i = 0; i < 10; i++) {
        randomId += chars.charAt(Math.floor(Math.random() * charLength));
      }

      return randomId;
    };

    const randomRefCode2 = generateRandomId();

    if (!querySnapshot.empty) {
      const docRef = doc(db, commentsCollection, querySnapshot.docs[0].id);

      try {
        await updateDoc(docRef, {
          replies: arrayUnion({
            text: newReply,
            uid: userUid,
            refCode: randomRefCode2,
            unitNo: unitNoOut,
            konuNo: konuNoOut,
            partNo: partNoOut,
            likes: 0,
            name: userName,
          }),
        });
        console.log("Yorum başarıyla güncellendi!");
        setNewReply("");
      } catch (error) {
        console.error("Hata:", error);
      }
    } else {
      console.error("Belirtilen refCode değerine sahip belge bulunamadı.");
    }
  };

  const handleDeleteComment = async (commentRefCode) => {
    const commentQuery = query(
      collection(db, commentsCollection),
      where("refCode", "==", commentRefCode)
    );
    const querySnapshot = await getDocs(commentQuery);

    if (!querySnapshot.empty) {
      const docRef = doc(db, commentsCollection, querySnapshot.docs[0].id);

      try {
        await deleteDoc(docRef);
        console.log("Yorum başarıyla silindi!");
      } catch (error) {
        console.error("Hata:", error);
      }
    } else {
      console.error("Belirtilen refCode değerine sahip belge bulunamadı.");
    }
  };

  const handleDeleteComment2 = async (replyRefCode) => {
    const commentsQuery = collection(db, commentsCollection);
    const querySnapshot = await getDocs(commentsQuery);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (doc) => {
        const commentData = doc.data();
        const replies = commentData.replies || [];

        // Belgedeki replies dizisini kontrol et
        const matchingReply = replies.find(
          (reply) => reply.refCode === replyRefCode
        );

        if (matchingReply) {
          // Eğer eşleşen refCode'a sahip bir reply bulunduysa, bu reply'i sil
          const replyIndex = replies.findIndex(
            (reply) => reply.refCode === replyRefCode
          );
          replies.splice(replyIndex, 1); // Bulunan reply'i diziden kaldır

          try {
            // Yeni update edilmiş belgeyi kaydet
            await updateDoc(doc.ref, { replies });
            console.log("Yorum başarıyla silindi!");
          } catch (error) {
            console.error("Hata:", error);
          }
        }
      });
    } else {
      console.error("Belirtilen refCode değerine sahip belge bulunamadı.");
    }
  };

  const handleLike = async (commentRefCode) => {
    if (likedComments.includes(commentRefCode)) {
      console.log("Bu yorumu zaten beğendiniz.");
      return; // Kullanıcı zaten bu yorumu beğenmişse işlemi durdur
    }

    setLikedComments([...likedComments, commentRefCode]);
    // Her tıklamada beğeni sayısını artır
    setLikes((prevLikes) => ({
      ...prevLikes,
      [commentRefCode]: (prevLikes[commentRefCode] || 0) + 1,
    }));

    // Firebase'deki belgeyi güncellemek için kullanıcı etkileşimi sırasında beğeni sayısını artır
    try {
      const commentQuery = query(
        collection(db, commentsCollection),
        where("refCode", "==", commentRefCode)
      );
      const querySnapshot = await getDocs(commentQuery);

      if (!querySnapshot.empty) {
        const docRef = doc(db, commentsCollection, querySnapshot.docs[0].id);
        const commentData = querySnapshot.docs[0].data();
        const updatedLikes = (commentData.likes || 0) + 1;

        await updateDoc(docRef, { likes: updatedLikes });
        console.log("Beğeni sayısı başarıyla güncellendi!");
      } else {
        console.error("Belirtilen refCode değerine sahip belge bulunamadı.");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const handleUnlike = async (commentRefCode) => {
    if (!likedComments.includes(commentRefCode)) {
      console.log("Bu yorumu zaten beğendiniz.");
      return; // Kullanıcı zaten bu yorumu beğenmemişse işlemi durdur
    }
    setLikedComments((prevLikedComments) =>
      prevLikedComments.filter((code) => code !== commentRefCode)
    );
    // Her tıklamada beğeni sayısını artır
    setLikes((prevLikes) => ({
      ...prevLikes,
      [commentRefCode]: (prevLikes[commentRefCode] || 0) - 1,
    }));

    // Firebase'deki belgeyi güncellemek için kullanıcı etkileşimi sırasında beğeni sayısını artır
    try {
      const commentQuery = query(
        collection(db, commentsCollection),
        where("refCode", "==", commentRefCode)
      );
      const querySnapshot = await getDocs(commentQuery);

      if (!querySnapshot.empty) {
        const docRef = doc(db, commentsCollection, querySnapshot.docs[0].id);
        const commentData = querySnapshot.docs[0].data();
        const updatedLikes = (commentData.likes || 0) - 1;

        await updateDoc(docRef, { likes: updatedLikes });
        console.log("Beğeni sayısı başarıyla güncellendi!");
      } else {
        console.error("Belirtilen refCode değerine sahip belge bulunamadı.");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <Container>
      <h2> {baslik} </h2>
      {videoUrlOut && (
        <Frame>
          <Youtube
            title="YouTube video player"
            width="560"
            height="315"
            src={handleSrc()}
            allowFullScreen
          ></Youtube>
        </Frame>
      )}
      <Description>
        <h4>Açıklama :</h4>
        <p>{videoDescriptionOut}</p>
      </Description>

      {isLoggedIn && (
        <>
          <CommentSection>
            <CommentInput
              type="text"
              placeholder="Yorumunuzu buraya yazın..."
              value={newComment}
              onChange={handleCommentChange}
            />
            <CommentButton onClick={handleSubmitComment}>
              Yorum Gönder
            </CommentButton>

            {filteredComments && (
              <CommentsList>
                {filteredComments
                  .slice()
                  .sort((a, b) => {
                    return a.createdAt && b.createdAt
                      ? b.createdAt.toMillis() - a.createdAt.toMillis()
                      : 0;
                  })
                  .map((comment) => (
                    <CommentContainer key={comment.id}>
                      <CommentArea>
                        <Name>
                          <div>
                            {comment.name}
                            {comment.createdAt && (
                              <CommentDate>
                                {comment.createdAt
                                  .toDate()
                                  .toLocaleDateString("tr-TR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                  })}
                              </CommentDate>
                            )}
                            <LikeButtonContainer>
                              <LikeButton
                                liked={likedComments.includes(comment.refCode)}
                                onClick={() => {
                                  likedComments.includes(comment.refCode)
                                    ? handleUnlike(comment.refCode)
                                    : handleLike(comment.refCode);
                                }}
                              >
                                {likedComments.includes(comment.refCode) ? (
                                  <AiFillHeart />
                                ) : (
                                  <AiOutlineHeart />
                                )}
                              </LikeButton>
                              <LikeCount>{comment.likes} Beğeni</LikeCount>
                            </LikeButtonContainer>
                          </div>
                          <div>
                            <ReplyButton
                              onClick={() =>
                                handleReplyAreaShow(comment.refCode)
                              }
                            >
                              Yanıtla
                            </ReplyButton>
                            {comment.uid === userUid && (
                              <DeleteButton
                                onClick={() =>
                                  handleDeleteComment(comment.refCode)
                                }
                              >
                                Sil
                              </DeleteButton>
                            )}
                          </div>
                        </Name>
                        {showReplyId === comment.refCode && (
                          <div style={{ width: "100%" }}>
                            <ReplyInput
                              type="text"
                              value={newReply}
                              onChange={(e) => setNewReply(e.target.value)}
                              placeholder="Yeni Yanıt"
                            />
                            <ReplyButton
                              onClick={() => handleAddReply(comment.refCode)}
                            >
                              Gönder
                            </ReplyButton>
                            <DeleteButton
                              onClick={() =>
                                handleReplyAreaShow(comment.refCode)
                              }
                            >
                              Vazgeç
                            </DeleteButton>
                          </div>
                        )}

                        <CommentText1> {comment.text}</CommentText1>
                        {comment.replies && (
                          <div>
                            {comment.replies.map((reply, index) => (
                              <RepliesArea key={index}>
                                <CommentText>
                                  <Name>{reply.name}</Name>
                                  <div>{reply.text}</div>
                                </CommentText>
                                {reply.uid === userUid && (
                                  <DeleteButton
                                    style={{
                                      textAlign: "left",
                                      color: "var(--delete-color)",
                                    }}
                                    onClick={() =>
                                      handleDeleteComment2(reply.refCode)
                                    }
                                  >
                                    Sil
                                  </DeleteButton>
                                )}
                              </RepliesArea>
                            ))}
                          </div>
                        )}
                      </CommentArea>
                    </CommentContainer>
                  ))}
              </CommentsList>
            )}
          </CommentSection>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Frame = styled.div`
margin-top: 2rem;
  width: 100%;
  max-width: 800px;
  height: auto;
  aspect-ratio: 16 / 9;
  filter: drop-shadow(4px 8px 12px rgba(103, 65, 136, 1));
`;

export const Youtube = styled.iframe`
width: 100%;
height: auto;
aspect-ratio: 16 / 9;
`;

const Description = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 2rem;
  h4 {
    text-align: left;
    text-decoration: underline;
  }
`;
const CommentSection = styled.div`
  width: 90%;
  padding: 1rem;
  max-width: 800px;
`;

const CommentInput = styled.input`
  width: 90%;
  padding: 8px;
  margin-bottom: 10px;
`;

const CommentButton = styled.button`
  padding: 8px 12px;
  background-color: var(--main-color);
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

const CommentContainer = styled.div`
  padding: 20px;
  margin-bottom: 10px;
  display: flex;
`;

const CommentText1 = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid #674188;
`;

const CommentText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  div {
    font-size: 14px;
  }
`;

const CommentDate = styled.div`
  color: #666;
  font-size: 12px;
`;

const ReplyButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  width: 60px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: var(--main-color);
  }
`;
const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 5px 0px;
  cursor: pointer;
  width: 30px;
  font-size: 14px;

  &:hover {
    color: var(--delete-color);
  }
`;

const ReplyInput = styled.input`
  padding: 5px;
  margin-top: 5px;
  width: 100%;
`;

const LikeButtonContainer = styled.div`
  height: 30px;
  width: 160px;
  display: flex;
  align-items: center;
`;

const LikeButton = styled.button`
  height: 30px;
  width: 30px;
  padding: 3px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ liked }) => (liked ? "#674187" : "red")};
  transition: color 1s;
  margin-right: 8px;

  &:focus {
    outline: none;
  }

  svg {
    font-size: 20px;
    transition: size 1s;
    transform: ${({ liked }) => (liked ? "scale(1.3)" : "scale(.9)")};
  }
`;
const LikeCount = styled.div`
  font-size: 14px;
  color: #666;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
  color: #674188;
`;

const CommentArea = styled.div`
  width: 100%;
  background-color: var(--third-color);
  border-radius: 5px;
  padding: 10px;
`;

const RepliesArea = styled.div`
  margin-left: 20px;
  width: 100%;
`;

export default VideoLesson;
