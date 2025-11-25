import Image from "next/image";
import { useTranslations } from "next-intl";
import { Faq } from "@/app/Intarfaces/intarfaces";

interface ForFaqProps {
  faqData: Faq[];
  onQuestionClick: (id: number) => void;
}

const ForFaq: React.FC<ForFaqProps> = () => {
  const t = useTranslations("BackText");

  return (
      <div className="w-full h-screen relative">
        <Image
            src="/News.png"
            alt="background"
            width={800}
            height={800}
            objectFit="cover"
            className="w-full h-full object-cover"
        />
        <div className="flex justify-center gap-10 flex-col items-center h-full w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-white text-center text-3xl md:text-6xl font-bold md:max-w-[900px] px-5">
            {t("faq")}
          </div>
        </div>
      </div>
  );
};

export default ForFaq;
