import React from "react";
import Pagination from "@mui/material/Pagination";

interface UpPaginationProps {
  totalPages: number;
  currentPage: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const UpPagination: React.FC<UpPaginationProps> = ({
                                                     totalPages,
                                                     currentPage,
                                                     onChange,
                                                   }) => {
  return (
      <div className="w-full py-5">
          <div className="container mx-auto flex justify-center items-center">
              <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={onChange}
                  siblingCount={0}
                  size="small"
                  variant="outlined"
                  shape="rounded"
                  sx={{
                      "& .MuiPaginationItem-ellipsis": {
                          backgroundColor: "transparent !important",
                          border: "none !important",
                          color: "#002A5F66 !important",
                          fontSize: "35px !important",
                          minWidth: "43px !important",
                          minHeight: "55px !important",
                          width: "auto !important",
                          height: "30px !important",
                          padding: "0px !important",
                      },
                      "& .MuiPaginationItem-root.Mui-selected": {
                          backgroundColor: "#002A5F",
                          color: "white",
                          scale: "1.3",
                          "&:hover": {
                              backgroundColor: "#002A5F",
                              boxShadow: "none",
                          },
                      },
                      "& .MuiPaginationItem-root": {
                          color: "white",
                          backgroundColor: "#002A5F66",
                          padding: "10px",
                          border: "none",
                          minWidth: "4px",
                          width: {xs: "10px", md: "30px"},
                          height: {xs: "15px", md: "30px"},
                          margin: {xs: "3px", md: "5px"},
                          fontSize: "10px",
                          "&:hover": {
                              backgroundColor: "#002A5F",
                              boxShadow: "none",
                          },
                      },
                      "& .MuiPaginationItem-previousNext": {
                          backgroundColor: "transparent",
                          color: "#002A5F",
                          padding: "8px 16px !important",
                          borderRadius: "8px",
                          marginLeft: "10px",
                          marginRight: "10px",
                          minHeight: "40px",
                          "& .MuiPaginationItem-icon": {
                              fontSize: "40px",
                          },
                          "&:hover": {
                              backgroundColor: "transparent",
                              boxShadow: "none",
                          },
                      },
                  }}
              />
          </div>
      </div>
  );
};

export default UpPagination;
