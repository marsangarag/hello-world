import type { NextPage } from "next";
import { useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import PullToRefresh from "react-simple-pull-to-refresh";

import LargeWhiteButton from "components/common/large-white-button";
import { toast } from "lib/utils/helpers";
import { ModalContext } from "lib/context/modal";
import FinishedList from "components/history/finished-list";
import OngoingList from "components/history/ongoing-list";
import { useAppState } from "lib/context/app";

const OrderHistory: NextPage = () => {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();
    const { handleModal }: any = useContext(ModalContext);
    const { paymentStatusCode }: any = router.query;
    const { upoint }: any = router.query;
    const executeScroll = () => scrollRef?.current?.scrollIntoView();

    const scrollRef = useRef<null | HTMLDivElement>(null);

    const goToViolation = (id: any) => {
        const violation = document.getElementById(id);
        violation &&
            window.scrollTo({
                top: violation.offsetTop,
                behavior: "smooth",
            });
    };

    useEffect(() => {
        mutate(
            "/app/order/merchant/${state.merchantId}?status=ongoing&page_size=10&page=1"
        );
        mutate(
            "/app/order/merchant/${state.merchantId}?status=completed&page_size=10&page=1"
        );
    }, [5000]);

    useEffect(() => {
        // if (state.navId) {
        //     executeScroll();
        // }
        if (paymentStatusCode) {
            if (paymentStatusCode == 200) {
                handleModal(
                    true,
                    "",
                    upoint
                        ? `Таны захиалга амжилттай хийгдэж U-Point дансанд ${upoint} оноо нэмэгдлээ`
                        : `Таны захиалга амжилттай хийгдлээ`,
                    true,
                    <div className="flex">
                        <LargeWhiteButton
                            text="Ok"
                            onClick={() => handleModal()}
                        />
                    </div>
                );
                dispatch({
                    type: "cartCount",
                    cartCount: 0,
                });
                dispatch({
                    type: "star",
                    star: 0,
                });
            } else {
                toast("Уучлаарай, Таны захиалга амжилтгүй боллоо");
            }
        }
    }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleRefresh = async () => {
        mutate(
            "/app/order/merchant/${state.merchantId}?status=ongoing&page_size=10&page=1"
        );
        mutate(
            "/app/order/merchant/${state.merchantId}?status=completed&page_size=10&page=1"
        );
    };

    return (
        <div className="w-full h-full ">
            <PullToRefresh
                className="w-full h-full"
                onRefresh={handleRefresh}
                pullingContent=" "
            >
                <div className="m-5">
                    <OngoingList scrollRef={scrollRef} />
                    <FinishedList scrollRef={scrollRef} />
                </div>
            </PullToRefresh>
        </div>
    );
};

export default OrderHistory;
