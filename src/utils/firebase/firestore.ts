/* eslint-disable @typescript-eslint/no-explicit-any */
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
  addDoc,
  DocumentReference,
  deleteDoc,
  updateDoc,
} from "@firebase/firestore";
import { DeviceTraits } from "@/lib/smarthome/deviceTraits";
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
    [key: string]: "number" | "boolean";
  };
  smarthome: {
    enabled: boolean;
    nicknames: string[];
    type: DeviceTypes;
    traits: DeviceTraits[];
    target: string;
  };
};

const db = getFirestore(app);

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

export {
  db,
  getProjectByUID,
  getProjectsByUserId,
  addProject,
  updateProject,
  deleteProject,
};
