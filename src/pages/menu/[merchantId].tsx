import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";

import RecommendedCard from "components/product/recommended-card";
import CategoryCard from "components/product-category/card";
import CenteredSpin from "components/common/centered-spin";
import SearchInput from "components/search-shop/search-input";
import FloatButton from "components/cart/float-button";
import { ModalContext } from "lib/context/modal";

import MerchantMenuCategories, {
    Category,
    Recommended,
} from "lib/types/merchant-menu-category.type";
import { toast } from "lib/utils/helpers";
import TokiAPI from "lib/api/toki";
import { useAppState } from "lib/context/app";

const Menu: NextPage = () => {
    const router = useRouter();
    const merchantId = router.query.merchantId;
    const [state, dispatch]: any = useAppState();
    const { handleModal }: any = useContext(ModalContext);

    const [data, setData] = useState<MerchantMenuCategories>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (merchantId) {
            setLoading(true);

            const fetchDatas = async () => {
                try {
                    const { data } = await TokiAPI.getMerchantMenuCategories(
                        merchantId.toString()
                    );

                    if (data.status_code === 0) {
                        setData(data.data);
                    } else {
                        toast(data.message);
                    }
                } finally {
                    setLoading(false);
                }
            };

            const fetchBanner = async () => {
                try {
                    const { data } = await TokiAPI.getBanner(
                        merchantId.toString()
                    );
                    if (data.status_code === 0) {
                        {
                            data.data.banner &&
                                state.banner == false &&
                                Object.keys(data.data.banner).length != 0 &&
                                (handleModal(
                                    true,
                                    data.data.banner.title
                                        ? data.data.banner.title
                                        : "",
                                    data.data.banner.image ? (
                                        <img
                                            src={data.data.banner.image}
                                            alt={data.data.banner.image}
                                            className={`w-[100%]  ${
                                                data.data.banner.title
                                                    ? "rounded-b-[15px]"
                                                    : "rounded-[15px]"
                                            }`}
                                        />
                                    ) : (
                                        ""
                                    ),
                                    true,
                                    <div className="flex"></div>,
                                    true
                                ),
                                dispatch({
                                    type: "banner",
                                    banner: true,
                                }));
                        }
                    } else {
                        toast(data.message);
                    }
                } finally {
                    setLoading(false);
                }
            };
            const fetchMerchants = async () => {
                try {
                    const jumpResponse = await TokiAPI.jumpMerchant(
                        merchantId.toString()
                    );

                    if (jumpResponse?.data.status_code === 0) {
                        !state.notThroughLink &&
                            (dispatch({
                                type: "merchantId",
                                merchantId: jumpResponse.data.data.merchant._id,
                            }),
                            dispatch({
                                type: "merchantName",
                                merchantName:
                                    jumpResponse.data.data.merchant.name,
                            }),
                            dispatch({
                                type: "merchants",
                                merchants: jumpResponse.data.data.merchants,
                            }),
                            dispatch({
                                type: "officeId",
                                officeId: jumpResponse.data.data.office?._id,
                            }),
                            dispatch({
                                type: "officeName",
                                officeName: jumpResponse.data.data.office?.name,
                            }),
                            dispatch({
                                type: "numberOfStorey",
                                numberOfStorey:
                                    jumpResponse.data.data.office
                                        ?.number_of_storey,
                            }),
                            dispatch({
                                type: "header",
                                header: jumpResponse.data.data.merchant.header,
                            }),
                            dispatch({
                                type: "isDelivery",
                                isDelivery:
                                    jumpResponse.data.data.merchant.is_delivery,
                            }),
                            dispatch({
                                type: "cancelDeliveryTimetable",
                                cancelDeliveryTimetable:
                                    jumpResponse.data.data.merchant
                                        .cancel_delivery_timetable,
                            }),
                            dispatch({
                                type: "temporaryClosed",
                                temporaryClosed:
                                    jumpResponse.data.data.merchant
                                        .temporary_closed,
                            }));
                    } else {
                        toast(jumpResponse?.data?.message);
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchDatas();
            fetchBanner();
            fetchMerchants();
        }
    }, [merchantId]);

    return loading ? (
        <CenteredSpin />
    ) : data ? (
        <div className="w-full p-5">
            <Link href={`/?tokenid=${router.query.tokenid}`}>
                <a className="mb-3">
                    <SearchInput type={1} />
                </a>
            </Link>

            {merchantId && data.recommended.length > 0 && (
                <>
                    <p className="my-5 text-base font-medium">Санал болгох</p>
                    <div className="flex gap-3 overflow-auto scrollbar-hide">
                        {data.recommended.map(
                            (recommended: Recommended, index: number) => (
                                <RecommendedCard
                                    key={index}
                                    merchantId={merchantId.toString()}
                                    recommended={recommended}
                                />
                            )
                        )}
                    </div>
                </>
            )}
            {merchantId && data.categories.length > 0 && (
                <>
                    <p className="my-5 text-base font-medium">
                        Бүтээгдэхүүний төрлүүд
                    </p>

                    <div className="grid grid-cols-3 gap-3 px-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                        {data.categories.map(
                            (category: Category, index: number) => (
                                <CategoryCard
                                    key={index}
                                    merchantId={merchantId.toString()}
                                    category={category}
                                />
                            )
                        )}
                    </div>
                </>
            )}
            <>
                {merchantId ? (
                    <>
                        <FloatButton
                            merchantId={merchantId ? merchantId.toString() : ""}
                            categoryId={
                                data.categories[0] ? data.categories[0]._id : ""
                            }
                        />
                    </>
                ) : (
                    ""
                )}
            </>
        </div>
    ) : null;
};

export default Menu;
