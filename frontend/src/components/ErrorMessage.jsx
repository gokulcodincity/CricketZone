const ErrorMessage = ({
  message,
  onRetry,
}) => {

  return (

    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        min-h-[40vh]
        text-center
        px-6
      "
    >

      <div
        className="
          w-16
          h-16
          rounded-2xl
          bg-red-500/10
          border
          border-red-500/20
          flex
          items-center
          justify-center
          mb-5
        "
      >

        <span className="text-4xl">
          ⚠️
        </span>

      </div>

      <h2
        className="
          text-red-400
          text-2xl
          font-bold
          mb-2
        "
      >
        Something went wrong
      </h2>

      <p
        className="
          text-gray-400
          mb-5
        "
      >
        {message}
      </p>

      {onRetry ? (

        <button
          onClick={onRetry}
          className="
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            px-6
            py-3
            rounded-xl
          "
        >

          Try Again

        </button>

      ) : null}

    </div>

  );
};

export default ErrorMessage;