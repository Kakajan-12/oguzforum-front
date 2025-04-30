import { useWindowWidth } from "./GetWindowWidth";

export const SliceText = () => {
  const getLimitByBreakpoint = () => {
    if (width < 350) return 50;
    if (width < 450) return 90;
    if (width < 500) return 100;
    if (width < 1280) return 200;
    if (width > 1550) return 400;
    return 400;
  };
  const width = useWindowWidth();
  const truncateText = (text: string) => {
    const limit = getLimitByBreakpoint();
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };
  return truncateText;
};
