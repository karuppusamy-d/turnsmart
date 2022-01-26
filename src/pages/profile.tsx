import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata.json";

const Profile = (): ReactElement => {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // When not logged in
    if (!currentUser) router.push("/login");
  }, [currentUser]);

  return (
    <>
      <PageSeo
        title={`Profile | ${siteMetadata.title}`}
        url={`${siteMetadata.siteUrl}/profile`}
        description="Profile"
      />

      <div className="min-h-[80vh] divide-y divide-gray-200 dark:divide-gray-700">
        {/* Header */}
        <div className="pt-10 pb-4 space-y-2 xl:space-y-3 xl:pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 xl:text-3xl">
            Your Profile
          </h1>
        </div>

        <div className="pb-12">
          {/* Basic settings */}
          <div className="py-6 space-y-8">
            {/* Avatar */}
            <div>
              <img
                alt="profile"
                src={currentUser?.photoURL || "/images/profile.svg"}
                className={`mb-4 object-cover rounded-full w-24 h-24 ${
                  !currentUser?.photoURL && "dark:invert"
                }`}
                onClick={() => {
                  console.log("Clicked");
                }}
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="text-lg font-medium">
                Your Name:
              </label>

              <div className="flex pt-2 gap-4 items-center">
                <input
                  className="input h-10 w-full max-w-sm inline m-0"
                  id="name"
                  type="text"
                  value={currentUser?.displayName || "Your name"}
                  title="Name"
                />
                <button className="btn h-10 w-24 rounded-md">Save</button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-lg font-medium">
                Your Email:
              </label>

              <div className="flex pt-2 gap-4 items-center">
                <input
                  className="input h-10 w-full max-w-sm inline m-0"
                  id="email"
                  type="email"
                  value={currentUser?.email || "Your email address"}
                  title="Name"
                />
                {!currentUser?.emailVerified && (
                  <button className="btn btn-red h-10 w-24 rounded-md">
                    Verify
                  </button>
                )}
                <button className="btn h-10 w-24 rounded-md">Save</button>
              </div>
            </div>

            {/* Reset Password */}
            <div>
              <h1 className="text-xl font-semibold">Reset Password</h1>
              <p className="mt-2 mb-4 text-base text-gray-500 dark:text-gray-400">
                Protect your account with a strong password.
              </p>

              <div className="flex gap-4">
                <button className="btn w-28">Reset</button>
              </div>
            </div>

            {/* Delete Email */}
            <div>
              <h1 className="text-xl font-semibold">Delete Account</h1>
              <p className="mt-2 mb-4 text-base text-gray-500 dark:text-gray-400">
                Permanently remove your account and all your data.
              </p>

              <div className="flex gap-4">
                <button className="btn btn-red w-28">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
