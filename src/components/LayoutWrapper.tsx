import { ReactNode, ReactElement } from "react";
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
        <div className="mx-auto px-6 xl:px-0 max-w-5xl">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
