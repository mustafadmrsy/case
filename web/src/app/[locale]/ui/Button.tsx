type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "danger";
};

const base = "inline-flex items-center justify-center rounded text-sm px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-offset-0";

const variants: Record<NonNullable<Props["variant"]>, string> = {
    primary: "bg-purple-600 text-white hover:bg-purple-500 focus:ring-purple-500",
    ghost: "border border-white/20 hover:bg-white/10",
    danger: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500",
};

export default function Button({ variant = "primary", className = "", ...rest }: Props) {
    return <button className={`${base} ${variants[variant]} ${className}`} {...rest} />;
}


