import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

export default function NavigationPanel({backStatus,next,nextStatus}:{backStatus:boolean,next:string,nextStatus:boolean}) {
    const router = useRouter();
    return (
        <div className="flex justify-between gap-4 mt-8">
          <button disabled={backStatus} 
            onClick={() => router.back()}
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg border border-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </button>
          <button disabled={nextStatus}
            onClick={() => router.push("/"+ next)}
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Next
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
    )
}