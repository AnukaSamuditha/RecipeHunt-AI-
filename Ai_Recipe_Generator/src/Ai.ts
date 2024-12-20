import { HfInference } from "@huggingface/inference";


const SYSTEM_PROMPT:string = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. And do not include this phrase 'Sure, I'd be happy to help!' this in the recipe.Also a little description about the recipe should be there`;

const hf:HfInference=new HfInference(import.meta.env.VITE_HF_API_KEY);

export async function getRecipeFromMistral(ingredientsArr:string[]){
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err:any) {
        console.error(err.message)
    }
}