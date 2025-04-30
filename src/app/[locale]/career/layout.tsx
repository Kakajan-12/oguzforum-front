import React from "react";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import CareerFilter from "@/app/Components/CareerComponents/CareerFilter";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <BackgroundUi src="UpBack.png" name="career" />
      <CareerFilter />
      {children}
      
    </div>
  );
};

export default layout;
