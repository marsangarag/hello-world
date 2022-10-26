import type { NextPage } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Countdown from "react-countdown";

import CartCard from "components/product/cart-card";
import MediumButton from "components/common/medium-button";
import SearchInput from "components/search-shop/search-input";
import CenteredSpin from "components/common/centered-spin";
import LargeWhiteButton from "components/common/large-white-button";
import NewOrder from "components/order/new-order";
import TokiAPI from "lib/api/toki";
import { toast, formatPrice, calcTimeDiff } from "lib/utils/helpers";
import Cart, { Item } from "lib/types/cart.type";
import { useAppState } from "lib/context/app";
import { ModalContext } from "lib/context/modal";
import { CancelDeliveryTimetable } from "lib/types/office.type";

function toDate(dStr: any, format: any) {
    var now = new Date();
    if (format == "h:m") {
        now.setHours(dStr.substr(0, dStr.indexOf(":")));
        now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
        now.setSeconds(0);
        return now;
    } else return "Invalid Format";
}

let orderId: string = "";
const renderer = ({ hours, minutes, seconds }: any) => {
    let calcSeconds = hours * 360 + minutes * 60 + seconds;

    return <span>{calcSeconds}</span>;
};

const Cart: NextPage = () => {
    const router = useRouter();
    const { handleModal }: any = useContext(ModalContext);
    const [state, dispatch]: any = useAppState();
    const { merchantId } = router.query;
    const [data, setData] = useState<Cart>();
    const [loading, setLoading] = useState(false);
    const [isDelivery, setIsDelivery] = useState(true);

    const [loadingEstimate, setLoadingEstimate] = useState(false);
    const [prepareEstimate, setPrepareEstimate] = useState("?");
    const [deliveryEstimate, setDeliveryEstimate] = useState("?");
    const [selectedButton, setSelectedButton] = useState("");

    const fetchEstimateData = async () => {
        setLoadingEstimate(true);

        try {
            const { data } = await TokiAPI.refreshEstimate(orderId);

            if (data.status_code === 0) {
                setPrepareEstimate(
                    calcTimeDiff("", data.data.prepare_estimate, false)
                );
                setDeliveryEstimate(
                    calcTimeDiff("", data.data.delivery_estimate, false)
                );
            } else {
                toast(data.message);
            }
        } finally {
            setLoadingEstimate(false);
        }
    };

    useEffect(() => {
        if (merchantId && state.officeId) {
            setLoading(true);

            const fetchDatas = async () => {
                try {
                    const { data } = await TokiAPI.viewCart({
                        merchant_id: merchantId,
                        office_id: state.officeId,
                    });

                    if (data.status_code === 0) {
                        orderId = data.data._id;
                        setData(data.data);

                        dispatch({
                            type: "cartPrice",
                            cartPrice: data.data.total,
                        });
                        setPrepareEstimate(
                            calcTimeDiff("", data.data.prepare_estimate, false)
                        );
                        setDeliveryEstimate(
                            calcTimeDiff("", data.data.delivery_estimate, false)
                        );

                        if (data.data.is_busy) {
                            handleModal(
                                true,
                                "",
                                "Кофе шоп захиалга ихтэй байгаа тул хүргэлтийн хугацаа энгийн үеэс 10 минут орчим нэмэгдэнэ",
                                true,
                                <div className="flex">
                                    <LargeWhiteButton
                                        text="Ок"
                                        onClick={() => handleModal()}
                                    />
                                </div>
                            );
                        }
                    } else {
                        toast(data.message);
                    }
                } finally {
                    setLoading(false);
                }
            };

            {
                state.cancelDeliveryTimetable.map(
                    (cancelDelivery: CancelDeliveryTimetable, index: number) =>
                        new Date().getDay() === cancelDelivery.day
                            ? cancelDelivery.closed === false
                                ? setIsDelivery(true)
                                : toDate(cancelDelivery.start_hour, "h:m") <=
                                      new Date() &&
                                  toDate(cancelDelivery.end_hour, "h:m") >
                                      new Date()
                                ? setIsDelivery(false)
                                : setIsDelivery(true)
                            : null
                );
            }

            fetchDatas();
        }
    }, [merchantId, state.officeId]); // eslint-disable-line react-hooks/exhaustive-deps
    return loading ? (
        <CenteredSpin />
    ) : data ? (
        <div className="flex flex-col justify-between w-full h-full p-5">
            <div>
                <Link href={`/?tokenid=${router.query.tokenid}`}>
                    <a className="mb-3">
                        <SearchInput type={1} />
                    </a>
                </Link>
                <div
                    className="grid w-full grid-cols-1 px-[15px] mb-3 bg-white divide-y divide-dashed rounded-3xl"
                    style={{
                        boxShadow: "5px 5px 10px 0 rgba(30, 35, 53, 0.05)",
                    }}
                >
                    {data.items &&
                        data.items.map((item: Item, index: number) => (
                            <CartCard
                                key={index}
                                item={item}
                                orderId={data._id}
                                setLoadingEstimate={setLoadingEstimate}
                                setPrepareEstimate={setPrepareEstimate}
                                setDeliveryEstimate={setDeliveryEstimate}
                            />
                        ))}
                </div>

                <div className="flex justify-between mb-1 text-base font-medium">
                    <p className="mb-3">Нийт төлөх: </p>
                    <p className="mb-3">{formatPrice(state.cartPrice)} ₮</p>
                </div>
                <div className="flex items-center">
                    <svg
                        className="w-6 h-6 mr-4 text-red-400 rotate-180 fill-current grow-0 shrink-0"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                            stroke="#F5F5FA"
                        />
                    </svg>

                    <div className="text-sm font-light text-slate-500">
                        Очиж авах / Хүргүүлж авах хугацаа{" "}
                        {!loadingEstimate ? (
                            <>
                                <Countdown
                                    daysInHours={true}
                                    date={Date.now() + 60000}
                                    renderer={renderer}
                                    onComplete={() => {
                                        fetchEstimateData();
                                    }}
                                />{" "}
                                секундын дараа шинэчлэгдэнэ.
                            </>
                        ) : (
                            "шинэчлэгдэж байна."
                        )}
                    </div>
                </div>
            </div>

            <div className={` w-full flex gap-4 pb-3 mt-3`}>
                <div className="flex-auto">
                    <MediumButton
                        secondLineText={`Очиж авах`}
                        text={`( ${prepareEstimate} мин )`}
                        white={selectedButton == "notDelivery" ? false : true}
                        additionalClass="w-full"
                        onClick={() => (
                            setSelectedButton("notDelivery"),
                            handleModal(
                                true,
                                "Нэмэлт мэдээлэл оруулах",
                                <NewOrder data={data} type="take_away" />,
                                true,
                                <div className="flex">
                                    <LargeWhiteButton
                                        text="Цуцлах"
                                        roundedClass="rounded-l-[15px]"
                                        border="border-r-[1px] border-[#b3bfc6]"
                                        onClick={() => (
                                            handleModal(), setSelectedButton("")
                                        )}
                                    />
                                    <LargeWhiteButton
                                        type="submit"
                                        text="Болсон"
                                        roundedClass="rounded-r-[15px]"
                                        formId="place-order-form"
                                    />
                                </div>
                            )
                        )}
                    />
                </div>

                {isDelivery == true ? (
                    <div className="flex-auto">
                        <MediumButton
                            secondLineText={`Хүргүүлэх`}
                            additionalClass="w-full"
                            text={`( ${deliveryEstimate} мин )`}
                            white={selectedButton == "delivery" ? false : true}
                            onClick={() => (
                                setSelectedButton("delivery"),
                                handleModal(
                                    true,
                                    "Нэмэлт мэдээлэл оруулах",
                                    <NewOrder data={data} type="delivery" />,
                                    true,
                                    <div className="flex">
                                        <LargeWhiteButton
                                            text="Цуцлах"
                                            roundedClass="rounded-l-[15px]"
                                            border="border-r-[0.5px] border-[#B3BFC6]"
                                            onClick={() => (
                                                handleModal(),
                                                setSelectedButton("")
                                            )}
                                        />
                                        <LargeWhiteButton
                                            type="submit"
                                            text="Болсон"
                                            roundedClass="rounded-r-[15px]"
                                            formId="place-order-form"
                                        />
                                    </div>
                                )
                            )}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    ) : null;
};

export default Cart;
