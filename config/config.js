const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',

  db: {
    user: process.env.ORACLE_USER || 'COMP214_M25_zor_74',
    password: process.env.ORACLE_PASSWORD || 'password',
    connectString: process.env.ORACLE_CONNECT_STRING || '199.212.26.208:1521/SQLD'
  }
};

export default config;