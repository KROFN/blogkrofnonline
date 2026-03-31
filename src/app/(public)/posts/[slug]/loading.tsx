export default function LoadingPostPage() {
  return (
    <main className="mx-auto max-w-[1280px] px-4 pb-24 pt-28 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[760px] animate-pulse">
        <div className="h-3 w-28 rounded-full bg-white/10" />
        <div className="mt-8 h-16 w-4/5 rounded-[28px] bg-white/10" />
        <div className="mt-5 h-8 w-3/5 rounded-[18px] bg-white/8" />
        <div className="mt-10 h-14 w-full rounded-[22px] bg-white/8" />
        <div className="mt-12 aspect-[16/10] w-full rounded-[28px] bg-white/8" />
        <div className="mt-14 space-y-4">
          <div className="h-5 w-full rounded-full bg-white/8" />
          <div className="h-5 w-[92%] rounded-full bg-white/8" />
          <div className="h-5 w-[88%] rounded-full bg-white/8" />
          <div className="h-5 w-[94%] rounded-full bg-white/8" />
        </div>
      </div>
    </main>
  );
}
