"use client";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import { useApplyJobMutation } from "@/app/Apis/api";
const page = () => {
  const [active , setActive] = useState<string | null>(null)
  const getResponsiveHeight = () => {
    if (window.innerWidth < 640) return '34px'; 
    if (window.innerWidth < 768) return '34px'; 
    if (window.innerWidth < 1025) return '50px'; 
    
    return '54px';  
  };
 const forToggleOpen =  (section : string) => {
  setActive(prev => (prev === section ? null : section));
 }



 const [firstName, setFirstName] = useState("");
 const [lastName, setLastName] = useState("");
 const [email, setEmail] = useState("");
 const [phoneNumber, setPhoneNumber] = useState("");
 const [address, setAddress] = useState("");
 const [photo, setPhoto] = useState<File | null>(null);

 const [createProfile, { isLoading, isSuccess, isError }] = useApplyJobMutation();
  console.log(createProfile);
  
 const handlePhoneChange = (value : any) => {
  setPhoneNumber(value);
};
 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const file = e.target.files?.[0];
   if (file) {
     setPhoto(file);
   }
 };

//  const handleSubmit = async (e: React.FormEvent) => {
//    e.preventDefault();

//   //  if (!photo) {
//   //    alert("Please upload a photo!");
//   //    return;
//   //  }

//    const formData = new FormData();
//    formData.append("firstName", firstName);
//    formData.append("lastName", lastName);
//    formData.append("email", email);
//    formData.append("phoneNumber", phoneNumber);
//   //  formData.append("address", address);
//   //  formData.append("photo", photo);

