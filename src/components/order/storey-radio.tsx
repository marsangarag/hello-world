import { useState } from "react";
import { useController } from "react-hook-form";

export default function StoreyRadio(props: any) {
    const [storeyVisible, setStoreyVisible] = useState(false);
    const [storey, setStorey] = useState(0);
    const { field, fieldState } = useController(props);

    const renderStoreys = (numberOfStorey: any) => {
        const storeys = [];

        for (let i = 1; i <= numberOfStorey; i++) {
            storeys.push(
                <li
                    key={i}
                    className="relative cursor-pointer"
                    onClick={() => (setStorey(i), setStoreyVisible(false))}
                >
                    <input
                        {...field}
                        id={`delivery_floor_${i}`}
                        className="sr-only peer"
                        type="radio"
                        value={i}
                        defaultChecked={
                            props.deliveryOptions &&
                            props.deliveryOptions.delivery_floor === i
                        }
                    />
                    <label
                        className="flex px-3 font-light bg-white border border-gray-300 rounded-lg cursor-pointer text-[#647382]  hover:bg-gray-50 peer-checked:ring-[#1E2335]  peer-checked:text-[#1E2335] peer-checked:ring-1 peer-checked:font-md  peer-checked:border-transparent capitalize justify-center p-2"
                        htmlFor={`delivery_floor_${i}`}
                    >
                        {i}
                    </label>
                </li>
            );
        }

        return storeys;
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setStoreyVisible(storeyVisible ? false : true)}
                className={`flex w-full p-3 text-left cursor-pointer border-[#B3BFC6] rounded-xl border-[1px] bg-[#F5F5FA] font-light text-sm ${
                    storeyVisible && "rounded-b-none border-b-0"
                }`}
            >
                <div
                    className={`flex-grow mx-1  ${
                        storey
                            ? ""
                            : props.deliveryOptions &&
                              props.deliveryOptions.delivery_floor &&
                              props.deliveryOptions.delivery_floor <=
                                  props.numberOfStorey
                            ? ""
                            : "text-gray-400"
                    }`}
                >
                    {storey
                        ? storey
                        : props.deliveryOptions &&
                          props.deliveryOptions.delivery_floor &&
                          props.deliveryOptions.delivery_floor <=
                              props.numberOfStorey
                        ? props.deliveryOptions.delivery_floor
                        : "Хүргүүлэх давхар сонгох"}
                </div>
                <div className=" shrink-0">
                    {storeyVisible ? (
                        <span
                            className=" icon-Up-Arrow-1"
                            style={{ color: "#647382" }}
                        />
                    ) : (
                        <span
                            className=" icon-Arrow---Down"
                            style={{ color: "#647382" }}
                        />
                    )}
                </div>
            </button>
            <div className={`${storeyVisible ? `block` : "hidden"}`}>
                <div
                    className={` px-3 border-[1px] border-[#B3BFC6] rounded-b-xl drop-shadow-sm bg-[#F5F5FA] border-t-0 text-center`}
                >
                    <ul
                        className={`w-full grid grid-cols-5 gap-2 py-3 border-[#B3BFC6]  border-t-[1px] mt-[-1px] text-sm`}
                        style={{ borderTopStyle: "dashed" }}
                    >
                        {renderStoreys(props.numberOfStorey)}
                    </ul>
                </div>
            </div>
            <p className="mt-1 text-xs italic text-left text-red-500">
                {fieldState.error?.message}
            </p>
        </>
    );
}
