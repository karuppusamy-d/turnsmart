/* eslint-disable jsx-a11y/no-onchange */
import React, { ReactElement, SetStateAction } from "react";
import { ProjectData } from "@/utils/firebase";

// import AddIcon from "@/components/icons/add.svg";
// import DeleteIcon from "@/components/icons/delete.svg";
import { deviceTypes } from "@/lib/smarthome/deviceTypes";

interface Props {
  project: ProjectData;
  setProject: (value: SetStateAction<ProjectData | null>) => void;
}

const SmartHome = ({ project }: Props): ReactElement => {
  return (
    <div className="p-8 pl-4 rounded-xl shadow-light dark:bg-gray-800">
      <table className="table table-fixed w-full">
        <tbody>
          {/* Enabled */}
          <tr>
            <td className="px-4 py-2 font-medium">Enable</td>
            <td className="py-2 flex items-center">
              <input
                title="Enable"
                type="checkbox"
                className="input-checkbox"
                checked={project.smarthome.enabled}
              />
            </td>
          </tr>

          {/* Smart Home Type */}
          <tr>
            <td className="px-4 py-2 font-medium">Device Type</td>
            <td className="py-2 flex items-center">
              <select
                title="Type"
                className="input mt-0 w-full"
                defaultValue={`${project.smarthome.type}`}
              >
                {deviceTypes.map((type) => (
                  <option
                    key={type.name}
                    value={type.value}
                    title={type.description}
                  >
                    {type.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          {/* Display Traits and Endpoints */}
          {Object.entries(project?.smarthome.traits || {}).map(
            ([key, value]) => {
              return (
                <>
                  <tr>
                    <td className="px-4 py-1 font-medium lowercase">{key}</td>
                  </tr>
                  {Object.entries(value || {}).map(([key, value]) => (
                    <tr key={key}>
                      <td className="p-4 pl-8 font-light">{key}</td>
                      <td>
                        <select
                          title="Type"
                          className="input mt-0 w-full"
                          defaultValue={value}
                        >
                          {Object.entries(project?.data || {}).map(([key]) => {
                            // TODO: Filter options based on type
                            return (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    </tr>
                  ))}
                </>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SmartHome;
