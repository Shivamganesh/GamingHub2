import Image from "next/image";

export default function JumpingBallRunnerPage() {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <Image
        src="/images/gamic1.JPG"
        alt="Jumping Ball Runner Game Preview"
        width={480}
        height={270}
        className="rounded-2xl shadow-xl mb-6 border-4 border-accent"
        priority
      />
      {/* ...rest of your game page content... */}
    </div>
  );
}
