import { useContext, useEffect } from "react";

import { ModalContext } from "lib/context/modal";

const Modal = () => {
    const { visible, modalTitle, modalContent, isCenter, footer, banner }: any =
        useContext(ModalContext);
    const { handleModal }: any = useContext(ModalContext);

    return (
        visible &&
        (!banner ? (
            <div className="absolute w-full h-full px-5">
                <div
                    className="absolute top-0 left-0 right-0 z-40 flex w-full h-screen px-5 overflow-auto scrollbar-hide text-center bg-[#1e2335]  md:inset-0 h-modal md:h-full bg-opacity-50 cursor-pointer"
                    onClick={() => handleModal()}
                ></div>
                <div
                    className={` flex z-50 ${
                        isCenter ? "items-center" : "items-end pb-[40px] "
                    }   w-full h-full   `}
                >
                    <div className="z-50 flex flex-col w-full">
                        <div className="relative p-5 bg-[#F5F5FA]  shadow rounded-[15px]">
                            {modalTitle && (
                                <div className="flex justify-center pb-5 rounded-t">
                                    <h3 className="font-normal text-[#1E2335] text-[16px]">
                                        {modalTitle}
                                    </h3>
                                </div>
                            )}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="15"
                                height="15"
                                viewBox="0 0 50 50"
                                style={{
                                    fill: "#6b7a87",
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                }}
                                onClick={() => handleModal()}
                            >
                                <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                            </svg>

                            <div
                                className={`flex justify-center space-y-6 text-center text-base font-normal text-[#1E2335] leading-normal ${
                                    isCenter ? "" : "max-h-[45vw] overflow-auto"
                                } `}
                            >
                                {modalContent}
                            </div>
                        </div>
                        {footer}
                    </div>
                </div>
            </div>
        ) : (
            <div className="absolute w-full h-full px-5">
                <div
                    className="absolute top-0 left-0 right-0 z-40 flex w-full h-screen px-5 overflow-auto scrollbar-hide text-center bg-[#1e2335]  md:inset-0 h-modal md:h-full bg-opacity-50 cursor-pointer"
                    onClick={() => handleModal()}
                ></div>
                <div
                    className={` flex z-50 ${
                        isCenter ? "items-center" : "items-end pb-[40px] "
                    }   w-full h-full   `}
                >
                    <div className="relative z-50 bg-[#F5F5FA]  shadow rounded-[15px]">
                        {modalTitle && (
                            <div className="flex justify-center pt-5 pb-5 rounded-t">
                                <h3 className="font-normal text-[#1E2335] text-[16px]">
                                    {modalTitle}
                                </h3>
                            </div>
                        )}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="20"
                            height="20"
                            viewBox="0 0 50 50"
                            style={{
                                fill: "#6b7a87",
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                            }}
                            onClick={() => handleModal()}
                        >
                            <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                        </svg>
                        <div
                            className={`flex justify-center space-y-6 text-center text-base font-normal text-[#1E2335] leading-normal rounded-[15px] ${
                                isCenter ? "" : "max-h-[45vw] overflow-auto"
                            } `}
                        >
                            {modalContent}
                        </div>
                    </div>
                </div>
            </div>
        ))
    );
};

export default Modal;
