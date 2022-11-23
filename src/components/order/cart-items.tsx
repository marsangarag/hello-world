import { HomeIcon } from "components/icons";
import { formatPrice } from "lib/utils/helpers";

export function CartItems({ items }: { items?: any }) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-delivery flex flex-col gap-y-5 text-sm">
            {items?.map((place: any) => {
                return (
                    <div
                        key={place.place}
                        className="flex flex-col gap-y-2.5 border-b pb-5 border-gray border-dashed last:border-solid"
                    >
                        <div className="flex items-center gap-x-2.5">
                            <HomeIcon />
                            <div className="font-medium">{place.place}</div>
                        </div>
                        {place.items.map((product: any) => {
                            return (
                                <div
                                    key={product.name}
                                    className="flex justify-between items-start"
                                >
                                    <div className="flex flex-col gap-y-1.25">
                                        <div>{product.name}</div>
                                        <div className="text-gray font-light">
                                            {product.comment
                                                ? `${product.portion} (${product.comment})`
                                                : product.portion}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-y-1.25">
                                        <div>
                                            {formatPrice(
                                                product.qty * product.price
                                            )}{" "}
                                            ₮
                                        </div>
                                        <div className="text-gray font-light">
                                            {product.portion}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-2.5">
                    <div>Захиалгын дүн:</div>
                    <div>Хүргэлтийн төлбөр:</div>
                    <div className="font-medium">Нийт төлөх:</div>
                </div>
                <div className="flex flex-col items-end gap-y-2.5">
                    <div>{formatPrice(20500)} ₮</div>
                    <div>{formatPrice(1500)} ₮</div>
                    <div className="font-medium">{formatPrice(22000)} ₮</div>
                </div>
            </div>
        </div>
    );
}
