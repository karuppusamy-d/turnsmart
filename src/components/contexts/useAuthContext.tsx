import {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
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
  updateProfile as updateProfileAuth,
  updatePassword as updatePasswordAuth,
  sendEmailVerification,
  User,
  UserCredential,
  AuthProvider as Provider,
} from "firebase/auth";

// Type definitions for useAuthContext
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
  updateProfile: (data: {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
  }) => Promise<void> | null;
  updatePassword: (password: string) => Promise<void> | null;
  verifyEmail: () => Promise<void> | null;
};

// Create the context
const AuthContext = createContext<ContextValue | undefined>(undefined);

// Use the context
const useAuthContext = (): ContextValue => {
  return useContext(AuthContext) as ContextValue;
};

// Create the provider
const AuthProvider: AuthProviderType = ({ children }) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Login using email and password
   * @param email - email of the user
   * @param password - password of the user
   * @returns If succeeds, returns the signed in user. If sign in was unsuccessful, returns an error object containing additional information about the error.
   */
  const login: Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /**
   *  Login with popup using a provider
   * @param provider - The provider to authenticate. The provider has to be an OAuthProvider. Non-OAuth providers like EmailAuthProvider will throw an error.
   * @returns If succeeds, returns the signed in user along with the provider's credential. If sign in was unsuccessful, returns an error object containing additional information about the error.
   */
  const loginWithPopup: LoginWithPopup = (provider) => {
    return signInWithPopup(auth, provider);
  };

  /**
   *  Sign up with email and password.
   *
   * On successful creation of the user account, this user will also be signed in to your application.
   *
   * @param email - email of the user
   * @param password - password of the user
   * @returns UserCredential
   */
  const signup: Signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /**
   *  Logout the current user.
   */
  const logout = (): Promise<void> => {
    return auth.signOut();
  };

  /**
   * Send a password reset email to the specified email address.
   * @param email - email of the user
   */
  const resetPassword = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  };

  /**
   * Updates the user's email address.
   * @param email - new email of the user
   */
  const updateEmail = (email: string): Promise<void> | null => {
    return currentUser && updateEmailAuth(currentUser, email);
  };

  /**
   * Updates the username and/or photo URL of the user.
   * @param displayName - new display name of the user
   * @param photoURL - new photo url of the user
   */
  const updateProfile = (data: {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
  }): Promise<void> | null => {
    return currentUser && updateProfileAuth(currentUser, data);
  };

  /**
   * Updates the user's password.
   * @param password - new password of the user
   */
  const updatePassword = (password: string): Promise<void> | null => {
    return currentUser && updatePasswordAuth(currentUser, password);
  };

  /**
   * Sends a verification email to the current user's email address.
   */
  const verifyEmail = (): Promise<void> | null => {
    return currentUser && sendEmailVerification(currentUser);
  };

  // Update the current user on auth state change (login/logout)
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
    updateProfile,
    updatePassword,
    verifyEmail,
  };

  // Return the provider
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
