export default function DeliveryType({
    setDeliveryType,
}: {
    deliveryType: string;
    setDeliveryType: any;
}) {
    return (
        <div
            onChange={(event: any) => setDeliveryType(event.target.value)}
            className="flex justify-start items-center gap-x-5 text-sm"
        >
            <div className="flex items-center gap-x-2.5">
                <input
                    defaultChecked
                    type="radio"
                    name="typeofdelivery"
                    id="deliver"
                    value="deliver"
                />
                <label htmlFor="deliver">Хүргүүлэх</label>
            </div>
            <div className="flex items-center gap-x-2.5">
                <input
                    type="radio"
                    name="typeofdelivery"
                    id="takeout"
                    value="takeout"
                />
                <label htmlFor="takeout">Очиж авах</label>
            </div>
        </div>
    );
}
