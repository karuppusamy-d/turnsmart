/* eslint-disable jsx-a11y/no-onchange */
import {
  Fragment,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ProjectData, updateProject } from "@/utils/firebase";
import { deviceTypes } from "@/lib/smarthome/deviceTypes";
import { ObjectMap } from "@/lib/smarthome";
import { DeviceTraits, deviceTraits } from "@/lib/smarthome/deviceTraits";
import AddIcon from "@/components/icons/add.svg";
import DeleteIcon from "@/components/icons/delete.svg";

interface Props {
  project: ProjectData;
  setProject: (value: SetStateAction<ProjectData | null>) => void;
}

const SmartHome = ({ project, setProject }: Props): ReactElement => {
  const netTraitRef = useRef<HTMLSelectElement>(null);
  const [newTrait, setNewTrait] = useState<DeviceTraits>(
    "action.devices.traits.OnOff"
  );

  // Set the default trait to the first trait in the list
  useEffect(() => {
    setNewTrait(netTraitRef.current?.value as DeviceTraits);
  }, [netTraitRef]);

  const netTraitData = deviceTraits[newTrait]?.states || [];

  const updateData = (newData: ObjectMap): void => {
    const updatedData = { ...project.smarthome, ...newData };
    project.uid &&
      updateProject(project.uid, { smarthome: updatedData })
        .then(() => {
          setProject((curr) => {
            return curr
              ? { ...curr, smarthome: updatedData }
              : { ...project, smarthome: updatedData };
          });
        })
        .catch(() => {
          alert("Something went wrong");
        });
  };

  return (
    <div className="p-6 pl-4 sm:p-12 sm:pl-6 rounded-xl shadow-light dark:bg-gray-800">
      <table className="table table-fixed w-full">
        <tbody>
          {/* Enabled */}
          <tr>
            <td className="px-4 py-2 pb-4 font-medium">Enable</td>
            <td className="py-2 flex items-center">
              <input
                name="enable"
                type="checkbox"
                className="input-checkbox"
                checked={project.smarthome.enabled}
                onChange={(e) => {
                  updateData({ enabled: e.target.checked });
                }}
              />
            </td>
          </tr>

          {/* Smart Home Device Type */}
          <tr>
            <td className="px-4 py-2 font-medium">Device type</td>
            <td className="py-2 flex items-center">
              <select
                name="type"
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

          <tr>
            <td className="p-4"></td>
          </tr>

          {/* Display Traits and Endpoints */}
          {Object.entries(project?.smarthome.traits || {}).map(
            ([key, value], index) => {
              const deviceTrait = deviceTraits[key as DeviceTraits];

              // TODO: Optimize this
              const states = deviceTrait.states
                .map(([key, value]) => {
                  return { [key]: value };
                })
                .reduce(
                  (result, current) => Object.assign(result, current),
                  {}
                );

              return (
                <Fragment key={index}>
                  <tr>
                    <td
                      className="px-4 py-2 font-medium"
                      title={deviceTrait.description}
                    >
                      {deviceTrait.name}
                    </td>
                    <td className="flex py-2 justify-end">
                      <button
                        title="Remove endpoint"
                        className="text-red-400 dark:text-red-500 ml-3"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                  {Object.entries(value || {}).map(([key, value], index) => (
                    <tr key={index}>
                      <td className="p-4 pl-8 font-light break-words">{key}</td>
                      <td>
                        <select
                          name="target"
                          className="input mt-0 w-full"
                          defaultValue={value}
                        >
                          {Object.entries(project.endpoints || {}).map(
                            ([name, type]) => {
                              if (type != states[key]) return null;
                              return (
                                <option key={name} value={name}>
                                  {name}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4"></td>
                  </tr>
                </Fragment>
              );
            }
          )}

          {/* Add new trait */}
          <tr>
            <td className="px-4 py-2 font-medium">Add new trait</td>
            <td className="py-2 flex items-center">
              <select
                name="type"
                className="input mt-0 w-full"
                value={newTrait}
                onChange={(e) => setNewTrait(e.target.value as DeviceTraits)}
                ref={netTraitRef}
              >
                {Object.entries(deviceTraits).map(([name, data], index) => {
                  if (Object.keys(project.smarthome.traits).includes(name))
                    return null;
                  return (
                    <option key={index} value={name} title={data.description}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
              <button
                title="Add new trait"
                className="text-primary-400 dark:text-primary-500 ml-3"
              >
                <AddIcon />
              </button>
            </td>
          </tr>
          {netTraitData.map(([name, type], index) => (
            <tr key={index}>
              <td className="p-4 pl-8 font-light break-words">{name}</td>
              <td>
                <select name={name} className="input mt-0 w-full">
                  {Object.entries(project.endpoints || {}).map(
                    ([name, endpointType], index) => {
                      if (type != endpointType) return null;
                      return (
                        <option key={index} value={name}>
                          {name}
                        </option>
                      );
                    }
                  )}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SmartHome;
