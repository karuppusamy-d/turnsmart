import { app } from ".";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  CollectionReference,
  doc,
  getDoc,
  DocumentSnapshot,
} from "@firebase/firestore";

export type ProjectData = {
  name: string;
  description: string;
  userid: string;
  uid?: string;
  secret: string;
  data: {
    [key: string]: number | boolean;
  };
};

const db = getFirestore(app);

const projectCollection = collection(
  db,
  "projects"
) as CollectionReference<ProjectData>;

const getProjectByUID = (uid: string): Promise<DocumentSnapshot<ProjectData>> =>
  getDoc(doc(projectCollection, uid));

const getProjectsByUserId = (
  userid: string
): Promise<QuerySnapshot<ProjectData>> =>
  getDocs(query(projectCollection, where("userid", "==", userid)));

export { db, getProjectByUID, getProjectsByUserId };
