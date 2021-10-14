import { ReactElement } from "react";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { GoogleAuthProvider } from "@firebase/auth";
import { useRouter } from "next/router";

const Login = (): ReactElement => {
  const { currentUser, loginWithPopup } = useAuthContext();
  const router = useRouter();
  if (currentUser) router.push("/");

  return (
    <div className="flex flex-col md:justify-center md:items-center space-y-6 min-h-[80vh]">
      <button
        className="btn"
        onClick={() => loginWithPopup(new GoogleAuthProvider())}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
