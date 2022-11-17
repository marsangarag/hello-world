import { useAppState } from "lib/context/app";
import { Merchant } from "lib/types/office.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MerchantPage() {
    const router = useRouter();
    const merchantId = router.query.merchantId;
    const [state]: any = useAppState();
    const { merchants } = state;
    const [merchant, setMerchant] = useState<Merchant>();
    useEffect(() => {
        const merchant = merchants.find(
            (merchant: Merchant) => merchant._id === merchantId
        );
        setMerchant(merchant);
    }, []);
    console.log(merchant);

    return <div className="h-screen"></div>;
}
