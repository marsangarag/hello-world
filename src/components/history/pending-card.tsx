import Link from "next/link";
import { useRouter } from "next/router";
import Countdown, { zeroPad } from "react-countdown";
import { useState } from "react";

import OrderStatus from "components/order/order-status";
import { OrderItem, Status } from "lib/types/order.type";
import SmallButton from "components/common/small-button";

const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
        return (
            <span className="text-red-500">
                -
                {hours > 0
                    ? `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(
                          seconds
                      )}`
                    : `${zeroPad(minutes)}:${zeroPad(seconds)}`}
            </span>
        );
    } else {
        return (
            <span>
                {hours > 0
                    ? `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(
                          seconds
                      )}`
                    : `${zeroPad(minutes)}:${zeroPad(seconds)}`}
            </span>
        );
    }
};

interface PendingCardProps {
    item: OrderItem;
    id: string;
    scrollRef: any;
}

const PendingCard: React.FC<PendingCardProps> = ({ item, id, scrollRef }) => {
    const router = useRouter();

    const [phoneVisible, setPhoneVisible] = useState(
        new Date(item.delivery_estimate) > new Date() ? false : true
    );

    return (
        <div style={{ position: "relative" }} id={id} ref={scrollRef}>
            <Link
                href={`/order-detail/${item._id}?tokenid=${router.query.tokenid}&navid=${id}`}
            >
                <a style={{ zIndex: "9" }}>
                    <div className="w-full p-5 mb-3 bg-white shadow-md rounded-3xl">
                        <div className="flex justify-between mb-[10px]">
                            <p className="text-md text-slate-700">
                                Захиалга {item.order_no}
                            </p>

                            <OrderStatus status={item.state} />
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm font-light break-normal text-[#647382]">
                                {item.state === Status.PREPARED ||
                                item.state === Status.DELIVERING
                                    ? "Хүргэгдэх хугацаа"
                                    : item.state === Status.PAID ||
                                      item.state === Status.PREPARING
                                    ? "Бэлэн болох хугацаа"
                                    : ""}
                            </p>

                            <p className="text-sm font-light break-normal text-[#647382]">
                                {item.delivery_estimate ? (
                                    <Countdown
                                        daysInHours={true}
                                        overtime={true}
                                        date={
                                            new Date(
                                                item.delivery_estimate.replace(
                                                    / /g,
                                                    "T"
                                                )
                                            )
                                        }
                                        renderer={renderer}
                                        onComplete={() => setPhoneVisible(true)}
                                    />
                                ) : (
                                    ""
                                )}
                            </p>
                        </div>
                        {phoneVisible && (
                            <div className="w-full h-[30px]"></div>
                        )}
                    </div>
                </a>
            </Link>

            {phoneVisible && (
                <div className="absolute z-30 grid w-full  mt-[-54px] justify-items-center">
                    <a
                        href={`tel://${item.merchant?.contact_number}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <SmallButton
                            text={
                                <div className="flex">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>{" "}
                                    Залгах
                                </div>
                            }
                        />
                    </a>
                </div>
            )}
        </div>
    );
};

export default PendingCard;
