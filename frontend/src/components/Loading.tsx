import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Spinner className="size-14" />
    </div>
  );
};

export default Loading;
