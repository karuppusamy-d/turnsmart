import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata.json";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { getProjectByUID, ProjectData } from "@/utils/firebase";

// Icons
import ShowIcon from "@/components/icons/show.svg";
import HideIcon from "@/components/icons/hide.svg";

const ProjectDashboard = (): ReactElement => {
  const router = useRouter();
  const { currentUser } = useAuthContext();

  const { uid } = router.query as { uid: string };
  const [project, setProject] = useState<ProjectData | null>(null);
  const [secret, setSecret] = useState({ value: "", show: false });

  useEffect(() => {
    // When not logged in
    if (!currentUser) router.push("/");

    if (currentUser?.uid)
      getProjectByUID(uid).then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setProject({ ...data, uid: doc.id });
          setSecret((curr) => {
            return { ...curr, value: data.secret };
          });
        }
      });
  }, [currentUser]);

  const handleSecretChange = () => {
    console.log("TODO: Change Secret Key: ", secret.value);
  };

  return (
    <>
      <PageSeo
        title={`${project?.name || siteMetadata.title} | Dashboard`}
        url={`${siteMetadata.siteUrl}/dashboard`}
        description="Dashboard"
      />

      <div className="min-h-[80vh] divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-10 pb-4 space-y-2 xl:space-y-3 xl:pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 xl:text-3xl">
            {project?.name}
          </h1>
          <p className="text-sm xl:text-base text-gray-500 dark:text-gray-400">
            {project?.description}
          </p>
        </div>

        <div className="pt-6 divide-y divide-gray-200 dark:divide-gray-700">
          {/* Secret Keys */}
          <div>
            <label htmlFor="secret" className="font-medium">
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

          {/* Data Endpoints */}
          <div className="pt-6 pb-8">
            <h2 className="font-medium pb-4">Data Endpoints:</h2>

            <div className="p-3 rounded ring-1 ring-gray-200 dark:ring-gray-700">
              <table className="table table-fixed w-full">
                <tbody>
                  {Object.entries(project?.fields || {}).map(([key, value]) => {
                    return (
                      <tr key={key}>
                        <td className="p-4">{key}</td>
                        <td>
                          <select className="input mt-0 w-full" value={value}>
                            <option value="boolean">boolean</option>
                            <option value="number">number</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Datas */}
          <div className="pt-6 pb-8">
            <h2 className="font-medium pb-4">Data:</h2>

            <div className="p-3 rounded ring-1 ring-gray-200 dark:ring-gray-700">
              <table className="table table-fixed w-full">
                <tbody>
                  {Object.entries(project?.data || {}).map(([key, value]) => {
                    return (
                      <tr key={key}>
                        <td className="p-4">{key}</td>
                        <td>
                          {project?.fields[key] === "number" ? (
                            <input
                              className="input mt-0 w-full"
                              type="number"
                              value={value}
                            />
                          ) : (
                            <select className="input mt-0 w-full" value={value}>
                              <option value="true">true</option>
                              <option value="false">false</option>
                            </select>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDashboard;
