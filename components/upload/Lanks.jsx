
const Lanks = ({ action }) => {
  const lanks = [
    { value: "1", label: "★★★★★" },
    { value: "2", label: "★★★★☆" },
    { value: "3", label: "★★★☆☆" },
    { value: "4", label: "★★☆☆☆" },
    { value: "5", label: "★☆☆☆☆" },
    { value: "6", label: "☆☆☆☆☆" },
  ];

  return (
    <>
      <div className="flex mb-4 w-3/4">
        <span className="text-lg align-text-bottom self-end">評価：</span>
        <select
          className="self-center appearance-none border-none text-yellow-600 bg-white text-5xl focus:outline-none"
          onChange={(e) => action(e.target.value)}
        >
          {lanks.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Lanks;
