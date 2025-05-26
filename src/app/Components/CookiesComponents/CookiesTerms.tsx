import React from "react";
import NavigationBackKnob from "../ForBackKnob/NavigationBackKnob";
import {useTranslations} from "next-intl";

const CookiesTerms = () => {
  const t = useTranslations("BackText");
  return (
    <div className="container mx-auto ">
      <div className="py-12 md:py-32 px-5">
        <h2 className="md:text-4xl flex items-center text-xl font-bold text-mainBlue">
          <NavigationBackKnob/>
          {t("cookie")}
        </h2>

        <div className="mt-5 leading-6  md:leading-8 text-sm md:text-xl text-mainBlue">
          <p>
            Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu
            sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend
            magna. Nam metus lacus, porttitor eu mauris blandit, ultrices nibh.
            Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius
            volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend.
            Sed nec ante dictum sem, condimentum ullamcorper quis venenatis
            nisi. Proin vitae facilisis nisi, ac posuere leo. Nam pulvinar
            blandit velit, condimentum mauris faucibus at. Aliquam lacus nisl,
            sollicitudin at nisi nec, fermentum congue felis. Quisque mauris
            dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae
          </p>
          <p>
            Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu
            sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend
            magna. Nam metus lacus, porttitor eu mauris blandit, ultrices nibh.
            Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius
            volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend.
            Sed nec ante dictum sem, condimentum ullamcorper quis venenatis
            nisi. Proin vitae facilisis nisi, ac posuere leo. Nam pulvinar
            blandit velit, condimentum mauris faucibus at. Aliquam lacus nisl,
            sollicitudin at nisi nec, fermentum congue felis. Quisque mauris
            dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae
          </p>
          <p>
            Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu
            sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend
            magna. Nam metus lacus, porttitor eu mauris blandit, ultrices nibh.
            Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius
            volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend.
            Sed nec ante dictum sem, condimentum ullamcorper quis venenatis
            nisi. Proin vitae facilisis nisi, ac posuere leo. Nam pulvinar
            blandit velit, condimentum mauris faucibus at. Aliquam lacus nisl,
            sollicitudin at nisi nec, fermentum congue felis. Quisque mauris
            dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae
          </p>
          <p>
            Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu
            sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend
            magna. Nam metus lacus, porttitor eu mauris blandit, ultrices nibh.
            Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius
            volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend.
            Sed nec ante dictum sem, condimentum ullamcorper quis venenatis
            nisi. Proin vitae facilisis nisi, ac posuere leo. Nam pulvinar
            blandit velit, condimentum mauris faucibus at. Aliquam lacus nisl,
            sollicitudin at nisi nec, fermentum congue felis. Quisque mauris
            dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiesTerms;
