export const verifyEnvironmentCheck = (): void => {
  const { DB_CONNECTION_STRING, PORT, JWT__AUTH_SECRET_KEY } = process.env;

  if (!DB_CONNECTION_STRING) {
    throw new Error("DB_CONNECTION_STRING is not defined");
  }

  if (!PORT) {
    process.env.PORT = "5000";
  }

  if (!JWT__AUTH_SECRET_KEY) {
    throw new Error("JWT__AUTH_SECRET_KEY is not defined");
  }
};
