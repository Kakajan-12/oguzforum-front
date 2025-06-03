import React from "react";
import NavigationBackKnob from "../../ForBackKnob/NavigationBackKnob";
import { Projects } from "@/app/Intarfaces/intarfaces";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import LocationPinIcon from "@mui/icons-material/LocationPin";
interface Props {
  event: Projects;
}
const ProjectSinglePage: React.FC<Props> = ({ event }) => {
  const locale = useAppLocale();
  const title = event[locale];
  const location = event[`location_${locale}`];
  const text = event[`text_${locale}`];
  const date = event.date;
  return (
    <div className="container mx-auto ">
      <div className="py-12 md:py-32    px-5">
        <h2 className="md:text-4xl flex items-center text-xl font-bold text-mainBlue">
          <NavigationBackKnob />
          <RichText htmlContent={title} />
        </h2>

        <div className="flex items-center divide-x-2 space-x-2 pt-10">
          <div className="card-details">
            {new Date(date).toLocaleDateString("tm-TM")}
          </div>
          <div className="pl-2 card-details"><LocationPinIcon className="text-gray-500 mr-2 mb-1 card-details"
                                                              style={{
                                                                width: "15px",
                                                                height: "15px"
                                                              }}/>{location}</div>
        </div>

        <div className="mt-5 leading-6 md:leading-8 text-sm md:text-xl text-mainBlue">
          <RichText htmlContent={text}/>
        </div>
      </div>
    </div>
  );
};

export default ProjectSinglePage;
