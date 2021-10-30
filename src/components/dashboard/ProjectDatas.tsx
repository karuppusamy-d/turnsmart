import React, { ReactElement, SetStateAction } from "react";
import { ProjectData, updateProject } from "@/utils/firebase";

interface Props {
  project: ProjectData;
  setProject: (value: SetStateAction<ProjectData | null>) => void;
}

const ProjectDatas = ({ project, setProject }: Props): ReactElement => {
  const updateData = (key: string, value: number | boolean): void => {
    const updatedData = { ...project.data, [key]: value };

    project.uid &&
      updateProject(project.uid, { data: updatedData })
        .then(() => {
          setProject((curr) => {
            return curr
              ? { ...curr, data: updatedData }
              : { ...project, data: updatedData };
          });
        })
        .catch(() => {
          alert("Something went wrong");
        });
  };

  return (
    <div className="p-8 pl-4 rounded-xl shadow-light dark:bg-gray-800">
      <table className="table table-fixed w-full">
        <tbody>
          {Object.entries(project?.data || {}).map(([key, value]) => {
            return (
              <tr key={key}>
                <td className="p-4 font-medium">{key}</td>
                <td>
                  {project?.endpoints[key] === "number" ? (
                    <input
                      title={key}
                      className="input mt-0 w-full"
                      type="number"
                      min="0"
                      defaultValue={+value}
                      onChange={(e) => updateData(key, +e.target.value)}
                    />
                  ) : (
                    // eslint-disable-next-line jsx-a11y/no-onchange
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
