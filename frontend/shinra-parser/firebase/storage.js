import { db } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";

export async function get_json(json_to_get) {
  const storageRef = ref(db, `log/${json_to_get}.json`);
  try {
    const url = await getDownloadURL(storageRef);
    console.log(url);
    return url;
  } catch (error) {
    console.log(error);
  }
}
