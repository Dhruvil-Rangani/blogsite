export const BlogSkeleton = () => {
    return <div role="status" className="animate-pulse">
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
                <div className="font-light pl-2 text-sm flex justify-center flex-col">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>

                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <span className="pl-2 text-slate-600 ">&#183;</span>
                <div className="font-thin pl-2 text-slate-500 text-sm flex justify-center flex-col">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
            </div>
            <div className="text-xl font-bold mt-2">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-md font-normal mt-1">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
        </div>
        <span className="sr-only">Loading...</span>
    </div>
}