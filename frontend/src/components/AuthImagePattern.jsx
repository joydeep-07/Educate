const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center  p-12 rounded-r-lg">
      {" "}
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl h-[110px] w-[110px] bg-rose-200 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>{" "}
        <p className="text-gray-600">{subtitle}</p>{" "}
      </div>
    </div>
  );
};

export default AuthImagePattern;
