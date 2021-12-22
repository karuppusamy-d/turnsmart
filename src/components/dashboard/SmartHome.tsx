/* eslint-disable jsx-a11y/no-onchange */
import { Fragment, ReactElement, useState } from "react";
import { ProjectData } from "@/utils/firebase";
import { deviceTypes } from "@/lib/smarthome/deviceTypes";
import { ObjectMap } from "@/lib/smarthome";
import { DeviceTraits, deviceTraits } from "@/lib/smarthome/deviceTraits";
import DeleteIcon from "@/components/icons/delete.svg";

interface Props {
  project: ProjectData;
  updateProjectData: (
    value: ObjectMap,
    message?: string
  ) => Promise<void> | void;
}

const SmartHome = ({ project, updateProjectData }: Props): ReactElement => {
  const [data, setData] = useState(project.smarthome);

  const [newTrait, setNewTrait] = useState("action.devices.traits.OnOff");
  const newTraitData = deviceTraits[newTrait as DeviceTraits]?.states || [];

  const updateData = (value: ObjectMap): void => {
    setData((curr) => ({ ...curr, ...value }));
  };

  const handleSave = (): Promise<void> | void => {
    return updateProjectData({ smarthome: data }, "Saved successfully!");
  };

  const handleReset = (): void => {
    setData(project.smarthome);
  };

  return (
    <div className="p-6 pl-4 sm:p-12 sm:pl-8 rounded-xl shadow-light dark:bg-gray-800">
      <table className="table table-fixed w-full">
        <tbody>
          {/* Enabled checkbox */}
          <tr>
            <td className="px-4 py-2 pb-4 font-medium">Enable</td>
            <td className="py-2 flex items-center">
              <input
                name="enable"
                type="checkbox"
                className="input-checkbox"
                checked={data.enabled}
                onChange={(e) => updateData({ enabled: e.target.checked })}
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
                value={`${data.type}`}
                onChange={(val) => updateData({ type: val.target.value })}
              >
                {deviceTypes.map((type, key) => (
                  <option key={key} value={type.value} title={type.description}>
                    {type.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          {/* Display Traits */}
          <tr>
            <td colSpan={2} className="pt-6 pl-4">
              <div className="text- font-bold pb-4">Traits</div>
              <div className="p-3 border-t-[1px] border-gray-200 dark:border-gray-600"></div>
            </td>
          </tr>

          {Object.entries(data.traits || {}).map(([key, value], index) => {
            const deviceTrait = deviceTraits[key as DeviceTraits];

            // TODO: Optimize this
            const states = deviceTrait.states
              .map(([key, value]) => {
                return { [key]: value };
              })
              .reduce((result, current) => Object.assign(result, current), {});

            return (
              <Fragment key={index}>
                <tr>
                  {/* Name of the trait */}
                  <td
                    className="px-4 py-2 font-medium"
                    title={deviceTrait.description}
                  >
                    {deviceTrait.name}
                  </td>
                  {/* Remove trait button */}
                  <td className="flex py-2 justify-end">
                    <button
                      title="Remove endpoint"
                      className="text-red-400 dark:text-red-500 ml-3"
                      onClick={() => {
                        const newData = { ...data.traits };
                        delete newData[key as DeviceTraits];
                        updateData({
                          traits: newData,
                        });
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
                {Object.entries(value || {}).map(([name, value], index) => (
                  <tr key={index}>
                    <td className="p-4 pl-8 font-light break-words">{name}</td>
                    <td>
                      <select
                        name="target"
                        className="input mt-0 w-full"
                        value={value}
                        onChange={(val) => {
                          const newData = {
                            ...data.traits[key as DeviceTraits],
                            [name]: val.target.value,
                          };

                          updateData({
                            traits: {
                              ...data.traits,
                              [key as DeviceTraits]: newData,
                            },
                          });
                        }}
                      >
                        {Object.entries(project.endpoints || {}).map(
                          ([endpoint, endpointType], key) => {
                            if (endpointType != states[name]) return null;
                            return (
                              <option key={key} value={endpoint}>
                                {endpoint}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="p-2"></td>
                </tr>
              </Fragment>
            );
          })}
          {/* End Display Traits */}

          {/* Add new trait */}
          <tr>
            <td colSpan={2} className="pt-6 pl-4">
              <div className="text- font-bold pb-4">New Trait</div>
              <div className="p-3 border-t-[1px] border-gray-200 dark:border-gray-600"></div>
            </td>
          </tr>

          <tr>
            <td className="px-4 py-2 font-medium">Trait type</td>
            <td>
              <select
                name="type"
                className="input mt-0 w-full"
                value={newTrait}
                onChange={(e) => setNewTrait(e.target.value)}
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
            </td>
          </tr>
          {newTraitData.map(([name, type], index) => (
            <tr key={index}>
              <td className="p-4 font-light break-words">{name}</td>
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

          <tr>
            <td colSpan={2}>
              <div className="flex justify-end mt-2">
                <button title="Add new trait" className="btn btn-gray text-sm">
                  Add
                </button>
              </div>
            </td>
          </tr>
          {/* End add new trait */}

          {/* Save Settings*/}
          <tr>
            <td colSpan={2} className="pt-6 pl-4">
              <div className="p-3 border-t-[1px] border-gray-200 dark:border-gray-600" />
              <div className="flex justify-end">
                <button onClick={handleReset} className="btn btn-red w-28">
                  Reset
                </button>
                <button onClick={handleSave} className="btn ml-4 w-28">
                  Save
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SmartHome;
