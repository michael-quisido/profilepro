import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'IDprofileproAdimin777',
  database: process.env.DB_NAME || 'profilepro_db',
};

let pool: mysql.Pool | null = null;

export async function getDB() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

export async function initDatabase() {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  });

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS profile (
      id INT PRIMARY KEY DEFAULT 1,
      photo VARCHAR(500) DEFAULT '/images/mommy_200x200.jpg',
      name VARCHAR(255) DEFAULT 'Jhona Aima C. Quisido',
      title VARCHAR(255) DEFAULT 'Expert/ Web Research Specialist',
      email VARCHAR(255) DEFAULT 'mike082112@gmail.com',
      facebook VARCHAR(500),
      twitter VARCHAR(500),
      instagram VARCHAR(500),
      linkedin VARCHAR(500),
      github VARCHAR(500),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      display_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS about (
      id INT PRIMARY KEY DEFAULT 1,
      content TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS contact (
      id INT PRIMARY KEY DEFAULT 1,
      content TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  const [profileRows] = await connection.execute('SELECT * FROM profile WHERE id = 1');
  if ((profileRows as any[]).length === 0) {
    await connection.execute(`
      INSERT INTO profile (id, photo, name, title, email, facebook, twitter, instagram, linkedin, github)
      VALUES (1, '/images/mommy_200x200.jpg', 'Jhona Aima C. Quisido', 'Expert/ Web Research Specialist', 'mike082112@gmail.com', 'https://facebook.com', 'https://twitter.com', 'https://instagram.com', 'https://linkedin.com', 'https://github.com')
    `);
  } else {
    const row = (profileRows as any[])[0];
    if (!row.facebook && !row.twitter && !row.instagram && !row.linkedin && !row.github) {
      await connection.execute(`
        UPDATE profile SET facebook = 'https://facebook.com', twitter = 'https://twitter.com', instagram = 'https://instagram.com', linkedin = 'https://linkedin.com', github = 'https://github.com' WHERE id = 1
      `);
    }
  }

  const [aboutRows] = await connection.execute('SELECT * FROM about WHERE id = 1');
  if ((aboutRows as any[]).length === 0) {
    await connection.execute(`
      INSERT INTO about (id, content) VALUES (1, '<p>I excel in crafting and cultivating high-quality lists that drive exceptional results. With a keen eye for detail and an unwavering commitment to excellence, I employ my expertise in email search techniques to locate elusive contacts and valuable leads.</p><p>I am dedicated to helping businesses reach new heights by providing them with the most accurate and targeted lists possible.</p><p>Let me be your guide in building a robust network and maximizing your outreach potential.</p>')
    `);
  }

  const [contactRows] = await connection.execute('SELECT * FROM contact WHERE id = 1');
  if ((contactRows as any[]).length === 0) {
    await connection.execute(`
      INSERT INTO contact (id, content) VALUES (1, '<p><strong>Phone:</strong> 09940487911</p><p><strong>Email:</strong> jhonaimaquisido@gmail.com</p><p><strong>Email:</strong> mike082112@gmail.com</p>')
    `);
  }

  await connection.end();
}