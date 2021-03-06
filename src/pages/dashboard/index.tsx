import { ReactElement, useEffect, useState } from "react";
import Link from "@/components/Link";
import { useRouter } from "next/router";
import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata.json";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { useAlertContext } from "@/components/contexts/useAlertContext";
import { getProjectsByUserId, ProjectData } from "@/utils/firebase";
import Popup from "@/components/Popup";
import NewProject from "@/components/Popup/NewProject";

const Dashboard = (): ReactElement => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [showPopup, setshowPopup] = useState(false);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const { showAlert } = useAlertContext();

  // Function to toggle the new project popup
  const togglePopup = (): void => setshowPopup((curr) => !curr);

  useEffect(() => {
    // When not logged in
    if (!currentUser) router.push("/");

    // Get projects from firestore
    if (currentUser?.uid)
      getProjectsByUserId(currentUser.uid)
        .then((docs) => {
          // If there are projects
          if (!docs.empty) {
            setProjects(
              docs.docs.map((doc) => {
                return { ...doc.data(), uid: doc.id };
              })
            );
          }
        })
        .catch((e) => {
          // Error handling
          showAlert("Something went wrong", "error");
          console.error(e);
        })
        .finally(() => setLoading(false));
  }, [currentUser]);

  return (
    <>
      {/* SEO */}
      <PageSeo
        title={`Dashboard | ${siteMetadata.title}`}
        url={`${siteMetadata.siteUrl}/dashboard`}
        description="Dashboard"
      />

      <div className="py-20 min-h-[80vh]">
        <div className="grid gap-8 grid-cols-card auto-rows-[1fr]">
          {/* Projects View */}
          {projects.map((project, key) => (
            <Link
              href={`/dashboard/${project.uid}`}
              key={key}
              className="py-10 px-11 rounded-xl shadow-light dark:bg-gray-800 hover:shadow-light-lg dark:hover:ring-1 dark:hover:ring-gray-700 duration-500"
            >
              <div className="font-bold mb-2">{project.name}</div>
              <div className="text-sm">
                {project.description.length > 50
                  ? project.description.substring(0, 50) + "..."
                  : project.description}
              </div>
            </Link>
          ))}

          {/* New Project Button */}
          {!loading && (
            <button
              className="p-10 rounded-xl shadow-light dark:bg-gray-800 hover:shadow-light-lg dark:hover:ring-1 dark:hover:ring-gray-700 duration-500"
              onClick={togglePopup}
            >
              <div className="flex justify-center items-center h-full">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 45.402 45.402"
                  fill="currentColor"
                >
                  <path
                    d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
                  />
                </svg>
                <div className="ml-3">New Project</div>
              </div>
            </button>
          )}

          {/* Loading skeleton */}
          {loading &&
            [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="p-10 rounded-xl shadow-light dark:bg-gray-800"
              >
                <div className="animate-pulse h-4 w-auto mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
                <div className="animate-pulse h-4 w-auto mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
        </div>

        {/* New projects popup */}
        <Popup showPopup={showPopup} togglePopup={togglePopup}>
          <NewProject togglePopup={togglePopup} setProjects={setProjects} />
        </Popup>
      </div>
    </>
  );
};

export default Dashboard;
