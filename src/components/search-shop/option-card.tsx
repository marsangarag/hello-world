import { useContext } from "react";

import CoffeeShopCard from "components/coffee-shop/card";
import LargeWhiteButton from "components/common/large-white-button";
import { ModalContext } from "lib/context/modal";
import Office, { Merchant } from "lib/types/office.type";
import { useAppState } from "lib/context/app";

interface OptionCardProps {
    office: Office;
}

const OptionCard: React.FC<OptionCardProps> = ({ office }) => {
    const { handleModal }: any = useContext(ModalContext);
    const [state, dispatch]: any = useAppState();

    return (
        <button
            className="flex flex-wrap px-[15px] py-[15px]"
            onClick={() => {
                dispatch({
                    type: "merchants",
                    merchants: office.merchants,
                });
                dispatch({ type: "officeId", officeId: office._id });
                dispatch({
                    type: "officeName",
                    officeName: office.name,
                });
                dispatch({
                    type: "numberOfStorey",
                    numberOfStorey: office.number_of_storey,
                });

                handleModal(
                    true,
                    `"${office.name}" кофе шопууд`,
                    office.merchants.length > 0 ? (
                        <div className="flex flex-wrap gap-4 overflow-auto scrollbar-hide">
                            {" "}
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
            <p className="mr-1 text-sm text-normal">{office.name}</p>
            <p className="text-sm font-light">
                ( {office.merchants.length} кофе шоп )
            </p>
        </button>
    );
};

export default OptionCard;
