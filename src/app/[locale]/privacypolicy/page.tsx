import React from "react";
import PrivacyPolicy from "../../Components/PrivacyPolicyCompon/PrivacyPolivy";
import BackgroundUi from "@/app/BackgroundUI/BackgroundStatic";

const page = () => {
    return (
        <div>
            <BackgroundUi src="News.png" name="privacy"/>
            <PrivacyPolicy/>
        </div>
    );
};

export default page;
