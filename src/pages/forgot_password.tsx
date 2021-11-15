import { FormEvent, ReactElement, useRef, useState } from "react";
import { useRouter } from "next/router";
import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata.json";
import Link from "@/components/Link";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { FirebaseError } from "@firebase/util";

const ForgotPassword = (): ReactElement => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const { currentUser, resetPassword } = useAuthContext();

  const router = useRouter();
  if (currentUser) router.push("/");

  const handleError = (ele: HTMLInputElement, message: string): void => {
    ele.classList.add("error");

    // To Remove error class on value change
    ele.addEventListener(
      "input",
      (e: Event) => {
        setStatus({ type: "", message: "" });
        (e.target as HTMLInputElement).classList.remove("error");
      },
      { once: true }
    );

    ele.focus();
    setStatus({ type: "error", message });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!emailRef.current)
      return setStatus({ type: "error", message: "Someting went wrong" });

    setStatus({ type: "", message: "" });

    try {
      const email = emailRef.current.value;

      await resetPassword(email);
      setStatus({
        type: "success",
        message: "Please check your email to reset password",
      });
    } catch (err) {
      switch ((err as FirebaseError).code) {
        case "auth/invalid-email":
          handleError(emailRef.current, "Please enter valid email");
          break;
        case "auth/user-not-found":
          handleError(emailRef.current, "Couldn’t find your account");
          break;
        case "auth/too-many-requests":
          handleError(
            emailRef.current,
            "Too many attempts, Please try again later"
          );
          break;
        case "auth/user-disabled":
          setStatus({
            type: "error",
            message: "Your account has been disabled",
          });
          break;
        default:
          setStatus({ type: "error", message: "Someting went wrong" });
      }
    }
  }

  return (
    <>
      <PageSeo
        title={`Forgot password | ${siteMetadata.title}`}
        url={`${siteMetadata.siteUrl}/forgot_password`}
        description="Forgot password"
      />

      <div className="py-20 min-h-[80vh]">
        <div className="p-8 sm:p-12 sm:max-w-lg m-auto rounded shadow-light dark:bg-gray-800">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <h2 className="text-primary-400 dark:text-gray-100 text-center text-3xl font-bold mb-8">
              Forgot password
            </h2>

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

            {status.message && (
              <div
                className={`mt-3 text-xs font-medium ${
                  status.type == "success"
                    ? "text-green-500 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                } `}
              >
                {status.message}
              </div>
            )}

            <button className="btn h-10 mt-8 rounded" type="submit">
              Submit
            </button>
          </form>

          <div className="flex mt-6 justify-center text-xs">
            <Link
              href="/login"
              className="text-primary-400 hover:text-primary-500"
            >
              Login
            </Link>
            <span className="mx-2 text-gray-300 dark:text-gray-400">/</span>
            <Link
              href="/signup"
              className="text-primary-400 hover:text-primary-500"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
