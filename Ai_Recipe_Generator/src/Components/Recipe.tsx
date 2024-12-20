import ReactMarkdown from "react-markdown";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type RecipeProp = {
    response:string|undefined
}

export default function Recipe({response}:RecipeProp){

    

    return(
        <section className="w-full h-auto mt-5 text-white">
        {/* <ReactTyped  typeSpeed={10}> */}
     {response ? <ReactMarkdown components={{
      ul: ({ node, ...props }) => <ul className="list-disc ml-5" {...props} />,
      ol: ({ node, ...props }) => <ol className="list-decimal ml-5 font-medium" {...props} />,
      li: ({ node, ...props }) => <li className="mt-3 font-medium" {...props} />,
      p:({node,...props})=> <p className="mb-3 mt-3 text-justify font-semibold" {...props}/>,
      
    }}>{response}</ReactMarkdown> : (
        <div>
            <p><Skeleton height={20} width={`100%`} /></p>
            <p><Skeleton height={20} width={`45%`} /></p>
            <p className="mt-4 mb-4"><Skeleton height={20} width={`50%`} /></p>
            <ul>
                <li><Skeleton height={20} width={`65%`} /></li>
                <li><Skeleton height={20} width={`65%`} /></li>
                <li><Skeleton height={20} width={`65%`} /></li>
                <li><Skeleton height={20} width={`65%`} /></li>
                <li><Skeleton height={20} width={`65%`} /></li>
            </ul>
            <p className="mt-4 mb-3"><Skeleton height={20} width={`50%`} /></p>
            <ol className="mb-4">
                <li><Skeleton height={20} width={`85%`} /></li>
                <li><Skeleton height={20} width={`85%`} /></li>
                <li><Skeleton height={20} width={`85%`} /></li>
                <li><Skeleton height={20} width={`85%`} /></li>
                <li><Skeleton height={20} width={`85%`} /></li>
                <li><Skeleton height={20} width={`85%`} /></li>
            </ol>
            <p ><Skeleton height={20} width={`100%`} /></p>
            <p ><Skeleton height={20} width={`100%`} /></p>
            <p ><Skeleton height={20} width={`45%`} /></p>
        </div>

    )
    }
    </section>
    )

}