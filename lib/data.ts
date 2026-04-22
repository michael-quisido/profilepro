import { getDB, initDatabase } from './db';

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

export interface Project {
  id: number;
  title: string;
  description: string;
  display_order: number;
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

export async function initDB() {
  try {
    await initDatabase();
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

export async function getProfile(): Promise<ProfileData> {
  try {
    const db = await getDB();
    const [rows] = await db.execute('SELECT * FROM profile WHERE id = 1');
    const row = (rows as any[])[0];
    if (row) {
      return {
        photo: row.photo || defaultProfile.photo,
        name: row.name || defaultProfile.name,
        title: row.title || defaultProfile.title,
        email: row.email || defaultProfile.email,
        socialLinks: {
          facebook: row.facebook || '',
          twitter: row.twitter || '',
          instagram: row.instagram || '',
          linkedin: row.linkedin || '',
          github: row.github || '',
        },
      };
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
  return defaultProfile;
}

export async function updateProfile(data: Partial<ProfileData>): Promise<ProfileData> {
  try {
    const db = await getDB();
    const profile = await getProfile();
    const updated = { ...profile, ...data };
    
    await db.execute(
      `UPDATE profile SET 
        photo = ?, name = ?, title = ?, email = ?, 
        facebook = ?, twitter = ?, instagram = ?, linkedin = ?, github = ?
      WHERE id = 1`,
      [
        updated.photo,
        updated.name,
        updated.title,
        updated.email,
        updated.socialLinks.facebook || '',
        updated.socialLinks.twitter || '',
        updated.socialLinks.instagram || '',
        updated.socialLinks.linkedin || '',
        updated.socialLinks.github || '',
      ]
    );
    
    return updated;
  } catch (error) {
    console.error('Error updating profile:', error);
    return defaultProfile;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const db = await getDB();
    const [rows] = await db.execute('SELECT * FROM projects ORDER BY display_order ASC, id ASC');
    return rows as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProject(id: number): Promise<Project | null> {
  try {
    const db = await getDB();
    const [rows] = await db.execute('SELECT * FROM projects WHERE id = ?', [id]);
    const row = (rows as Project[])[0];
    return row || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function saveProject(title: string, description: string, id?: number): Promise<Project> {
  try {
    const db = await getDB();
    if (id) {
      await db.execute(
        'UPDATE projects SET title = ?, description = ? WHERE id = ?',
        [title, description, id]
      );
      return { id, title, description, display_order: 0 };
    } else {
      const [result] = await db.execute(
        'INSERT INTO projects (title, description) VALUES (?, ?)',
        [title, description]
      );
      return { id: (result as any).insertId, title, description, display_order: 0 };
    }
  } catch (error) {
    console.error('Error saving project:', error);
    throw error;
  }
}

export async function deleteProject(id: number): Promise<void> {
  try {
    const db = await getDB();
    await db.execute('DELETE FROM projects WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting project:', error);
  }
}

export async function getAbout(): Promise<string> {
  try {
    const db = await getDB();
    const [rows] = await db.execute('SELECT content FROM about WHERE id = 1');
    const row = (rows as any[])[0];
    return row?.content || '';
  } catch (error) {
    console.error('Error fetching about:', error);
    return '';
  }
}

export async function updateAbout(content: string): Promise<void> {
  try {
    const db = await getDB();
    await db.execute('UPDATE about SET content = ? WHERE id = 1', [content]);
  } catch (error) {
    console.error('Error updating about:', error);
  }
}

export async function getContact(): Promise<string> {
  try {
    const db = await getDB();
    const [rows] = await db.execute('SELECT content FROM contact WHERE id = 1');
    const row = (rows as any[])[0];
    return row?.content || '';
  } catch (error) {
    console.error('Error fetching contact:', error);
    return '';
  }
}

export async function updateContact(content: string): Promise<void> {
  try {
    const db = await getDB();
    await db.execute('UPDATE contact SET content = ? WHERE id = 1', [content]);
  } catch (error) {
    console.error('Error updating contact:', error);
  }
}

let visitors: Visitor[] = [];

export function addVisitor(visitor: Omit<Visitor, 'id'>): void {
  visitors.push({
    ...visitor,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  });
}

export function getVisitors(): Visitor[] {
  return [...visitors];
}