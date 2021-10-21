import React, {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { app } from "@/utils/firebase";
import {
  getAuth,
  Auth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail as updateEmailAuth,
  updatePassword as updatePasswordAuth,
  User,
  UserCredential,
  AuthProvider as Provider,
} from "firebase/auth";

type AuthProviderType = ({ children }: { children: ReactNode }) => ReactElement;
type Login = (email: string, password: string) => Promise<UserCredential>;
type LoginWithPopup = (provider: Provider) => Promise<UserCredential>;
type Signup = (email: string, password: string) => Promise<UserCredential>;

type ContextValue = {
  auth: Auth;
  currentUser: User | null;
  login: Login;
  loginWithPopup: LoginWithPopup;
  signup: Signup;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void> | null;
  updatePassword: (password: string) => Promise<void> | null;
};

const AuthContext = React.createContext<ContextValue | undefined>(undefined);

const useAuthContext = (): ContextValue => {
  return useContext(AuthContext) as ContextValue;
};

const AuthProvider: AuthProviderType = ({ children }) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login: Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithPopup: LoginWithPopup = (provider) => {
    return signInWithPopup(auth, provider);
  };

  const signup: Signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = (): Promise<void> => {
    return auth.signOut();
  };

  const resetPassword = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateEmail = (email: string): Promise<void> | null => {
    return auth.currentUser && updateEmailAuth(auth.currentUser, email);
  };

  const updatePassword = (password: string): Promise<void> | null => {
    return auth.currentUser && updatePasswordAuth(auth.currentUser, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    auth,
    currentUser,
    login,
    loginWithPopup,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center h-[100vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
export default AuthContext;
