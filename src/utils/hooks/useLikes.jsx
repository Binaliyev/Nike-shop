import { useEffect, useState } from "react";

export const useLikes = () => {
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    const storedLikes = localStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
  }, []);

  const handleLike = (id, data) => {
    const newLikes = [...likes];
    const index = newLikes.findIndex((like) => like.id === id);

    if (index === -1) {
      newLikes.push({ id, liked: true, data });
    } else {
      newLikes[index].liked = !newLikes[index].liked;
      if (!newLikes[index].liked) {
        newLikes.splice(index, 1);
      }
    }

    setLikes(newLikes);
    localStorage.setItem("likes", JSON.stringify(newLikes));
  };

  return { likes, handleLike };
};
