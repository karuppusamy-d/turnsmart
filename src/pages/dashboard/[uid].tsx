import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata.json";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { getProjectByUID, ProjectData, updateProject } from "@/utils/firebase";
import ProjectDatas from "@/components/dashboard/ProjectDatas";
import Endpoints from "@/components/dashboard/Endpoints";
import SmartHome from "@/components/dashboard/SmartHome";
import Loading from "@/components/dashboard/Loading";

// Icons
import ShowIcon from "@/components/icons/show.svg";
import HideIcon from "@/components/icons/hide.svg";

const ProjectDashboard = (): ReactElement => {
  const router = useRouter();
  const { currentUser } = useAuthContext();

  const { uid } = router.query as { uid: string };
  const [project, setProject] = useState<ProjectData | null>(null);
  const [secret, setSecret] = useState({ value: "", show: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When not logged in
    if (!currentUser) router.push("/");

    if (currentUser?.uid)
      getProjectByUID(uid)
        .then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setProject({ ...data, uid: doc.id });
            setSecret((curr) => {
              return { ...curr, value: data.secret };
            });
          }
        })
        .catch(() => alert("Something went wrong"))
        .finally(() => setLoading(false));
  }, [currentUser]);

  const handleSecretChange = () => {
    project?.uid &&
      updateProject(project.uid, { secret: secret.value })
        .then(() => {
          setProject((curr) => {
            return curr
              ? { ...curr, secret: secret.value }
              : { ...project, secret: secret.value };
          });
          alert("Success");
        })
        .catch(() => {
          alert("Something went wrong");
        });
  };

  return (
    <>
      <PageSeo
        title={`${project?.name || siteMetadata.title} | Dashboard`}
        url={`${siteMetadata.siteUrl}/dashboard`}
        description="Dashboard"
      />

      {!loading && (
        <div className="min-h-[80vh] divide-y divide-gray-200 dark:divide-gray-700">
          {/* Project Title */}
          <div className="pt-10 pb-4 space-y-2 xl:space-y-3 xl:pb-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 xl:text-3xl">
              {project?.name}
            </h1>
            <p className="text-sm xl:text-base text-gray-500 dark:text-gray-400">
              {project?.description}
            </p>
          </div>

          <div className="py-6 divide-y divide-gray-200 dark:divide-gray-700">
            {/* Project ID */}
            <div>
              <label htmlFor="project_id" className="font-semibold">
                Project id:
              </label>

              <div className="flex pt-2 pb-6 gap-4 items-center">
                <div className="relative">
                  <input
                    className="input h-10 inline m-0"
                    id="project_id"
                    type="text"
                    value={project?.uid}
                    title="Project ID"
                    disabled
                  />
                </div>
              </div>

              {/* Secret Key */}
              <label htmlFor="secret" className="font-semibold">
                Secret:
              </label>

              <div className="flex pt-2 pb-8 gap-4 items-center">
                <div className="relative">
                  <input
                    className="input h-10 inline m-0"
                    id="secret"
                    type={secret.show ? "text" : "password"}
                    value={secret.value}
                    title="Secret Key"
                    onChange={(e) =>
                      setSecret((curr) => {
                        return { ...curr, value: e.target.value };
                      })
                    }
                  />

                  <div
                    className="absolute w-6 h-6 text-gray-400 right-3 top-2 dark:text-gray-300"
                    onClick={() =>
                      setSecret((curr) => {
                        return { ...curr, show: !curr.show };
                      })
                    }
                  >
                    {secret.show ? <HideIcon /> : <ShowIcon />}
                  </div>
                </div>

                {secret.value != project?.secret && (
                  <button
                    className="btn btn-gray h-10 rounded-md"
                    onClick={handleSecretChange}
                  >
                    change
                  </button>
                )}
              </div>
            </div>

            {/* Datas */}
            <div className="pt-6 pb-8">
              <h2 className="font-semibold pb-4">Data:</h2>
              {project && (
                <ProjectDatas project={project} setProject={setProject} />
              )}
            </div>

            {/* Data Endpoints */}
            <div className="pt-6 pb-8">
              <h2 className="font-semibold pb-4">Endpoints:</h2>
              {project && (
                <Endpoints project={project} setProject={setProject} />
              )}
            </div>

            {/* Smart Home */}
            <div className="pt-6 pb-8">
              <h2 className="font-semibold pb-4">Smart Home:</h2>
              {project && (
                <SmartHome project={project} setProject={setProject} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && <Loading />}
    </>
  );
};

export default ProjectDashboard;
