/* eslint-disable jsx-a11y/no-onchange */
import React, { FormEvent, ReactElement, SetStateAction, useRef } from "react";
import { ProjectData, updateProject } from "@/utils/firebase";

import AddIcon from "@/components/icons/add.svg";
import DeleteIcon from "@/components/icons/delete.svg";

interface Props {
  project: ProjectData;
  setProject: (value: SetStateAction<ProjectData | null>) => void;
}

const Endpoints = ({ project, setProject }: Props): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleAddEndpoint = (e: FormEvent): void => {
    e.preventDefault();
    if (!inputRef.current?.value || !selectRef.current?.value)
      return alert("Someting went wrong");

    const updatedData = {
      endpoints: {
        ...project.endpoints,
        [inputRef.current.value]: selectRef.current.value as
          | "boolean"
          | "number",
      },
      data: {
        ...project.data,
        [inputRef.current.value]:
          selectRef.current.value === "boolean" ? false : 0,
      },
    };
    project.uid &&
      updateProject(project.uid, updatedData)
        .then(() => {
          setProject((curr) => {
            return curr
              ? { ...curr, ...updatedData }
              : { ...project, ...updatedData };
          });
          // Reset form on success
          inputRef.current?.form?.reset();
        })
        .catch(() => {
          alert("Something went wrong");
        });
  };

  const deleteEndpoint = (key: string): void => {
    const updatedData = {
      endpoints: project.endpoints,
      data: project.data,
    };

    // Delete endpoints and data
    delete updatedData.endpoints[key];
    delete updatedData.data[key];

    project.uid &&
      updateProject(project.uid, updatedData)
        .then(() => {
          setProject((curr) => {
            return curr
              ? { ...curr, ...updatedData }
              : { ...project, ...updatedData };
          });
        })
        .catch(() => {
          alert("Something went wrong");
        });
  };

  const updateEndpoint = (key: string, value: "number" | "boolean"): void => {
    const updatedData = {
      endpoints: { ...project.endpoints, [key]: value },
      data: {
        ...project.data,
        [key]: value === "boolean" ? false : 0,
      },
    };

    project.uid &&
      updateProject(project.uid, updatedData)
        .then(() => {
          setProject((curr) => {
            return curr
              ? { ...curr, ...updatedData }
              : { ...project, ...updatedData };
          });
        })
        .catch(() => {
          alert("Something went wrong");
        });
  };

  return (
    <div className="p-3 rounded ring-1 ring-gray-200 dark:ring-gray-700">
      <table className="table table-fixed w-full">
        <tbody>
          {/* Display Endpoints */}
          {Object.entries(project?.endpoints || {}).map(([key, value]) => {
            return (
              <tr key={key}>
                <td className="px-4 py-2 font-medium">{key}</td>
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
                  </select>
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
            <td className="py-2 flex items-center">
              <select
                title="new endpoint type"
                className="input mt-0 w-full"
                defaultValue="number"
                ref={selectRef}
              >
                <option value="boolean">boolean</option>
                <option value="number">number</option>
              </select>

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
