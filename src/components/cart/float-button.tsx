import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import TokiAPI from "lib/api/toki";
import Cart from "lib/types/cart.type";
import { toast } from "lib/utils/helpers";
import { useAppState } from "lib/context/app";
import CountBadge from "components/common/count-badge";

interface FloatButtonProps {
    merchantId: string;
    categoryId: string;
}

const FloatButton: React.FC<FloatButtonProps> = ({
    merchantId,
    categoryId,
}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Cart>();
    const [state, dispatch]: any = useAppState();
    const router = useRouter();

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
                        setData(data.data);
                        dispatch({
                            type: "cartCount",
                            cartCount: data?.data?.total_qty,
                        });
                        dispatch({
                            type: "categoryId",
                            categoryId: categoryId,
                        });
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchDatas();
        }
    }, [merchantId, state.officeId, state.cartCount]);

    return state.cartCount > 0 && !loading ? (
        <Link href={`/cart/${merchantId}?tokenid=${router.query.tokenid}`}>
            <a>
                <div
                    style={{
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50px",
                        backgroundColor: state.themeColor,
                        position: "fixed",
                        bottom: "95px",
                        right: "20px",
                    }}
                >
                    <div
                        className="relative text-2xl"
                        style={{
                            width: "fit-content",
                            height: "fit-content",
                        }}
                    >
                        <span
                            className="text-[20px]  my-cart icon-Shop---Bold-icon-1"
                            style={{ color: "white" }}
                        ></span>
                        {state.cartCount > 0 && (
                            <CountBadge
                                state={state}
                                count={state.cartCount}
                                isMenu={true}
                                customColor="#FFD500"
                            />
                        )}
                    </div>
                </div>
            </a>
        </Link>
    ) : null;
};

export default FloatButton;
