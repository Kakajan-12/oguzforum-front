import { Terminal } from "lucide-react";
import img from "../../../../public/UpImages/Rectangle 26.png";
import icon from "../../../../public/UpImages/Subtract (1).png";


const questions =  {
  question: 'How can I apply my CV',
  answer: 'As a rule, the CVs received via online application form have priority during the review process'
}
export const arrayQuestions  = new Array(6).fill(questions)



export const products = {
  id: 1,
  icon: icon,
  img: img,
  tittle: "Something will happen very good in our Beautiful Country",
  date: "12.11.1024",
  country: "Turkmenistan",
  city: "Ashgabat",
  academy: "Technology Academy",
  text:
    "Oguz Forum is a professional event organizer that was founded in 2007 and specializes in Turkmenistan, industry-focused trade conferences and exhibits for businesses and governments. To encourage and enable direct foreign investment in and commerce between the host nation and the global business community, we organize yearly, regionally and nationally focused industry events, road show trade missions, and one-time special events.",
};
export const productsArray = new Array(10).fill(products);
