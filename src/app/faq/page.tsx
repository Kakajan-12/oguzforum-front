"use client";
import React, { useRef, useState } from "react";
import ForFaq from "../../Components/ForFaqSearch/ForBackFaq";
import QuesTionsAndAnswers from "../../Components/ForFaqSearch/QuesTionsAndAnswers";
import { useGetFaqQuery } from "@/app/Apis/api";
import Spinner from "@/app/Components/UI/Spinner";
import ErrorMessage from "@/app/Components/UI/ErrorMessage";

const Page = () => {
    const { data, error, isLoading } = useGetFaqQuery();
    const [activeId, setActiveId] = useState<number | null>(null);

    if (isLoading) return <Spinner />;
    if (error) return <ErrorMessage />;
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
