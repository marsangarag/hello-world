import { useContext } from "react";

import CoffeeShopCard from "components/coffee-shop/card";
import LargeWhiteButton from "components/common/large-white-button";
import { ModalContext } from "lib/context/modal";
import Office, { Merchant } from "lib/types/office.type";
import { useAppState } from "lib/context/app";

interface OfficeCardProps {
    office: Office;
}

const OfficeCard: React.FC<OfficeCardProps> = ({ office }) => {
    const { handleModal }: any = useContext(ModalContext);
    const [state, dispatch]: any = useAppState();

    return (
        <div
            id={office._id}
            className="p-[15px] mb-3 bg-white  cursor-pointer rounded-3xl "
            style={{ boxShadow: "0 -5px 10px 0 rgba(30, 35, 53, 0.05)" }}
            onClick={() => {
                dispatch({
                    type: "merchants",
                    merchants: office.merchants,
                });
                dispatch({ type: "officeId", officeId: office._id });
                dispatch({ type: "officeName", officeName: office.name });
                dispatch({
                    type: "numberOfStorey",
                    numberOfStorey: office.number_of_storey,
                });

                dispatch({
                    type: "notThroughLink",
                    notThroughLink: true,
                });

                handleModal(
                    true,
                    `"${office.name}" кофе шопууд`,
                    office.merchants.length > 0 ? (
                        <div className="flex flex-wrap gap-4 overflow-auto scrollbar-hide">
                            {office.merchants.map(
                                (merchant: Merchant, index: number) => (
                                    <CoffeeShopCard
                                        key={index}
                                        merchant={merchant}
                                    />
                                )
                            )}
                        </div>
                    ) : (
                        "Уучлаарай, кофе шоп олдсонгүй"
                    ),
                    false,
                    <div className="flex">
                        <LargeWhiteButton
                            text="Буцах"
                            onClick={() => handleModal()}
                        />
                    </div>
                );
            }}
        >
            <div className="flex items-center">
                <div className="w-12 shrink-0">
                    <img
                        src={office.logo}
                        alt={office.name}
                        className="w-[50px] h-[50px] object-cover rounded-[15px]"
                    />
                </div>
                <div className="flex-grow mx-2 text-left">
                    <p className="text-base font-normal text-[#1E2335]">
                        {office.name}
                    </p>
                    <p className="text-sm font-light break-normal text-[#647382]">
                        {office.merchants.length} кофе шоп
                    </p>
                </div>
                <div className=" shrink-0">
                    <span className="icon-Down-Arrow-1 text-[#647382]"></span>
                </div>
            </div>
        </div>
    );
};

export default OfficeCard;
