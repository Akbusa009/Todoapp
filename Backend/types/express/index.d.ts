declare global {
  namespace Express {
    interface AuthUser {
      id: string;
      email: string;
      name: string;
    }

    interface Request {
      user?: AuthUser;
    }
  }
}

export {};

