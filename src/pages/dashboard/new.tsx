import { FormEvent, ReactElement, useRef, useState } from "react";
import { useRouter } from "next/router";
import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata.json";
import { useAuthContext } from "@/components/contexts/useAuthContext";

import { addProject, ProjectData } from "@/utils/firebase";
import randomPassword from "@/lib/randomPassword";

const Login = (): ReactElement => {
  const [error, setError] = useState("");
  const { currentUser } = useAuthContext();
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();
  if (!currentUser) router.push("/");

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!nameRef.current || !descriptionRef.current)
      return setError("Someting went wrong");

    setError("");

    if (currentUser?.uid) {
      const name = nameRef.current.value;
      const description = descriptionRef.current.value;
      const secret = randomPassword(10);

      const project: ProjectData = {
        name: name,
        description: description,
        secret: secret,
        userid: currentUser?.uid,
        data: {},
        fields: {},
      };
      addProject(project)
        .then(() => router.push("/dashboard"))
        .catch(() => {
          setError("Someting went wrong");
        });
    }
  }

  return (
    <>
      <PageSeo
        title={`${siteMetadata.title} | New Project`}
        url={`${siteMetadata.siteUrl}/dashboard/new`}
        description="Create new project"
      />

      <div className="py-20 min-h-[80vh]">
        <div className="p-8 sm:p-12 sm:max-w-lg m-auto rounded shadow-light dark:bg-gray-800">
          <form className="flex flex-col mb-6" onSubmit={handleSubmit}>
            <h2 className="text-primary-400 dark:text-gray-100 text-center text-3xl font-bold mb-8">
              New project
            </h2>

            <label className="font-semibold text-xs" htmlFor="name">
              Name
            </label>
            <input
              className="input"
              id="name"
              ref={nameRef}
              type="text"
              required
            />

            <label className="font-semibold text-xs mt-6" htmlFor="discription">
              Description
            </label>
            <textarea
              className="input"
              id="discription"
              rows={4}
              ref={descriptionRef}
              required
            />

            {error && (
              <div className="mt-3 text-xs font-medium text-red-500 dark:text-red-400">
                {error}
              </div>
            )}

            <button className="btn h-10 mt-8 rounded" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
