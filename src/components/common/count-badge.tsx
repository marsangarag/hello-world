export default function FooterCartButton({
    state,
    count,
    isCategory = false,
    isMenu = false,
    customColor = "",
}: any) {
    return (
        <span
            className={`absolute top-0  ${
                isCategory
                    ? "right-[16px]"
                    : isMenu
                    ? "right-[-5px] top-[-5px]"
                    : "right-0"
            } transform rounded-full translate-x-[60%] translate-y-[-30%] min-w-[20px] h-[20px] text-white text-[10px] p-0 m-0 leading-loose text-center border border-white z-20 !font-light`}
            style={{
                backgroundColor: customColor ? customColor : state.themeColor,
            }}
        >
            {count}
        </span>
    );
}
