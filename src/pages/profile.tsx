import { FormEvent, ReactElement, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { useAlertContext } from "@/components/contexts/useAlertContext";
import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata.json";
import { FirebaseError } from "firebase/app";
import { uploadProfileImage } from "@/utils/firebase";

const Profile = (): ReactElement => {
  const {
    currentUser,
    updateProfile,
    updateEmail,
    verifyEmail,
    resetPassword,
  } = useAuthContext();
  const { showAlert } = useAlertContext();
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // When not logged in
    if (!currentUser) router.push("/login");
  }, [currentUser]);

  const handleImageChange = async (): Promise<void> => {
    const file =
      imageInputRef.current?.files && imageInputRef.current?.files[0];

    // If no file is selected or user not logged in
    if (!file || !currentUser?.uid) return;

    if (Math.round(file.size / 1024) > 1100) {
      showAlert(
        "Image size is too big. Please select a image less than 1MB",
        "error"
      );
      return;
    }

    // Upload image to firebase
    const url = await uploadProfileImage(currentUser?.uid, file).catch(() => {
      showAlert(
        "Something went wrong while uploading your profile image",
        "error"
      );
    });

    try {
      if (url) {
        // Update profile image url
        await updateProfile({ photoURL: url });
        showAlert("Profile image updated successfully", "success");
      }
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const handleEmailVerification = async (): Promise<void> => {
    try {
      await verifyEmail();
      showAlert("Verification link has been sent to your email", "success");
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const handleNameChange = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      // Get the name from the input
      const name = new FormData(e.currentTarget).get("name")?.toString();
      if (!name) {
        showAlert("Something went wrong", "error");
        return;
      }

      // Update the name
      await updateProfile({ displayName: name });
      showAlert("Name updated successfully", "success");
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const handleEmailChange = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      // Get the email from the input
      const email = new FormData(e.currentTarget).get("email")?.toString();
      if (!email) {
        showAlert("Something went wrong", "error");
        return;
      }

      // Update the email
      await updateEmail(email);
      showAlert("Email updated successfully", "success");
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const handlePasswordReset = async (): Promise<void> => {
    try {
      if (!currentUser?.email) {
        showAlert("Something went wrong", "error");
        return;
      }

      // Send password reset link to the email
      await resetPassword(currentUser?.email);
      showAlert("Password reset link has been sent to your email", "success");
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const handleFirebaseError = (err: unknown): void => {
    switch ((err as FirebaseError)?.code) {
      case "auth/invalid-email":
        showAlert("Please enter valid email", "error");
        break;
      case "auth/email-already-in-use":
        showAlert("Account already exists", "error");
        break;
      case "auth/user-not-found":
        showAlert("Couldn’t find your account", "error");
        break;
      case "auth/wrong-password":
        showAlert("Please check your password", "error");
        break;
      case "auth/too-many-requests":
        showAlert("Too many attempts, Please try again later", "error");
        break;
      case "auth/user-disabled":
        showAlert("Your account has been disabled", "error");
        break;
      case "auth/requires-recent-login":
        showAlert("Please logout and login again to continue", "error");
        break;
      default:
        showAlert("Something went wrong", "error");
    }
    console.error(err);
  };

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
                alt="avatar"
                src={currentUser?.photoURL || "/images/profile.svg"}
                className={`mb-4 object-cover rounded-full w-24 h-24 cursor-pointer ${
                  !currentUser?.photoURL && "dark:invert"
                }`}
                onClick={() => {
                  imageInputRef.current?.click();
                }}
              />
              <input
                ref={imageInputRef}
                type="file"
                alt="choose profile avatar"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="text-lg font-medium">
                Your Name:
              </label>

              <form
                className="flex pt-2 gap-4 items-center"
                onSubmit={handleNameChange}
              >
                <input
                  className="input h-10 w-full max-w-sm inline m-0"
                  name="name"
                  title="Name"
                  id="name"
                  type="text"
                  required
                  defaultValue={currentUser?.displayName || ""}
                />
                <button className="btn h-10 w-24 rounded-md" type="submit">
                  Save
                </button>
              </form>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-lg font-medium">
                Your Email:
              </label>

              <form
                className="flex pt-2 gap-4 items-center"
                onSubmit={handleEmailChange}
              >
                <input
                  className="input h-10 w-full max-w-sm inline m-0"
                  name="email"
                  title="Email"
                  id="email"
                  type="email"
                  required
                  defaultValue={currentUser?.email || ""}
                />
                {!currentUser?.emailVerified && (
                  <button
                    className="btn btn-red h-10 w-24 rounded-md"
                    onClick={(event) => {
                      event.preventDefault();
                      handleEmailVerification();
                    }}
                  >
                    Verify
                  </button>
                )}
                <button className="btn h-10 w-24 rounded-md" type="submit">
                  Save
                </button>
              </form>
            </div>

            {/* Reset Password */}
            <div>
              <h1 className="text-xl font-semibold">Reset Password</h1>
              <p className="mt-2 mb-4 text-base text-gray-500 dark:text-gray-400">
                Protect your account with a strong password.
              </p>

              <div className="flex gap-4">
                <button className="btn w-28" onClick={handlePasswordReset}>
                  Reset
                </button>
              </div>
            </div>

            {/* Delete Email */}
            <div>
              <h1 className="text-xl font-semibold">Delete Account</h1>
              <p className="mt-2 mb-4 text-base text-gray-500 dark:text-gray-400">
                Permanently remove your account and all your data.
              </p>

              <div className="flex gap-4">
                <button
                  className="btn btn-red w-28"
                  onClick={() => {
                    showAlert(
                      "Please contact us to delete your account",
                      "default",
                      5000
                    );
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
