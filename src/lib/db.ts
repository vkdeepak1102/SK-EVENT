import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnp_Jkn2Q8RglgMw4EKI1bIOxkPqJV8NE",
  authDomain: "sk-event-management-75fa5.firebaseapp.com",
  projectId: "sk-event-management-75fa5",
  storageBucket: "sk-event-management-75fa5.firebasestorage.app",
  messagingSenderId: "355921708790",
  appId: "1:355921708790:web:de12cec09fa1acbcaf4ed7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export interface UploadedImage {
  id: string;
  src: string; // Will store the Firebase Storage URL, or incoming base64
  cat: string;
  h: "tall" | "med" | "short";
  timestamp: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  type: string;
  message: string;
  timestamp: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  desc: string;
  img: string; // Will store the Firebase Storage URL, or incoming base64
  timestamp: number;
}

export async function saveUploadedImage(image: UploadedImage): Promise<void> {
  const storageRef = ref(storage, `gallery/${image.id}`);
  
  if (image.src.startsWith('data:')) {
    await uploadString(storageRef, image.src, 'data_url');
    const downloadUrl = await getDownloadURL(storageRef);
    image.src = downloadUrl;
  }
  
  await setDoc(doc(db, "gallery", image.id), image);
}

export async function getUploadedImages(): Promise<UploadedImage[]> {
  const querySnapshot = await getDocs(collection(db, "gallery"));
  const items = querySnapshot.docs.map(doc => doc.data() as UploadedImage);
  return items.sort((a, b) => b.timestamp - a.timestamp);
}

export async function deleteUploadedImage(id: string): Promise<void> {
  await deleteDoc(doc(db, "gallery", id));
  await deleteObject(ref(storage, `gallery/${id}`)).catch(console.error);
}

export async function saveContactMessage(message: ContactMessage): Promise<void> {
  await setDoc(doc(db, "messages", message.id), message);
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const querySnapshot = await getDocs(collection(db, "messages"));
  const items = querySnapshot.docs.map(doc => doc.data() as ContactMessage);
  return items.sort((a, b) => b.timestamp - a.timestamp);
}

export async function saveTeamMember(member: TeamMember): Promise<void> {
  const storageRef = ref(storage, `team/${member.id}`);
  
  if (member.img.startsWith('data:')) {
    await uploadString(storageRef, member.img, 'data_url');
    const downloadUrl = await getDownloadURL(storageRef);
    member.img = downloadUrl;
  }
  
  await setDoc(doc(db, "team", member.id), member);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const querySnapshot = await getDocs(collection(db, "team"));
  const items = querySnapshot.docs.map(doc => doc.data() as TeamMember);
  return items.sort((a, b) => b.timestamp - a.timestamp);
}

export async function deleteTeamMember(id: string): Promise<void> {
  await deleteDoc(doc(db, "team", id));
  await deleteObject(ref(storage, `team/${id}`)).catch(console.error);
}
