import Link from "next/link";
import { useRouter } from "next/router";

import FooterButton from "components/common/footer-button";
import FooterCartButton from "components/common/footer-cart-button";
import MediumButton from "components/common/medium-button";
import { useAppState } from "lib/context/app";
import { toast } from "lib/utils/helpers";

const CartFooterRoutes = ["/product-list/[merchantId]/[categoryId]"];

const Footer = ({ routerPathName }: any) => {
    const isCartFooter = CartFooterRoutes.includes(routerPathName);
    const [state]: any = useAppState();
    const router = useRouter();
    const { merchantId } = router.query;

    return (
        <footer className="fixed z-30 bottom-0 w-full grid grid-cols-2 gap-4 h-[75px] p-5 text-black bg-white rounded-t-[20px] shadow-2xl shadow-black">
            {!isCartFooter ? (
                <>
                    <Link
                        href={`/menu/${state.merchantId}?tokenid=${router.query.tokenid}`}
                    >
                        <a>
                            <div className="flex content-center justify-center">
                                <FooterButton
                                    state={state}
                                    type="menu"
                                    isActive={
                                        routerPathName == "/menu/[merchantId]"
                                            ? true
                                            : false
                                    }
                                />
                            </div>
                        </a>
                    </Link>
                    <Link
                        href={`/order-history?tokenid=${router.query.tokenid}`}
                    >
                        <a>
                            <div className="flex content-center justify-center">
                                <FooterButton
                                    state={state}
                                    type="order"
                                    isActive={
                                        routerPathName == "/order-history" ||
                                        routerPathName ==
                                            "/order-history/notification/review" ||
                                        routerPathName ==
                                            "/order-history/notification/jump"
                                            ? true
                                            : false
                                    }
                                />
                            </div>
                        </a>
                    </Link>
                </>
            ) : (
                <>
                    {state.cartCount > 0 ? (
                        <>
                            <Link
                                href={`/cart/${merchantId}?tokenid=${router.query.tokenid}`}
                            >
                                <a>
                                    <div className="flex content-center justify-center">
                                        <FooterCartButton state={state} />
                                    </div>
                                </a>
                            </Link>
                            <Link
                                href={`/cart/${merchantId}?tokenid=${router.query.tokenid}`}
                            >
                                <a>
                                    <div className="flex content-center justify-center">
                                        <MediumButton text="Захиалах" />
                                    </div>
                                </a>
                            </Link>
                        </>
                    ) : (
                        <>
                            {" "}
                            <a
                                onClick={() =>
                                    toast(
                                        "Та захиалах бүтээгдэхүүнээ сонгоно уу"
                                    )
                                }
                            >
                                <div className="flex content-center justify-center">
                                    <FooterCartButton state={state} />
                                </div>
                            </a>
                            <a
                                onClick={() =>
                                    toast(
                                        "Та захиалах бүтээгдэхүүнээ сонгоно уу"
                                    )
                                }
                            >
                                <div className="flex content-center justify-center">
                                    <MediumButton text="Захиалах" />
                                </div>
                            </a>
                        </>
                    )}
                </>
            )}
        </footer>
    );
};

export default Footer;
