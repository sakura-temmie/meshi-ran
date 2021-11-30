const Evals = ({ action }) => {
    const evals = [
      { value: "1", label: "リピート確定" },
      { value: "2", label: "また行きたい" },
      { value: "3", label: "まあまあ・普通" },
      { value: "4", label: "多分行かない" },
      { value: "5", label: "2度と行かない" },
    ];
  return (
    <>
      <div className="w-3/4 flex align-center items-center">
        <p className="text-lg">評価：</p>
        <select
          className="appearance-none border-none bg-white text-red-700 mr-3 py-1 px-2 text-xl focus:outline-none"
          onChange={(e) => action(e.target.value)}
        >
          {evals.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Evals
