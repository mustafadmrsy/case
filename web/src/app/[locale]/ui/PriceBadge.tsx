type Props = {
    value: number;
    className?: string;
};

export default function PriceBadge({ value, className = "" }: Props) {
    return (
        <p className={`inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-0.5 text-sm shadow-sm ${className}`}>
            <span className="font-semibold tracking-tight">${value}</span>
        </p>
    );
}


