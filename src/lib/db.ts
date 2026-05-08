export interface UploadedImage {
  id: string;
  src: string; // Base64 encoded string
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
  id: string; // The role or a unique ID. We'll use name or id to identify.
  name: string;
  role: string;
  desc: string;
  img: string; // Base64
  timestamp: number;
}

const DB_NAME = "gilded-events-db";
const STORE_NAME = "gallery-images";
const CONTACT_STORE = "contact-messages";
const TEAM_STORE = "team-members";
const DB_VERSION = 3;

export function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(CONTACT_STORE)) {
        db.createObjectStore(CONTACT_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(TEAM_STORE)) {
        db.createObjectStore(TEAM_STORE, { keyPath: "id" });
      }
    };
  });
}

export async function saveUploadedImage(image: UploadedImage): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(image);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getUploadedImages(): Promise<UploadedImage[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const items = request.result as UploadedImage[];
      items.sort((a, b) => b.timestamp - a.timestamp);
      resolve(items);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function saveContactMessage(message: ContactMessage): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CONTACT_STORE, "readwrite");
    const store = transaction.objectStore(CONTACT_STORE);
    const request = store.put(message);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CONTACT_STORE, "readonly");
    const store = transaction.objectStore(CONTACT_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      const items = request.result as ContactMessage[];
      items.sort((a, b) => b.timestamp - a.timestamp);
      resolve(items);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function deleteUploadedImage(id: string): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function saveTeamMember(member: TeamMember): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TEAM_STORE, "readwrite");
    const store = transaction.objectStore(TEAM_STORE);
    const request = store.put(member);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TEAM_STORE, "readonly");
    const store = transaction.objectStore(TEAM_STORE);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as TeamMember[]);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteTeamMember(id: string): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TEAM_STORE, "readwrite");
    const store = transaction.objectStore(TEAM_STORE);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
