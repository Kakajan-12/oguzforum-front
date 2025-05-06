import React from "react";
import WhoText from "../../Components/WhoWeAreComponents/WhoText/WhoText";
import PhilosophyText from "../../Components/WhoWeAreComponents/PhilosophyText/PhilosophyText";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";

const page = () => {
    return (
        <div>
            <BackgroundUi src="Weare.png" name="weare"/>
            <WhoText/>
            <PhilosophyText/>
        </div>
    );
};

export default page;
