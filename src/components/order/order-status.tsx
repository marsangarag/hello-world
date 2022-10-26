import { Status } from "lib/types/order.type";

interface OrderStatusProps {
    status: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => (
    <span
        className={`
            ${
                status === Status.PREPARED ||
                status === Status.DELIVERING ||
                status === Status.COMPLETED
                    ? "bg-[#B8EF8F]"
                    : "bg-[#FAD175]"
            }  text-xs inline-block py-[5px] px-[14px] leading-none text-center align-baseline text-gray-700 rounded-xl h-fit`}
    >
        {status === Status.PAYMENT_PENDING
            ? "Төлбөр хүлээж байна"
            : status === Status.PAID
            ? "Захиалагдсан"
            : status === Status.PREPARING
            ? "Бэлтгэж байна"
            : status === Status.PREPARED
            ? "Бэлэн болсон"
            : status === Status.DELIVERING
            ? "Хүргэгдэж байна"
            : status === Status.COMPLETED
            ? "Биелсэн"
            : status === Status.CANCELLED
            ? "Цуцлагдсан"
            : ""}
    </span>
);

export default OrderStatus;
