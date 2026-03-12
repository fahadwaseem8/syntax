function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function config() {
  return {
    rapidApi: {
      key: requireEnv("RAPIDAPI_KEY"),
      host: requireEnv("RAPIDAPI_HOST"),
      url: requireEnv("RAPIDAPI_URL"),
    },
  };
}
