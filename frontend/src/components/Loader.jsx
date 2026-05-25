const Loader = () => {

  return (

    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        min-h-[50vh]
        gap-5
      "
    >

      <div className="relative w-16 h-16">

        <div
          className="
            absolute
            inset-0
            rounded-full
            border-2
            border-cyan-500/20
            border-t-cyan-400
            animate-spin
          "
        ></div>

        <div
          className="
            absolute
            inset-2
            rounded-full
            border-2
            border-blue-500/20
            border-t-blue-400
            animate-spin
          "
        ></div>

        <div
          className="
            absolute
            inset-4
            rounded-full
            border-2
            border-teal-500/20
            border-t-teal-400
            animate-spin
          "
        ></div>

      </div>

      <div className="text-center">

        <p
          className="
            text-gray-300
            font-semibold
            text-sm
          "
        >
          Fetching cricket data...
        </p>

        <p
          className="
            text-gray-500
            text-xs
            mt-1
          "
        >
          Just a moment
        </p>

      </div>

    </div>

  );
};

export default Loader;