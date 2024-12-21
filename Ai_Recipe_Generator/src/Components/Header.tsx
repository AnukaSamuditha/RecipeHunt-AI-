import { ChefHat } from "lucide-react";

export default function Header() {
  return (
    <div className="w-full fixed h-[5rem] flex justify-center items-center gap-4 shadow-md bg-[#161614] z-[200]">
      <ChefHat className="text-orange-400" />
      <h1 className="text-orange-400 font-semibold text-2xl tracking-tight">
        Recipe Hunt
      </h1>
    </div>
  );
}
