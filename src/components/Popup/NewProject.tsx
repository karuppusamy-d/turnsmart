import {
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useAuthContext } from "@/components/contexts/useAuthContext";

import { addProject, ProjectData } from "@/utils/firebase";
import randomString from "@/lib/randomString";

interface Props {
  togglePopup: () => void;
  setProjects: Dispatch<SetStateAction<ProjectData[]>>;
}

const NewProject = ({ togglePopup, setProjects }: Props): ReactElement => {
  const [error, setError] = useState("");
  const { currentUser } = useAuthContext();
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // Function to handle form submission
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!nameRef.current || !descriptionRef.current)
      return setError("Someting went wrong");

    setError("");

    if (currentUser?.uid) {
      const name = nameRef.current.value;
      const description = descriptionRef.current.value;
      const secret = randomString(25);

      const project: ProjectData = {
        name: name,
        description: description,
        secret: secret,
        userid: currentUser?.uid,
        data: { on: true },
        endpoints: { on: "boolean" },
        smarthome: {
          enabled: false,
          nicknames: [],
          type: "action.devices.types.SWITCH",
          traits: {
            "action.devices.traits.OnOff": { on: "on" },
          },
        },
      };
      addProject(project)
        .then((doc) => {
          togglePopup();
          setProjects((curr) => [...curr, { ...project, uid: doc.id }]);
          nameRef.current?.form?.reset();
        })
        .catch(() => {
          setError("Someting went wrong");
        });
    }
  }

  return (
    <form
      className="flex flex-col sm:w-96 mb-[4.5rem] sm:mb-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-primary-400 dark:text-gray-100 text-center text-3xl font-bold mb-8">
        New project
      </h2>

      {/* Input for name */}
      <label className="font-semibold text-xs" htmlFor="name">
        Name
      </label>
      <input
        className="input"
        id="name"
        ref={nameRef}
        type="text"
        maxLength={50}
        required
      />

      {/* Input for description */}
      <label className="font-semibold text-xs mt-6" htmlFor="description">
        Description
      </label>
      <textarea
        className="input"
        id="description"
        rows={4}
        maxLength={100}
        ref={descriptionRef}
        required
      />

      {/* Error messages */}
      {error && (
        <div className="mt-3 text-xs font-medium text-red-500 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="flex gap-2 mt-8">
        {/* Cancel button */}
        <button
          className="btn btn-red h-10 rounded w-full"
          onClick={togglePopup}
        >
          Cancel
        </button>

        {/* Submit button */}
        <button className="btn h-10 rounded w-full" type="submit">
          Create
        </button>
      </div>
    </form>
  );
};

export default NewProject;
