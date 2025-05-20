import React from "react";
import { useTranslations } from "next-intl";

const PhilosophyText = () => {
  const t = useTranslations("ourPhilopsophy");
  return (
    <div className="container mx-auto px-2">
      <div className=" py-12 md:py-32 flex flex-col sm:gap-14 gap-5">
        <h2 className="sm:text-4xl text-xl ml-8 sm:ml-0  font-extrabold text-mainBlue">{t('title')}</h2>
        <span className=" sm:text-xl text-xs font-normal leading-5 px-5 sm:px-0">
          Oguz Forum is a professional event organizer that was founded in 2007
          and specializes in Turkmenistan, industry-focused trade conferences
          and exhibits for businesses and governments.
          <br />
          To encourage and enable direct foreign investment in and commerce
          between the host nation and the global business community, we organize
          yearly, regionally and nationally focused industry events, road show
          trade missions, and one-time special events.
          <br />
          With the ultimate goal of conducting business, we create events that
          bring together stakeholders, experts, and decision-makers in the
          industry to exhibit products and services, foster networking, and
          inspire collaboration.
          <br />
          To make sure that our events meet the networking and business
          development needs of our hosts, presenters, sponsors, exhibitors,
          delegates, and guests, we collaborate closely with governments,
          national businesses, chambers of commerce, international trade groups,
          and the private sector.
          <br />
          We are aware that trade exhibitions frequently serve as a foreign
          investor’s first visit to your nation, and that making a good first
          impression depends heavily on the event’s quality.
          <br />
          In order to minimize the environmental impact of our events and to use
          local expertise in their development, we embrace our social
          responsibility.
          <br />
          From our base in Turkmenistan, we conduct business abroad.
        </span>
      </div>
    </div>
  );
};

export default PhilosophyText;
