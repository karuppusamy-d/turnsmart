import { ReactNode, ReactElement } from "react";
import SectionContainer from "./SectionContainer";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props): ReactElement => {
  return (
    <>
      <Navbar />
      <main className="mt-[4.5rem]">
        <SectionContainer>{children}</SectionContainer>
      </main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
