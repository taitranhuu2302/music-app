import { useCallback, useEffect, useState } from 'react';
import { firebaseStore } from '../configs/firebase';
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  where,
  getDocs,
} from 'firebase/firestore';
import { FAVORITE_DB } from '../constants/DB';

const useFavorite = () => {
  const [favorite, setFavorite] = useState<SongType[]>([]);

  useEffect(() => {
    getFavorite();
  }, []);

  const getFavorite = () => {
    const q = query(collection(firebaseStore, FAVORITE_DB));
    onSnapshot(q, (querySnapshot) => {
      setFavorite(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as SongType[]
      );
    });
  };

  const onToggleFavorite = useCallback(
    async (song: SongType) => {
      try {
        const q = query(
          collection(firebaseStore, FAVORITE_DB),
          where('id', '==', song.id)
        );

        const songSnapshot = await getDocs(q);
        const isCheck = songSnapshot.docs.map((doc) => ({ ...doc.data() }));
        if (isCheck.length <= 0) {
          await addDoc(collection(firebaseStore, FAVORITE_DB), song);
          setFavorite([...favorite, song]);
          return;
        }

        songSnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        setFavorite(favorite.filter((item) => item.id !== song.id));
      } catch (e) {
        console.log(e);
      }
    },
    [favorite, firebaseStore]
  );

  return {
    favorite,
    onToggleFavorite,
  };
};

export default useFavorite;
