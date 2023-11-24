declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GOOGLE_ID: string;
        GOOGLE_SECRET: string;
        MONGODB_URI: string;
        JWT_KEY: string;
        NEXTAUTH_SECRET: string;
        NEXT_PUBLIC_API_URL: string;
        NEXT_PUBLIC_CLIENT_URL: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}