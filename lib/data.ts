export interface ProfileData {
  photo: string;
  name: string;
  title: string;
  email: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Visitor {
  id: string;
  ip: string;
  region: string;
  country: string;
  timestamp: string;
}

export const defaultProfile: ProfileData = {
  photo: "/images/mommy_200x200.jpg",
  name: "Jhona Aima C. Quisido",
  title: "Expert/ Web Research Specialist",
  email: "mike082112@gmail.com",
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
};

let profileData: ProfileData = { ...defaultProfile };
let visitors: Visitor[] = [];

export function getProfile(): ProfileData {
  return { ...profileData };
}

export function updateProfile(data: Partial<ProfileData>): ProfileData {
  profileData = { ...profileData, ...data };
  return { ...profileData };
}

export function addVisitor(visitor: Omit<Visitor, 'id'>): void {
  visitors.push({
    ...visitor,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  });
}

export function getVisitors(): Visitor[] {
  return [...visitors];
}