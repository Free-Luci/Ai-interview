const FloatingImage = ({ src, alt }) => {
  return (
    <div className="relative mt-10 w-80 float-slow group">
      <img
        src={src}
        alt={alt}
        className="
          rounded-xl
          transition-all
          duration-300
          group-hover:scale-[1.04]
          group-hover:-translate-y-1
          group-hover:shadow-2xl
        "
      />
    </div>
  );
};

export default FloatingImage;
