import path from 'path'

export default {
  cwd: path.resolve(__dirname, '..'),
  client: {
    port: process.env.DEV_PORT || 3000,
  },
  app: {
    port: process.env.API_PORT || 3100,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    auth: process.env.DB_AUTH || false,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.NODE_ENV === 'production' ? 'gcs' : 'gcs_dev',
  },
}
