export interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div
      className={`flex h-20 w-20 items-center justify-center  border-8 border-solid border-primary text-primary ${className}`}
    >
      <span className="text-[2.7rem] font-sans font-black">DS</span>
    </div>
  );
}
