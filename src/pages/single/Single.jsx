import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import { useLocation } from "react-router-dom";
import styles from "./single.module.css";

export default function Single() {
  const location = useLocation();
  const Data = location.state.postData;

  return (
    <div className={styles.single}>
      <SinglePost
        tittle={Data.tittle}
        text={Data.text}
        img={Data.img}
        id={Data.id}
        author={Data.author}
        cat={Data.cat}
        publicationDate={Data.publicationDate}
        passedTime={Data.passedTime}
      />
      <Sidebar />
    </div>
  );
}
