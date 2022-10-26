import { Item } from "lib/types/order-detail";
import { formatPrice } from "lib/utils/helpers";

interface OrderCardProps {
    item: Item;
}

const OrderCard: React.FC<OrderCardProps> = ({ item }) => (
    <div className="flex items-center py-3">
        <div className=" w-[50px] shrink-0">
            <img
                src={item.product.image}
                alt={item.product.name}
                className="w-[50px] h-[50px] object-cover rounded-2xl"
            />
        </div>
        <div className="flex flex-grow ml-5 ">
            <div className="flex-grow mr-3 ">
                <div className="break-all text-md text-slate-700">
                    {item.product.name}
                </div>
                <div className="text-sm font-light text-right break-normal text-[#647382] flex">
                    {item.product_variant.options &&
                        item.product_variant.options.map(
                            (option: any, index: number) => (
                                <p key={index} className="mr-2">
                                    {option.value}
                                </p>
                            )
                        )}
                </div>
            </div>
            <div className="shrink-0">
                <p className="text-right text-md text-slate-700">
                    {formatPrice(item.price)} ₮
                </p>

                <p className="text-sm font-light text-right break-normal text-[#647382]">
                    x{item.qty}
                    {item.is_cancelled && " (Цуцлагдсан)"}
                </p>
            </div>
        </div>
    </div>
);

export default OrderCard;
