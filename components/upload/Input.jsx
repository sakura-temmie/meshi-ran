const Input = ({title, placeholder, action}) => {
  return (
      <div
        className="mb-2 w-3/4 py-2 flex"
        style={{ borderBottom: "solid #f00a00 1px" }}
      >
        <p className="appearance-none border-none text-red-700 mr-3 py-1 px-2 focus:outline-none">
          {title}
        </p>
        <input
          className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder={placeholder}
          style={{ fontSize: "16px" }}
          onChange={(e) => action(e.target.value)}
        />
      </div>
  );
};

export default Input;
