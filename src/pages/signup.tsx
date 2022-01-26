import { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata.json";
import Link from "@/components/Link";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { useAlertContext } from "@/components/contexts/useAlertContext";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
} from "@firebase/auth";
import { FirebaseError } from "@firebase/util";

const Signup = (): ReactElement => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState({ type: "", message: "" });
  const { currentUser, signup, loginWithPopup } = useAuthContext();
  const { showAlert } = useAlertContext();
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if user is already logged in
    if (currentUser) router.push("/dashboard");
  }, [currentUser]);

  // Function to handle error
  const handleError = (ele: HTMLInputElement, message: string): void => {
    // Add error class to the element
    ele.classList.add("error");

    // To Remove error class on value change
    ele.addEventListener(
      "input",
      (e: Event) => {
        setError({ type: "", message: "" });
        (e.target as HTMLInputElement).classList.remove("error");
      },
      { once: true }
    );

    // Focus on the element
    ele.focus();
    // Set error message
    setError({ type: ele.id, message });
    showAlert(message, "error");
  };

  // Function to handle signup form submit
  async function handleSignup(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    // Check if email and password are not empty
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !passwordConfirmRef.current
    )
      return setError({
        type: "passwordConfirm",
        message: "Someting went wrong",
      });

    // Reset error
    setError({ type: "", message: "" });

    try {
      // Get email, password and passwordConfirm
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const passwordConfirm = passwordConfirmRef.current.value;

      // Check if password and passwordConfirm are equal
      if (password !== passwordConfirm)
        return handleError(
          passwordConfirmRef.current,
          "Passwords didn’t match"
        );

      // Signup with email and password
      await signup(email, password);
    } catch (err) {
      // Handle error
      switch ((err as FirebaseError).code) {
        case "auth/email-already-in-use":
          handleError(emailRef.current, "Account already exists");
          break;
        case "auth/invalid-email":
          handleError(emailRef.current, "Please enter valid email");
          break;
        case "auth/weak-password":
          handleError(passwordRef.current, "Please provide a strong password");
          break;
        case "auth/too-many-requests":
          handleError(
            passwordConfirmRef.current,
            "Too many attempts, Please try again later"
          );
          break;
        default:
          setError({ type: "passwordConfirm", message: "Someting went wrong" });
      }
    }
  }

  return (
    <>
      {/* SEO */}
      <PageSeo
        title={`Sign up | ${siteMetadata.title}`}
        url={`${siteMetadata.siteUrl}/signup`}
        description="Sign up"
      />

      <div className="py-20 min-h-[80vh]">
        <div className="p-8 sm:p-12 sm:max-w-lg m-auto rounded shadow-light dark:bg-gray-800">
          {/* Signup form */}
          <form className="flex flex-col" onSubmit={handleSignup}>
            <h2 className="text-primary-400 dark:text-gray-100 text-center text-3xl font-bold mb-8">
              Sign up
            </h2>

            {/* Email Input */}
            <label className="font-semibold text-xs" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              id="email"
              ref={emailRef}
              type="email"
              required
            />

            {/* Email error message */}
            {error.type == "email" && (
              <div className="mt-3 text-xs font-medium text-red-500 dark:text-red-400">
                {error.message}
              </div>
            )}

            {/* Password Input */}
            <label className="font-semibold text-xs mt-6" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              ref={passwordRef}
              type="password"
              required
              minLength={6}
            />

            {/* Password error message */}
            {error.type == "password" && (
              <div className="mt-3 text-xs font-medium text-red-500 dark:text-red-400">
                {error.message}
              </div>
            )}

            {/* Password Confirm Input */}
            <label
              className="font-semibold text-xs mt-6"
              htmlFor="passwordConfirm"
            >
              Password Confirm
            </label>
            <input
              className="input"
              id="passwordConfirm"
              ref={passwordConfirmRef}
              type="password"
              required
              minLength={6}
            />

            {/* Password confirm error message */}
            {error.type == "passwordConfirm" && (
              <div className="mt-3 text-xs font-medium text-red-500 dark:text-red-400">
                {error.message}
              </div>
            )}

            {/* Signup Button */}
            <button className="btn h-10 mt-8 rounded" type="submit">
              Sign Up
            </button>
          </form>

          <div className="flex mt-6 justify-center text-xs">
            {/* Link to forgot password page */}
            <Link
              href="/forgot_password"
              className="text-primary-400 hover:text-primary-500"
            >
              Forgot Password
            </Link>
            <span className="mx-2 text-gray-300 dark:text-gray-400">/</span>
            {/* Link to login page */}
            <Link
              href="/login"
              className="text-primary-400 hover:text-primary-500"
            >
              Login
            </Link>
          </div>

          <div className="flex my-4 items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-400"></div>
            <p className="px-3 text-sm text-gray-400">Login with</p>
            <div className="flex-1 h-px sm:w-16 bg-gray-400"></div>
          </div>

          <div className="flex justify-center space-x-3">
            {/* Log in with Google */}
            <button
              onClick={() => loginWithPopup(new GoogleAuthProvider())}
              aria-label="Log in with Google"
              className="p-3 rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path
                    fill="#4285F4"
                    d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                  />
                </g>
              </svg>
            </button>
            {/* Log in with Twitter */}
            <button
              onClick={() => loginWithPopup(new TwitterAuthProvider())}
              aria-label="Log in with Twitter"
              className="p-3 rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                  fill="#1D9BF0"
                ></path>
              </svg>
            </button>
            {/* Log in with GitHub */}
            <button
              onClick={() => loginWithPopup(new GithubAuthProvider())}
              aria-label="Log in with GitHub"
              className="p-3 rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-current"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
