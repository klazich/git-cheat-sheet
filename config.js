import path from 'path'

export default {
  cwd: path.resolve(__dirname, '..'),
  app: {
    port: process.env.APP_PORT || 3001,
  },
  local: {
    port: process.env.LOCAL_AUTH_PORT || 3003,
  },
  jwt: {
    port: process.env.JWT_AUTH_PORT || 3002,
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
