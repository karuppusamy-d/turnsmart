/* eslint-disable @typescript-eslint/no-explicit-any */
import { app } from "./app";
import { getFirestore } from "@firebase/firestore/lite";
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
  addDoc,
  DocumentReference,
  deleteDoc,
  updateDoc,
} from "@firebase/firestore/lite";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { DeviceTraits, DeviceTraitStates } from "@/lib/smarthome/deviceTraits";
import { DeviceTypes } from "@/lib/smarthome/deviceTypes";

export type ProjectData = {
  name: string;
  description: string;
  userid: string;
  uid?: string;
  secret: string;
  data: {
    [key: string]: number | boolean;
  };
  endpoints: {
    [key: string]: "number" | "boolean" | "color";
  };
  smarthome: {
    enabled: boolean;
    nicknames: string[];
    type: DeviceTypes;
    traits: {
      [Trait in DeviceTraits]?: { [key in DeviceTraitStates<Trait>]: string };
    };
  };
};

const db = getFirestore(app);
const storage = getStorage(app);

const projectCollection = collection(
  db,
  "projects"
) as CollectionReference<ProjectData>;

const addProject = (
  data: ProjectData
): Promise<DocumentReference<ProjectData>> => addDoc(projectCollection, data);

const updateProject = (
  uid: string,
  data: { [key: string]: any }
): Promise<void> => updateDoc(doc(projectCollection, uid), data);

const deleteProject = (uid: string): Promise<void> =>
  deleteDoc(doc(projectCollection, uid));

const getProjectByUID = (uid: string): Promise<DocumentSnapshot<ProjectData>> =>
  getDoc(doc(projectCollection, uid));

const getProjectsByUserId = (
  userid: string
): Promise<QuerySnapshot<ProjectData>> =>
  getDocs(query(projectCollection, where("userid", "==", userid)));

const uploadProfileImage = async (uid: string, file: File): Promise<string> => {
  const storageRef = ref(storage, `${uid}/profilePicture/profile`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};

export {
  db,
  storage,
  getProjectByUID,
  getProjectsByUserId,
  addProject,
  updateProject,
  deleteProject,
  uploadProfileImage,
};
