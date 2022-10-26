import React, { useContext } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import { ModalContext } from "lib/context/modal";
import { OrderItem, Status } from "lib/types/order.type";
import { renderStars, formatPrice } from "lib/utils/helpers";
import SmallButton from "components/common/small-button";
import LargeWhiteButton from "components/common/large-white-button";
import SubmitReview from "components/history/submit-review";
import { calcTimeDiff } from "lib/utils/helpers";
import { useAppState } from "lib/context/app";

const calcIsCancelled = (item: OrderItem) => {
    let isCancelled = false;
    let cancelledCount = 0;

    item?.items &&
        item?.items.map(
            (itemEntity: any) =>
                itemEntity.is_cancelled == true &&
                (cancelledCount = cancelledCount + 1),

            cancelledCount === item.items.length && (isCancelled = true)
        );

    return isCancelled;
};

interface FinishedCardProps {
    item: OrderItem;
    id: string;
    scrollRef: any;
}

const FinishedCard: React.FC<FinishedCardProps> = ({ item, id, scrollRef }) => {
    const router = useRouter();
    const { handleModal }: any = useContext(ModalContext);
    const [state, dispatch]: any = useAppState();

    return (
        <div className="relative" id={id} ref={scrollRef}>
            <Link
                href={`/order-detail/${item._id}?tokenid=${router.query.tokenid}&navid=${id}`}
            >
                <a>
                    <div className="relative w-full p-5 mb-3 bg-white shadow-md rounded-3xl">
                        <div className="flex justify-between mb-[10px]">
                            <p className="text-md text-slate-700">
                                Захиалга {item.order_no}
                            </p>

                            <p className="text-md text-slate-700">
                                {item.state === Status.COMPLETED
                                    ? "Биелсэн"
                                    : item.state === Status.CANCELLED
                                    ? "Цуцлагдсан"
                                    : ""}
                            </p>
                        </div>

                        {calcIsCancelled(item) == true ? (
                            <div className="flex justify-between mb-[10px]">
                                <p className="text-sm font-light break-normal text-[#647382]">
                                    Хүргэгдсэн хугацаа :
                                </p>

                                <p className="text-sm font-light break-normal text-[#647382]">
                                    {item?.items &&
                                        item?.items.map(
                                            (itemEntity: any) =>
                                                itemEntity?.cancel_reason
                                        )}
                                </p>
                            </div>
                        ) : (
                            <>
                                {item.delivered_at && (
                                    <div className="flex justify-between mb-[10px]">
                                        <p className="text-sm font-light break-normal text-[#647382]">
                                            Хүргэгдсэн хугацаа :
                                        </p>
                                        <p className="text-sm font-light break-normal text-[#647382]">
                                            {calcTimeDiff(
                                                item.paid_at,
                                                item.delivered_at
                                            )}
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-between mb-[10px]">
                                    <p className="text-sm font-light break-normal text-[#647382]">
                                        Нийт дүн :
                                    </p>

                                    <p className="text-sm font-light break-normal text-[#647382]">
                                        {formatPrice(item.total)} ₮
                                    </p>
                                </div>
                            </>
                        )}
                        {item.upoint_collect_amount ? (
                            <div className="flex justify-between mb-[10px]">
                                <p className="text-sm font-light break-normal text-[#647382]">
                                    Цуглуулсан U-Point оноо :
                                </p>

                                <div className="flex items-center text-sm font-light break-normal text-lime-400">
                                    +{item.upoint_collect_amount}
                                    <span className="ml-2 icon-U-Point-Symbol"></span>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {item.penalty ? (
                            <div className="flex justify-between mb-[10px]">
                                <p className="text-sm font-light break-normal text-[#647382]">
                                    Нөхөн төлбөр :
                                </p>

                                <div className="flex items-center text-sm font-light break-normal text-lime-400">
                                    +{item.penalty}
                                    <span className="ml-2 icon-U-Point-Symbol"></span>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {item.is_reviewed ? (
                            <>
                                <div className="flex justify-between ">
                                    <p className="text-sm font-light break-normal text-[#647382]">
                                        Үнэлгээ :
                                    </p>

                                    <ul className="flex justify-center">
                                        {renderStars(item.review_star)}
                                    </ul>
                                </div>
                            </>
                        ) : item.state != Status.CANCELLED ? (
                            <div className="w-full h-[20px]"></div>
                        ) : (
                            ""
                        )}
                    </div>
                </a>
            </Link>
            {!item.is_reviewed && item.state != Status.CANCELLED && (
                <div className="absolute z-30 grid w-full  mt-[-54px] justify-items-center">
                    <SmallButton
                        text="Үнэлгээ өгөх"
                        onClick={() => (
                            dispatch({
                                type: "star",
                                star: 0,
                            }),
                            handleModal(
                                true,
                                "Үнэлгээ өгөх",
                                <SubmitReview orderId={item._id} />,
                                true,
                                <div className="flex">
                                    <LargeWhiteButton
                                        type="submit"
                                        text="Илгээх"
                                        formId="submit-review-form"
                                    />
                                </div>
                            )
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default FinishedCard;
