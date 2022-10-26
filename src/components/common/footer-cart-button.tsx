import { formatPrice } from "lib/utils/helpers";
import CountBadge from "components/common/count-badge";

export default function FooterCartButton({ state }: any) {
    return (
        <div className="flex items-center">
            <div className="relative mr-3 text-2xl">
                <span
                    className="text-[20px]  my-cart icon-Shop---Bold-icon-1"
                    style={{ color: state.themeColor }}
                ></span>
                {state.cartCount > 0 && (
                    <CountBadge state={state} count={state.cartCount} />
                )}
            </div>
            <div className="text-base font-medium text-[#1e2335]">
                {formatPrice(state.cartPrice)} ₮
            </div>
        </div>
    );
}
