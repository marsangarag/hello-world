import type { NextPage } from "next";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Countdown, { zeroPad } from "react-countdown";

import { calcTimeDiff, formatPrice } from "lib/utils/helpers";
import { Status } from "lib/types/order.type";
import OrderStatus from "components/order/order-status";
import OrderCard from "components/product/order-card";
import CenteredSpin from "components/common/centered-spin";
import TokiAPI from "lib/api/toki";
import { toast } from "lib/utils/helpers";
import { Item, OrderDetail } from "lib/types/order-detail";
import { ModalContext } from "lib/context/modal";
import LargeWhiteButton from "components/common/large-white-button";
import SmallButton from "components/common/small-button";
import { useAppState } from "lib/context/app";

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

const openAppStore = (url: any) => {
    window.location.href = url;
};

const OrderDetail: NextPage = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const { navid } = router.query;

    const [state, dispatch]: any = useAppState();
    const [data, setData] = useState<OrderDetail>();
    const [phoneVisible, setPhoneVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { handleModal }: any = useContext(ModalContext);
    let urlLink = "https://integration.upoint.mn/main/app_connect";

    useEffect(() => {
        if (navid) {
            dispatch({
                type: "navId",
                navId: navid,
            });
        }

        if (orderId) {
            setLoading(true);

            const fetchDatas = async () => {
                try {
                    const { data } = await TokiAPI.getOrderById(
                        orderId.toString()
                    );

                    if (data?.status_code === 0) {
                        setData(data?.data);

                        setPhoneVisible(
                            data?.data.state == Status.CANCELLED ||
                                data?.data.state == Status.COMPLETED
                                ? false
                                : new Date(data?.data.delivery_estimate) >
                                  new Date()
                                ? false
                                : true
                        );
                    } else {
                        toast(data?.message);
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchDatas();
        }
    }, [orderId]);

    return loading ? (
        <CenteredSpin />
    ) : data ? (
        <div className="w-full p-5">
            <div className="flex justify-between mb-5">
                {data.state && <OrderStatus status={data.state} />}
                {data.state != Status.CANCELLED && (
                    <div className="grid content-center text-sm">
                        {data.state === Status.COMPLETED ? (
                            data.delivered_at &&
                            calcTimeDiff(data.paid_at, data.delivered_at)
                        ) : data.delivery_estimate ? (
                            <Countdown
                                daysInHours={true}
                                overtime={true}
                                date={
                                    new Date(
                                        data.delivery_estimate.replace(
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
                    </div>
                )}
            </div>

            {data.delivery_address && data.delivery_floor && (
                <div className="flex mb-3">
                    <span className="mr-2 icon-Location---Light-icon" />
                    <p className="text-sm font-light text-[#647382]">
                        {data.delivery_address}
                        {data.delivery_floor &&
                            `, ${data.delivery_floor}-р давхар`}
                    </p>
                </div>
            )}
            <div className="grid w-full grid-cols-1 px-3 mb-3 bg-white divide-y shadow-md divide-dashed rounded-3xl ">
                {data.items &&
                    data.items.map((item: Item, index: number) => (
                        <OrderCard key={index} item={item} />
                    ))}
            </div>

            <p className="mt-5 mb-3 text-base font-medium">
                Захиалгын мэдээлэл
            </p>

            <div className="px-3">
                <div className="flex justify-between mt-1 mb-2 text-sm font-normal">
                    <p>Захиалгын дугаар:</p>
                    <p>{data.order_no}</p>
                </div>
                <div className="flex justify-between mt-1 mb-2 text-sm font-normal">
                    <p>Захиалсан:</p>
                    <p>
                        {data.created_at &&
                            format(
                                new Date(data.created_at),
                                "yyyy.MM.dd HH:mm"
                            )}
                    </p>
                </div>

                <div className="flex justify-between pb-1 mt-1 mb-2 text-sm font-normal">
                    <p>Нийт дүн:</p>
                    <p>{formatPrice(data.total)} ₮</p>
                </div>
                <div className="flex justify-between pt-2 mb-2 text-sm font-normal border-t border-gray-400 border-dashed">
                    <p>Төлсөн дүн:</p>
                    <p>{formatPrice(data.total)} ₮</p>
                </div>
                {data.upoint_response && data.upoint_response.total_point ? (
                    <div className="flex justify-between mb-[10px]">
                        <p className="text-sm font-light break-normal text-[#647382]">
                            Цуглуулсан U-Point оноо :
                        </p>

                        <div className="flex items-center text-sm font-light break-normal text-lime-400">
                            +{data.upoint_response.total_point}
                            <span className="ml-2 icon-U-Point-Symbol"></span>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {data.penalty ? (
                    <div className="flex justify-between mb-[10px]">
                        <p className="text-sm font-light break-normal text-[#647382]">
                            Нөхөн төлбөр :
                        </p>

                        <div className="flex items-center text-sm font-light break-normal text-lime-400">
                            +{data.penalty}
                            <span className="ml-2 icon-U-Point-Symbol"></span>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {data.upoint_response &&
                data.upoint_response.point_balance &&
                !data.penalty ? (
                    <div className="flex justify-between mb-[10px]">
                        <p className="text-sm font-light break-normal text-[#647382] flex">
                            Нийт :{" "}
                            <a
                                className="ml-1"
                                onClick={() =>
                                    handleModal(
                                        true,
                                        "",
                                        <div>
                                            Та{" "}
                                            <span className="font-medium">
                                                U-point
                                            </span>{" "}
                                            апп дээр бүртгэл үүсгээд өөрийн түр
                                            дансанд цугларсан оноог авах
                                            боломжтой
                                        </div>,
                                        true,
                                        <div className="flex">
                                            <LargeWhiteButton
                                                text="Хаах"
                                                roundedClass="rounded-l-[15px]"
                                                onClick={() => handleModal()}
                                            />

                                            <LargeWhiteButton
                                                text="Апп нээх"
                                                roundedClass="rounded-r-[15px]"
                                                onClick={
                                                    () => openAppStore(urlLink)
                                                    // window.open(
                                                    //     urlLink,
                                                    //     "_blank"
                                                    // )
                                                }
                                            />
                                        </div>
                                    )
                                }
                            >
                                <img
                                    style={{ marginTop: "-3px" }}
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAABNElEQVRIie3Vu06CQRAF4E9QK6hMTJQAjS9iYeUlJCqd2hOl1AfwUvoIJtpYWvgAvoCNdrbeYi82EKPFWhDZHxZsLDjVZuacPZOdnV3G+G+YSOAUsYN5tJHHJ6bxgnO0/lJEHYcoZ+TLOMLmqAZNrCRy1374Q6E+hEG30UYquSgcUQxL2MeyeD+PUUgx2RXvQROrmMIiDiKcChq/g7kIcQ5PkXgL1+jgBrMRziNKKSadSAzOutbbuM3g9ehjJoPQwDsuUwWjmJRxNYwgZjI1QHM6IN+jj5m8yp7wGaEfWajieUARCPf8KCNXxFYf7YnInOQjxLZQ8QIeIrn7DIMa3nDXp4geNIWnIgU17A2zeTc2hKeikpGvCke03m+TlP+kIDS7JAxaDl+YFJp8gY+kksf4N/gGshMtSUeKiXMAAAAASUVORK5CYII="
                                ></img>
                            </a>
                        </p>
                        <div className="flex items-center text-sm font-light break-normal ">
                            {data.upoint_response.point_balance}
                            <span className="ml-2 icon-U-Point-Symbol"></span>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
            {data.merchant && data.merchant.contact_number && phoneVisible && (
                <div className="grid w-full justify-items-center">
                    <a
                        href={`tel://${data.merchant?.contact_number}`}
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
    ) : null;
};

export default OrderDetail;
