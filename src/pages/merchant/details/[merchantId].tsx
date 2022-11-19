import CategoryTitle from "components/common/category-title";
import { useAppState } from "lib/context/app";
import { Merchant } from "lib/types/office.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MerchantDetailPage() {
    const router = useRouter();
    const merchantId = router.query.merchantId;
    const [state]: any = useAppState();
    const { merchants } = state;
    const [merchant, setMerchant] = useState<Merchant>();
    useEffect(() => {
        const merchant = merchants?.find(
            (merchant: Merchant) => merchant._id === merchantId
        );
        setMerchant(merchant);
    }, []);

    return (
        <>
            {merchant && (
                <div className="p-5 flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-3.75">
                        <CategoryTitle title="Танилцуулга" />
                        <div className="flex gap-x-[1px] overflow-x-scroll scrollbar-hide -mx-5 px-5">
                            <img
                                src={`${merchant.logo}`}
                                alt={merchant.name}
                                className="w-[83px] h-[83px] rounded-md"
                            />
                        </div>
                        <div className="flex flex-col gap-y-5 font-light text-justify">
                            <div>
                                Өдөр болгон шинэ махаар эрүүл цэвэрхэн орчинд
                                бэлтгэсэн Монгол үндэсний хоолоор үйлчилж байна
                            </div>
                            <div>
                                {merchant.contact_number && (
                                    <div>Утас: {merchant.contact_number}</div>
                                )}
                                <div>Утас: 77001234</div>
                                <div>Имэйл: info@domain.name</div>
                                <div>Facebook: @facebook.id </div>
                                <div>Instagram: @instagram.id</div>
                                <div>Веб хуудас: www.domain.name</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
