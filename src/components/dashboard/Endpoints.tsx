import { FormEvent, ReactElement, useRef } from "react";
import { ProjectData } from "@/utils/firebase";

import AddIcon from "@/components/icons/add.svg";
import DeleteIcon from "@/components/icons/delete.svg";
import { ObjectMap } from "@/lib/smarthome";
import { useAlertContext } from "../contexts/useAlert";

interface Props {
  project: ProjectData;
  updateProjectData: (
    value: ObjectMap,
    message?: string
  ) => Promise<void> | void;
}

const Endpoints = ({ project, updateProjectData }: Props): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const { showAlert } = useAlertContext();

  // Function to add a new endpoint
  const handleAddEndpoint = (e: FormEvent): void => {
    e.preventDefault();
    // Get Form data
    const key = inputRef.current?.value;
    const value = selectRef.current?.value;
    // Check if key and value are present
    if (!key || !value) return showAlert("Someting went wrong", "error");

    // Data to be updated
    const updatedData = {
      endpoints: {
        ...project.endpoints,
        [key]: selectRef.current.value as "boolean" | "number",
      },
      data: {
        ...project.data,
        [key]: value === "number" ? 0 : value === "color" ? 255 : false,
      },
    };

    // Update the data
    updateProjectData(updatedData, "Endpoint added successfully!");
  };

  // Function to delete an endpoint
  const deleteEndpoint = (key: string): void => {
    // Project data
    const updatedData = {
      endpoints: project.endpoints,
      data: project.data,
    };

    // Delete endpoints and data
    delete updatedData.endpoints[key];
    delete updatedData.data[key];

    // Update the data
    updateProjectData(updatedData, "Endpoint deleted successfully!");
  };

  // Function to update an endpoint
  const updateEndpoint = (
    key: string,
    value: "number" | "boolean" | "color"
  ): void => {
    // Data to be updated
    const updatedData = {
      endpoints: { ...project.endpoints, [key]: value },
      data: {
        ...project.data,
        [key]: value === "number" ? 0 : value === "color" ? 255 : false,
      },
    };

    // Update the data
    updateProjectData(updatedData, "Endpoint updated successfully!");
  };

  return (
    <div className="p-6 pl-4 sm:p-12 sm:pl-8 rounded-xl shadow-light dark:bg-gray-800">
      <table className="table table-fixed w-full">
        <tbody>
          {/* Display Endpoints */}
          {Object.entries(project?.endpoints || {}).map(([key, value]) => {
            return (
              <tr key={key}>
                {/* Display the endpoint name */}
                <td className="px-4 py-2 font-medium">{key}</td>
                {/* Display the endpoint type */}
                <td className="py-2 flex items-center">
                  <select
                    title={key}
                    className="input mt-0 w-full"
                    defaultValue={value}
                    onChange={(e) =>
                      updateEndpoint(
                        key,
                        e.target.value as "number" | "boolean"
                      )
                    }
                  >
                    <option value="boolean">boolean</option>
                    <option value="number">number</option>
                    <option value="color">color</option>
                  </select>
                  {/* Button to remove the endpoint */}
                  <button
                    title="Remove endpoint"
                    className="text-red-400 dark:text-red-500 ml-3"
                    onClick={() => {
                      confirm(`Do you want to delete ${key} endpint?`) &&
                        deleteEndpoint(key);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            );
          })}

          {/* Create New Endpoint */}
          <tr>
            <td className="px-4 py-2">
              {/* Input for new endpoint name */}
              <form onSubmit={handleAddEndpoint}>
                <input
                  title="new endpoint name"
                  placeholder="New endpoint name"
                  className="input mt-0 w-full"
                  type="text"
                  ref={inputRef}
                />
              </form>
            </td>
            {/* Input for new endpoint type */}
            <td className="py-2 flex items-center">
              <select
                title="new endpoint type"
                className="input mt-0 w-full"
                defaultValue="number"
                ref={selectRef}
              >
                <option value="boolean">boolean</option>
                <option value="number">number</option>
                <option value="color">color</option>
              </select>

              {/* Button to add new endpoint */}
              <button
                title="Add endpoint"
                className="text-primary-400 dark:text-primary-500 ml-3"
                onClick={handleAddEndpoint}
              >
                <AddIcon />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Endpoints;
