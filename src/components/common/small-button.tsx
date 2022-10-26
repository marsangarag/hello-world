import { useAppState } from "lib/context/app";
import Spin from "./spin";

export default function SmallButton({
    text,
    onClick,
    type = "button",
    loading = false,
    isFull = false,
}: any) {
    const [state]: any = useAppState();

    return (
        <button
            disabled={loading}
            onClick={onClick}
            type={type}
            className={`flex items-center justify-center p-1 px-3 text-xs font-medium text-white rounded-[10px] ${
                isFull && `w-full`
            } ${loading && `!bg-gray-400`} cursor-pointer`}
            style={{ backgroundColor: state.themeColor }}
        >
            {loading && (
                <span className="mr-1">
                    <Spin size={4} />
                </span>
            )}
            {text}
        </button>
    );
}