//    try {
//      await createProfile(formData).unwrap();
//      alert("Profile created successfully!");
//      // Clear form
//      setFirstName("");
//      setLastName("");
//      setEmail("");
//      setPhoneNumber("");
//     //  setAddress("");
//     //  setPhoto(null);
//    } catch (err) {
//      console.error(err);
//    }
//  };

  return (
    <div className="container mx-auto px-5 md:px-20 xl:px-44 2xl:px-52 py-10 md:py-20">
      <form method="submit"  className="flex flex-col gap-10 md:gap-20 ">
       <div className="flex flex-col ">
        <div className="col-span-full  w-full flex flex-col">
          <div className=" flex  justify-between gap-3 items-center md:items-end">
            <h3 className="md:text-3xl lg:text-4xl text-2xl text-mainBlue font-semibold">
              Personal information
            </h3>
            <div className="flex  items-end ">
            <RiDeleteBin5Line className="md:w-5 md:h-5 lg:h-7 lg:w-7 mb-[1px] w-4 h-4 mr-2 text-mainBlue"/>
              <p className="text-mainBlue font-semibold text-xs  md:text-sm lg:text-lg xl:text-xl">
                Clear
              </p>
            </div>
          </div>
          <div className="bg-mainBlue mt-2 w-full h-[2px]"></div>
        </div>

        <div className="grid gap-y-5 px-5 md:px-10 mt-7 md:mt-10 gap-x-10  grid-cols-1">
          <div className="flex justify-between gap-5 md:gap-10">
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)}
              className="border w-full md:text-lg text-xs border-[#002A5F66] lg:py-3 md:py-2.5 py-2 px-4 rounded-[10px]"
              placeholder="First name"
              type="text"
            />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)}
              className="w-full border md:text-lg text-xs border-[#002A5F66] lg:py-3 md:py-2.5 py-2 px-4 rounded-[10px]"
              placeholder="Last name"
              type="text"
            />
          </div>
            <input value={email} onChange={(e) => setEmail(e.target.value)}
            className="col-span-full w-full border md:text-lg text-xs border-[#002A5F66] lg:py-3 md:py-2.5 py-2 px-4 rounded-[10px]"
            placeholder="Email*"
            type="email"
            />
          <PhoneInput
          value={phoneNumber} 
            inputStyle={{
              width: "100%",
              height: getResponsiveHeight(),
              borderColor: "#002A5F66",
              borderRadius: "10px",
              padding: "40px,0px",
            }}
            buttonStyle={{
              borderRadius: "10px 0px 0px 10px",
              backgroundColor: " transparent",
            }}
            country={"tm"}
            onlyCountries={["tm", "ru", "us", "de", "turk"]}
            enableSearch={true}
            inputClass="w-full  px-4 border border-gray-300 rounded-md"
            dropdownClass=""
          />

          <label className=" border flex flex-col justify-center items-center gap-y-5 py-14 md:py-20 md:text-sm text-xs border-[#002A5F66] px-3 rounded-[10px] col-span-full">
            <strong className="md:text-4xl  text-xl text-mainBlue">Photo</strong>
            <MdOutlineFileUpload
              className="w-14 text-mainBlue h-14 md:w-32 md:h-32"
             
            />
            <p className="text-mainBlue ">
              <strong>Upload a file</strong> or drag and drop here
            </p>
            <input  type="file" id="photo-upload" name="photo" hidden />
          </label>
        </div>
       </div>

       <div className="flex flex-col mt-5">
         <div className="  w-full flex flex-col">
          <div className=" flex  justify-between items-end">
          <h3 className="md:text-3xl lg:text-4xl text-2xl text-mainBlue font-semibold">
              Profile
            </h3>
            <div className="flex items-center   ">
            <RiDeleteBin5Line className="md:w-5 md:h-5 lg:h-7 lg:w-7 mb-[1px] w-4 h-4 mr-2 text-mainBlue"/>
              <p className="text-mainBlue font-semibold text-xs  md:text-sm lg:text-lg xl:text-xl">
                Clear
              </p>
            </div>
          </div>
          <div className="bg-mainBlue md:mt-5 w-[97%] self-center h-[2px]  mt-2 "></div>
         </div>

        <div className="flex flex-col px-5 md:px-10 mt-7 md:mt-16 gap-5 md:gap-10">
          
            <div>
               <div  onClick={ () => forToggleOpen('first')} className=" cursor-pointer flex text-2xl  justify-between">
                 <h3 className=" text-mainBlue text-sm md:text-lg lg:text-xl font-semibold">
                   Education <span className="opacity-40">(optional)</span>
                 </h3>
                 <div className="flex items-center   ">
                 <FaChevronDown className="md:w-5 md:h-5 lg:w-6 lg:h-6 w-3 h-3 text-mainBlue" />
                 </div>
               </div>
               <div className="bg-mainBlue mt-3 w-full h-[2px]"></div>
               {/* ANIMATET */}
               <AnimatePresence initial={false}>
                {
                   active === 'first' && (
                    <motion.div
                    initial={{height:0 , overflow:'hidden'}}
                    animate={{height: 'auto'}}
                    exit={{height: 0}}
                    >
                    <div className="py-10  ">
                       <textarea className="w-full  border-[#002A5F66] px-4  py-3 rounded-[10px] h-52 resize-none  border">
                      </textarea>
                    </div>
                    </motion.div>
                   )
                }
               </AnimatePresence>
            </div>
            <div>
               <div onClick={  () => forToggleOpen('second')} className=" cursor-pointer flex text-2xl  justify-between">
                 <h3 className=" text-mainBlue text-sm md:text-lg lg:text-xl font-semibold">
                   Expirience <span className="opacity-40">(optional)</span>
                 </h3>
                 <div className="flex items-center   ">
                 <FaChevronDown className="md:w-6 text-mainBlue md:h-6 w-3 h-3" />
                 </div>
               </div>
               <div className="bg-mainBlue mt-3 w-full h-[2px]"></div>
               {/* ANIMATET */}
               <AnimatePresence initial={false}>
                {
                   active === 'second'&& (
                    <motion.div
                    initial={{height:0 , overflow:'hidden'}}
                    animate={{height: 'auto'}}
                    exit={{height: 0}}
                    >
                    <div className="py-10  gap-10 flex flex-col ">
                    <label className=" border flex flex-col justify-center items-center gap-y-5 py-14 md:py-20 md:text-sm text-xs border-[#002A5F66] px-3 rounded-[10px] col-span-full">
                      <strong className="md:text-4xl  text-xl text-mainBlue">Photo</strong>
                      <MdOutlineFileUpload
                        className="w-14 h-14 text-mainBlue xl:w-32 xl:h-32"
                       />
                      <p className="text-mainBlue ">
                        <strong>Upload a file</strong> or drag and drop here
                      </p>
                      <input type="file" id="photo-upload" name="photo" hidden />
                    </label>
                    <textarea className="w-full  border-[#002A5F66] px-4  py-3 rounded-[10px] h-52 resize-none  border">
                    </textarea>
                    </div>
                    </motion.div>
                   )
                }
               </AnimatePresence>
            </div>
        </div>
       </div>
       <button type="submit" className="bg-mainBlue md:w-48 w-32  rounded-xl text-sm md:text-xl lg:text-xl  font-bold py-3 md:py-4 self-center text-white">
        Send
       </button>
      </form>
    </div>
  );
};

export default page;
