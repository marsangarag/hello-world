interface OverlayProps {
    isOfficeList: boolean;
}

const Overlay: React.FC<OverlayProps> = ({ isOfficeList }) => {
    return (
        <div
            className={` ${
                isOfficeList ? "m-[-20px] fixed h-[100vw] " : "absolute h-full"
            } w-full overflow-auto scrollbar-hide bg-black z-50 bg-opacity-25 rounded-[10px]`}
        />
    );
};

export default Overlay;
