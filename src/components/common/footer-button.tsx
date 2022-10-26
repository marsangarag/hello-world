import React from "react";

export default function FooterButton({ state, type, isActive }: any) {
    return type === "menu" ? (
        <div className="flex flex-col justify-center">
            <div className="flex justify-center">
                <span
                    className={`text-[20px] ${
                        isActive
                            ? "icon-Menu---Bold-icon-4"
                            : "icon-Menu---Bold-icon-4"
                    } mb-1`}
                    style={
                        isActive
                            ? { color: state.themeColor }
                            : { color: "#b3bfc6" }
                    }
                ></span>
            </div>

            <div className={`text-[10px] ${!isActive && "text-[#B3BFC6]"}`}>
                Меню
            </div>
        </div>
    ) : type === "order" ? (
        <div className="flex flex-col justify-center ">
            <div className="flex justify-center ">
                <span
                    className={`text-[20px] ${
                        isActive
                            ? "icon-Shop---Bold-icon-1 "
                            : "icon-Shop---Gray-icon-4 "
                    } mb-1`}
                    style={{ color: state.themeColor }}
                ></span>
            </div>

            <div className={`text-[10px] ${!isActive && "text-[#B3BFC6]"}`}>
                Захиалга
            </div>
        </div>
    ) : null;
}
