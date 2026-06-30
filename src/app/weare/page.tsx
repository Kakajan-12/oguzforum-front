import React from "react";
import WhoText from "@/app/Components/WhoWeAreComponents/WhoText/WhoText";
import PhilosophyText from "@/app/Components/WhoWeAreComponents/PhilosophyText/PhilosophyText";
import BackgroundUi from "@/app/BackgroundUI/BackgroundStatic";

const page = () => {
    return (
        <div>
            <BackgroundUi src="Weare.webp" name="weare"/>
            <WhoText/>
            <PhilosophyText/>
        </div>
    );
};

export default page;
