import { ClockIcon } from "components/icons";
import { Merchant } from "lib/types/office.type";

export default function GreadientMerchantCard({
    merchant,
}: {
    merchant: Merchant;
}) {
    return (
        <div className="rounded-2xl overflow-hidden shadow-merchant-card relative">
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
        </div>
    );
}
