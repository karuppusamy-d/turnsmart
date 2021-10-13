import { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SectionContainer = ({ children }: Props): ReactElement => {
  return (
    <div className="mx-auto px-6 xl:px-0 max-w-3xl xl:max-w-5xl">
      {children}
    </div>
  );
};

export default SectionContainer;
