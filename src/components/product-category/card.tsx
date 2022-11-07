import Image from "next/image";

export function CategoryCard({
    category,
}: {
    category: { title: string; img: string };
}) {
    const { title, img } = category;
    return (
        <div className="flex flex-col items-center gap-y-1.25">
            <Image
                src={`/images/${img}`}
                alt={img}
                width={72.5}
                height={72.5}
                className="rounded-md object-cover"
            />
            <div className="text-xs">{title}</div>
        </div>
    );
}
