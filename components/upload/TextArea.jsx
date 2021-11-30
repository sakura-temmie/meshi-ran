const TextArea = ({action}) => {
  return (
      <div className="mb-4 w-3/4">
        <textarea
          className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="6"
          style={{ border: "solid #f00a00 1px", fontSize: "16px" }}
          placeholder="コメント(150字以内)"
          onChange={(e) => action(e.target.value)}
        />
      </div>
  );
}

export default TextArea
