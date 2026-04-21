import mysql, { RowDataPacket } from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "IDprofileproAdimin777",
  database: "profilepro_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

interface ProfileRow extends RowDataPacket {
  id: number;
  photo: string;
  name: string;
  title: string;
  email: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  github: string;
}

interface ProjectRow extends RowDataPacket {
  id: number;
  name: string;
  display_order: number;
}

interface ContentRow extends RowDataPacket {
  id: number;
  content: string;
}

export async function getProfile() {
  const [rows] = await pool.query<ProfileRow[]>("SELECT * FROM profile WHERE id = 1");
  return rows[0];
}

export async function updateProfile(data: {
  photo?: string;
  name?: string;
  title?: string;
  email?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}) {
  const fields: string[] = [];
  const values: (string | undefined)[] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  });

  if (fields.length > 0) {
    await pool.query(
      `UPDATE profile SET ${fields.join(", ")} WHERE id = 1`,
      values
    );
  }
}

export async function getProjects() {
  const [rows] = await pool.query<ProjectRow[]>(
    "SELECT name, display_order FROM projects ORDER BY display_order ASC, id ASC"
  );
  return rows;
}

export async function saveProjects(projects: string[]) {
  await pool.query("DELETE FROM projects");
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].trim()) {
      await pool.query("INSERT INTO projects (name, display_order) VALUES (?, ?)", [
        projects[i].trim(),
        i,
      ]);
    }
  }
}

export async function getAbout() {
  const [rows] = await pool.query<ContentRow[]>("SELECT content FROM about WHERE id = 1");
  return rows[0]?.content || "";
}

export async function saveAbout(content: string) {
  await pool.query("UPDATE about SET content = ? WHERE id = 1", [content]);
}

export async function getContact() {
  const [rows] = await pool.query<ContentRow[]>("SELECT content FROM contact WHERE id = 1");
  return rows[0]?.content || "";
}

export async function saveContact(content: string) {
  await pool.query("UPDATE contact SET content = ? WHERE id = 1", [content]);
}
