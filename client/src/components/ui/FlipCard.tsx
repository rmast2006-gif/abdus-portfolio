type FlipCardProps = {
  frontImage: string;
  backImage: string;
};

const FlipCard = ({ frontImage, backImage }: FlipCardProps) => {
  // fallback images (temporary safety, will be replaced by admin panel later)
  const fallbackFront =
    "https://via.placeholder.com/300x400?text=Front+Image";
  const fallbackBack =
    "https://via.placeholder.com/300x400?text=Back+Image";

  return (
    <div className="group w-64 h-80 perspective hover:scale-105 transition duration-300">

      <div
        className="relative w-full h-full duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] transform-style preserve-3d group-hover:rotate-y-180"
      >

        {/* FRONT */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl">
          <img
            src={frontImage || fallbackFront}
            alt="Front"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* BACK */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={backImage || fallbackBack}
            alt="Back"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* OPTIONAL OVERLAY (for future text / admin content) */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      </div>

    </div>
  );
};

export default FlipCard;