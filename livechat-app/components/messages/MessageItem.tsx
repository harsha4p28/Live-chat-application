type Props = {
  text: string;
  isOwn: boolean;
  time: string;
};

export default function MessageItem({ text, isOwn, time }: Props) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} px-2`}>
      <div
        className={`relative px-4 py-2 rounded-2xl max-w-xs sm:max-w-sm text-sm shadow-sm ${
          isOwn
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-zinc-200 text-zinc-900 rounded-bl-none"
        }`}
      >
        <div className="break-words">{text}</div>

        <div
          className={`mt-1 text-[10px] flex ${
            isOwn ? "justify-end text-white/70" : "justify-end text-zinc-500"
          }`}
        >
          {time}
        </div>
      </div>
    </div>
  );
}