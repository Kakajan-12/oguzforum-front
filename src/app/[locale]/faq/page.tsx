"use client";
import React, { useRef, useState } from "react";
import ForFaq from "../../Components/ForFaqSearch/ForBackFaq";
import QuesTionsAndAnswers from "../../Components/ForFaqSearch/QuesTionsAndAnswers";
import { useGetFaqQuery } from "@/app/Apis/api";

const Page = () => {
    const { data, error, isLoading } = useGetFaqQuery();
    const [activeId, setActiveId] = useState<number | null>(null);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    if (!data) return <p>Not found</p>;

    const handleQuestionClick = (id: number) => {
        setActiveId(id);
    };

    return (
        <div>
            <ForFaq faqData={data} onQuestionClick={handleQuestionClick} />
            <QuesTionsAndAnswers event={data} activeId={activeId} />
        </div>
    );
};

export default Page;
