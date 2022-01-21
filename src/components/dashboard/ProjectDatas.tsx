import { ReactElement, useState } from "react";
import { ProjectData } from "@/utils/firebase";
import { ObjectMap } from "@/lib/smarthome";

interface Props {
  project: ProjectData;
  updateProjectData: (
    value: ObjectMap,
    message?: string
  ) => Promise<void> | void;
}

// Component to display the project data
const ProjectDatas = ({ project, updateProjectData }: Props): ReactElement => {
  // Timeout to avoid too many updates in color picker
  const [colorTimeout, setColorTimeout] = useState<NodeJS.Timeout | null>(null);

  // Function to update the project data
  const updateData = (key: string, value: number | boolean): void => {
    updateProjectData(
      { data: { ...project.data, [key]: value } },
      "Data updated!"
    );
  };

  return (
    <div className="p-6 pl-4 sm:p-12 sm:pl-8 rounded-xl shadow-light dark:bg-gray-800">
      <table className="table table-fixed w-full">
        <tbody>
          {Object.entries(project?.data || {}).map(([key, value]) => {
            return (
              <tr key={key}>
                <td className="p-4 font-medium">{key}</td>
                <td>
                  {project?.endpoints[key] === "number" ? (
                    // Input for number
                    <input
                      title={key}
                      className="input mt-0 w-full"
                      type="number"
                      min="0"
                      defaultValue={+value}
                      onChange={(e) => updateData(key, +e.target.value)}
                    />
                  ) : project?.endpoints[key] === "color" ? (
                    // Input color picker
                    <input
                      title={key}
                      className="input py-1.5 mt-0 w-full h-[42px]"
                      type="color"
                      defaultValue={
                        "#" + (+value).toString(16).padStart(6, "0")
                      }
                      onChange={(e) => {
                        const colorHex = e.target.value.slice(1);
                        // clear timeout if exists
                        if (colorTimeout) {
                          clearTimeout(colorTimeout);
                          setColorTimeout(null);
                        }

                        // Set new timeout to update color after 1000ms
                        setColorTimeout(
                          setTimeout(() => {
                            updateData(key, parseInt(colorHex, 16));
                            setColorTimeout(null);
                          }, 1000)
                        );
                      }}
                    />
                  ) : (
                    // Input for boolean
                    <select
                      title={key}
                      className="input mt-0 w-full"
                      defaultValue={value.toString()}
                      onChange={(e) =>
                        updateData(key, e.target.value === "true")
                      }
                    >
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
  );
};

export default ProjectDatas;
