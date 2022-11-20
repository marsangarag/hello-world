import { ClockIcon, LongArrow } from "components/icons";
import { Merchant } from "lib/types/office.type";
import { useRouter } from "next/router";

export default function GreadientMerchantCard({
    merchant,
    page = false,
}: {
    merchant: Merchant;
    page?: boolean;
}) {
    const router = useRouter();
    const onMerchantClick = () => {
        if (!page) {
            router.push(`/merchant/${merchant._id}`);
        } else {
            router.push(`/merchant/details/${merchant._id}`);
        }
    };
    return (
        <div
            onClick={onMerchantClick}
            className="rounded-2xl min-h-[160px] overflow-hidden shadow-delivery relative"
        >
            <img
                src={merchant.logo}
                className="h-40 min-w-full"
                alt={merchant.name}
            />
            <div className="absolute z-20 left-3.75 bottom-3.75 text-white flex flex-col gap-y-1.25 items-start">
                <div className="text-sm">{`${merchant.name} (${merchant.temporary_closed}) 👍 ${merchant.avg_review}`}</div>
                <div className="text-xs font-light flex justify-start gap-x-1.25 items-center">
                    <ClockIcon />
                    {merchant.toki_merchant_id}
                </div>
            </div>
            <div className="absolute h-1/2 w-full bg-gradient-to-b bottom-0 left-0 from-main/0 to-main "></div>
            <div className="absolute text-white z-20 text-smaller top-5 right-0 bg-main/50 backdrop-blur-sm py-1.25 px-2.5 rounded-l-md">
                {merchant.temporary_closed && "Дотоод ажилтай"}
                {!merchant?.is_open && "Хаалттай"}
            </div>
            {page && (
                <div className="absolute right-3.75 bottom-3.75 flex gap-x-2.5 justify-end items-center">
                    <div className="text-xs font-light text-white">
                        Дэлгэрэнгүй
                    </div>
                    <LongArrow />
                </div>
            )}
        </div>
    );
}
