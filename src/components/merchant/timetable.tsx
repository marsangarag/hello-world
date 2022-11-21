import CategoryTitle from "components/common/category-title";
import { Timetable } from "lib/types/office.type";

export default function MerchantTimetable({
    timetable,
}: {
    timetable: Timetable[];
}) {
    return (
        <div className="flex flex-col gap-y-3.75">
            <CategoryTitle title="Цагийн хуваарь" />
            <div className="bg-white rounded-2xl text-center grid grid-cols-3 text-sm gap-[1px]">
                <div className="p-2.5 border-b border-r border-gray/10">
                    Гараг
                </div>
                <div className="p-2.5 border-b border-r border-gray/10">
                    Хүргэлт
                </div>
                <div className="p-2.5 border-b border-gray/10">Очиж авах</div>
                <div className="p-2.5 border-r border-gray/10 flex flex-col gap-y-2.5">
                    <div>Даваа - Баасан</div>
                    <div>Бямба</div>
                    <div>Ням</div>
                </div>
                {/* Хүргэлт */}
                <div className="p-2.5 border-r border-gray/10 flex flex-col gap-y-2.5">
                    <div>11:30 - 14:00</div>
                    <div>Амарна</div>
                    <div>Амарна</div>
                </div>
                {/* Очиж авах */}
                <div className="p-2.5 flex flex-col gap-y-2.5">
                    <div>09:00 - 21:00</div>
                    <div>10;00 - 20:00</div>
                    <div>Амарна</div>
                </div>
            </div>
        </div>
    );
}
