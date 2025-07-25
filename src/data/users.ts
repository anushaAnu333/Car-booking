import { User } from "@/types/api";

export const users: User[] = [
  {
    id: "1",
    email: "admin@morent.com",
    name: "Admin User",
    phone: "+1234567890",
    avatar: "/user-avatar.svg",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "alex.stanton@example.com",
    name: "Alex Stanton",
    phone: "+1234567891",
    avatar: "/user-avatar.svg",
    role: "user",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    email: "skylar.dias@example.com",
    name: "Skylar Dias",
    phone: "+1234567892",
    avatar: "/user-avatar.svg",
    role: "user",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
];

// Mock password storage (in production, use proper hashing)
export const passwords: Record<string, string> = {
  "admin@morent.com": "admin123",
  "alex.stanton@example.com": "password123",
  "skylar.dias@example.com": "password123",
};
