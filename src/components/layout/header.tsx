import { useRouter } from "next/router";
import { useContext } from "react";
import Link from "next/link";

import CoffeeShopCard from "components/coffee-shop/card";
import LargeWhiteButton from "components/common/large-white-button";
import { ModalContext } from "lib/context/modal";
import { useAppState } from "lib/context/app";
import { Merchant } from "lib/types/office.type";

const BackButtonRoutes = [
    "/",
    "/product-list/[merchantId]/[categoryId]",
    "/order-detail/[orderId]",
    "/cart/[merchantId]",
];

const Header = ({ routerPathName }: any) => {
    const router = useRouter();
    const [state]: any = useAppState();
    const isBackButton = BackButtonRoutes.includes(routerPathName);
    const { handleModal }: any = useContext(ModalContext);

    return (
        <header
            className={`w-full flex h-[77px] text-center text-white bg-gradient-to-r from-gradient-start to-gradient-end overflow-hidden `}
        >
            <div className="grid w-full h-[calc(-25px+100%)] grid-cols-3 gap-4 px-[20px] py-[12px]">
                <div className="h-fit">
                    {routerPathName != "/" &&
                        (!isBackButton ? (
                            <button
                                type="button"
                                className={`flex items-center justify-center w-[30px] h-[30px] text-base text-white rounded-lg bg-black bg-opacity-25 border-[0.5px] border-black border-opacity-20`}
                                onClick={() =>
                                    state.merchants &&
                                    handleModal(
                                        true,
                                        `"${state.officeName}" кофе шопууд`,
                                        state.merchants &&
                                            state.merchants.length > 0 ? (
                                            <div className="flex flex-wrap gap-4 overflow-auto scrollbar-hide">
                                                {" "}
                                                {state.merchants.map(
                                                    (
                                                        merchant: Merchant,
                                                        index: number
                                                    ) => (
                                                        <>
                                                            <CoffeeShopCard
                                                                key={index}
                                                                merchant={
                                                                    merchant
                                                                }
                                                            />
                                                        </>
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
                                    )
                                }
                            >
                                <span className="icon-switch"></span>
                            </button>
                        ) : (
                            <Link
                                href={
                                    state.merchantId
                                        ? routerPathName ==
                                          `/product-list/[merchantId]/[categoryId]`
                                            ? `/menu/${state.merchantId}?tokenid=${router.query.tokenid}`
                                            : routerPathName ==
                                              `/order-detail/[orderId]`
                                            ? `/order-history?tokenid=${router.query.tokenid}`
                                            : routerPathName ==
                                              `/cart/[merchantId]`
                                            ? `/product-list/${state.merchantId}/${state.categoryId}?tokenid=${router.query.tokenid}`
                                            : `/menu/${state.merchantId}?tokenid=${router.query.tokenid}`
                                        : `/?tokenid=${router.query.tokenid}`
                                }
                            >
                                <a>
                                    <button
                                        type="button"
                                        className={`flex items-center justify-center w-[30px] h-[30px] text-base text-white ${
                                            state.themeColor === "#ffffff"
                                                ? "border border-gray-300 border-solid"
                                                : `bg-black bg-opacity-25`
                                        } border-[0.5px] border-black border-opacity-20 rounded-lg`}
                                    >
                                        <span className="text-[#ffff] icon-back"></span>
                                    </button>
                                </a>
                            </Link>
                        ))}
                </div>

                {state.header && router.pathname !== "/" && (
                    <img
                        src={`${state.header}`}
                        alt="header"
                        className="max-h-[30px] max-w-[80px] w-full object-cover mx-auto"
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
