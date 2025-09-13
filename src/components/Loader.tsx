import { Loader2 } from "lucide-react";

const Loader = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-green-500" />
      <p className="text-gray-400 text-lg font-medium">{message}</p>
    </div>
  );
};

export default Loader;
