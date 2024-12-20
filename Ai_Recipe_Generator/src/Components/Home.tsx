import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { CircleAlert } from "lucide-react";
import { getRecipeFromMistral } from "../Ai";
import Recipe from "./Recipe";

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [recipe,setRecipe]=useState<string|undefined>("");
  const [isGenerating,setGenerating]=useState<boolean>(false);



  function handleIngredients(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if(inputText===''){
        toast.error("No ingredient to add!", {
            icon: <CircleAlert size={18} color="red" />,
            className: "rounded-xl bg-[#cecec4] text-zinc-800 border-none   ",
          });
    }

    if (inputText !== "") {

      setIngredients((prevIngredients) => {
        return [...prevIngredients, inputText];
      });
    }

    setInputText("");
  }

  function handleInputText(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setInputText(value);
  }

  async function getRecipe() {


    if (ingredients.length === 0) {
      toast.error("Add ingredients to get started!", {
        icon: <CircleAlert size={18} color="red" />,
        className: "rounded-xl bg-[#cecec4] text-zinc-800 border-none   ",
      });

      return;
    }

    if (ingredients.length < 3) {
      toast.error("Add at least three ingredients to proceed!", {
        icon: <CircleAlert size={18} color="red" />,
        className: "rounded-xl bg-[#cecec4] text-zinc-800 border-none   ",
      });
    }

    setGenerating((prev)=>!prev);

    try{
        const response=await getRecipeFromMistral(ingredients);
        setRecipe(response);
    }catch(error){
        toast.error("Failed to fetch recipe. Please try again!", {
            icon: <CircleAlert size={18} color="red" />,
            className: "rounded-xl bg-[#cecec4] text-zinc-800 border-none",
        });
    }finally{
        setGenerating(false);
    }
    
  }

  
  return (
    <div className="w-full h-auto flex flex-col justify-center items-start">
      <Toaster />

      <div className="w-full h-auto flex justify-center items-center">
        <form className="lg:w-[50%] w-[90%]  mt-20" onSubmit={handleIngredients}>
          <div className="w-full flex justify-center items-center gap-4">
            <input
              type="text"
              name="inputText"
              value={inputText}
              onChange={handleInputText}
              placeholder="Add ingredients here..."
              className="h-[3rem] lg:w-[70%] w-[60%] p-5 border border-[#585756] text-white rounded-xl bg-transparent active:border-none"
            />
            <button className="rounded-full z-[100] bg-white text-black h-[3rem] shadow-2xl p-5 flex justify-center items-center lg:text-sm text-xs font-semibold tracking-tighter">
              + Add Ingredient
            </button>
          </div>
        </form>
      </div>
      <div className={`w-full lg:h-auto absolute  pointer-events-none top-20 opacity-40 `}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          href="http://www.w3.org/1999/xlink"
          viewBox={`0 0 1500 ${isGenerating || recipe ? '1950' : '800'}`}
          className="w-full h-full"
        >
          <defs>
            <filter
              id="nnnoise-filter"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              colorInterpolationFilters="linearRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.128"
                numOctaves="4"
                seed="15"
                stitchTiles="stitch"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                result="turbulence"
              ></feTurbulence>
              <feSpecularLighting
                surfaceScale="29"
                specularConstant="0.7"
                specularExponent="20"
                lightingColor="#ffffff"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="turbulence"
                result="specularLighting"
              >
                <feDistantLight azimuth="3" elevation="130"></feDistantLight>
              </feSpecularLighting>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="transparent"></rect>
          <rect
            width="100%"
            height="100%"
            fill="#ffffff"
            filter="url(#nnnoise-filter)"
          ></rect>
        </svg>
      </div>
      <div className="w-full flex justify-center items-center mt-10 lg:mt-16">
        <div className="lg:w-[50%] w-[60%] flex flex-col justify-center items-start p-5">
          <h1 className="text-white font-semibold tracking-tighter text-2xl w-full">
            Ingredients on hand:
          </h1>
          <ul className="w-full list-disc p-5">
            {ingredients.length === 0 ? (
              <h5 className="text-white font-semibold tracking-tight text-center">
                No ingredients yet.
              </h5>
            ) : (
              ingredients.map((item) => (
                <li key={item} className="text-white font-medium p-2">
                  {item}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="z-[100] w-full h-[8rem] flex justify-center items-center  ">
        <div className="lg:w-[45%] w-[90%] h-full flex justify-center items-center lg:gap-12 gap-6 bg-[#ddddd8] rounded-2xl">
          <div className="w-[50%] flex flex-col justify-center items-left">
            <h1 className="text-black text-lg font-semibold tracking-tighter">
              Ready for a recipe?
            </h1>
            <p className="text-zinc-600 text-sm font-medium tracking-tighter">
              Generate a recipe from your list of ingredients.
            </p>
          </div>
          <button
            onClick={getRecipe}
            className={`h-[2.5rem] whitespace-nowrap p-5 rounded-full text-white font-medium text-sm flex justify-center items-center shadow-lg active:scale-95 active:duration-200 active:ease-in-out ${isGenerating ? 'bg-gray-400 cursor-not-allowed': 'bg-orange-400'}`}
          >
            {isGenerating ? "Generating..." : "Get a recipe"}
          </button>
        </div>
      </div>

      <div className="w-full h-auto flex justify-center items-center mt-20">
        <div className="lg:w-[45%] w-[90%] flex flex-col justify-center items-start">
          <h1 className="text-white font-semibold tracking-tighter leading-none text-left text-xl">
            Suggested Recipe:
          </h1>
          {isGenerating && <Recipe response={recipe}/>}
          {recipe && <Recipe response={recipe}/>}
        </div>
      </div>
    </div>
  );
}
