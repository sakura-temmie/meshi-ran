import Layout from "../../components/layout/Layout";
import Image from "next/image";
import icon from "../../public/img01.jpg";
import i_01 from "../../public/01.jpeg";
import i_02 from "../../public/02.jpg";
import i_03 from "../../public/03.jpeg";
import i_04 from "../../public/04.jpg";
import i_05 from "../../public/test01.jpg";
import i_06 from "../../public/test02.jpeg";
import i_07 from "../../public/test03.jpg";
import i_08 from "../../public/test04.jpeg";
import i_09 from "../../public/test05.jpg";
import i_010 from "../../public/test06.jpeg";

const top = () => {
  return (
    <Layout title="山田花子さんのメシラン">
      <div className="flex items-center justify-between px-5 bg-white mt-2">
        <Image
          src={icon}
          alt=""
          className="object-cover rounded-full justify-center z-0"
          width="60"
          height="60"
        />
        <p className="font-bold text-lg">山田花子</p>
        <p
          className="text-white font-bold p-2 rounded"
          style={{ background: "#f00a00" }}
        >
          Lv.5
        </p>
        <div className="flex ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <p className="mx-3 mt-1 text-gray-500">よくいく地域：東京都中央区</p>
      <p className="mx-3 mt-1 text-base">
        週末は外食が多いです。寿司と焼肉のために生きています。よろしくお願いいたします。
      </p>
      <ul className="flex overflow-x-auto mt-2">
        <li
          className="flex-none w-2/5 text-center text-white text-bold py-1"
          style={{ background: "#f00a00" }}
        >
          人生ベスト１０
        </li>
        <li
          className="flex-none w-2/5 text-center text-white text-bold py-1"
          style={{ background: "#f00a00" }}
        >
          焼肉
        </li>
        <li
          className="flex-none w-2/5 text-center text-white text-bold py-1"
          style={{ background: "#f00a00" }}
        >
          寿司
        </li>
        <li
          className="flex-none w-2/5 text-center text-white text-bold py-1"
          style={{ background: "#f00a00" }}
        >
          和食
        </li>
        <li
          className="flex-none w-2/5 text-center text-white text-bold py-1"
          style={{ background: "#f00a00" }}
        >
          イタリアン
        </li>
      </ul>
      <Image
        src={i_01}
        alt=""
        className="w-full object-cover object-center"
        width="450"
        height="450"
      />

      <div className="flex ">
        <Image
          src={i_02}
          alt=""
          width="150"
          height="150"
          className="w-1/3 object-cover object-center"
        />
        <Image
          src={i_03}
          alt=""
          width="150"
          height="150"
          className="w-1/3 object-cover object-center"
        />
        <Image
          src={i_04}
          alt=""
          width="150"
          height="150"
          className="w-1/3 object-cover object-center"
        />
      </div>
      <div className="flex w-full">
        <Image
          src={i_05}
          alt=""
          width="150"
          height="150"
          className="w-1/3 object-cover object-center"
        />
        <Image
          src={i_06}
          alt=""
          width="150"
          height="150"
          className="w-1/3 object-cover object-center"
        />
        <Image
          src={i_07}
          alt=""
          width="150"
          height="150"
          className="w-1/3 object-cover object-center"
        />
      </div>
      <div className="flex w-full">
        <Image
          src={i_08}
          alt=""
          width="150"
          height="150"
          className="w-1/3 object-cover object-center"
        />
        <Image
          src={i_09}
          alt=""
          width="150"
          height="150"
          className="w-1/3 object-cover object-center"
        />
        <Image
          src={i_010}
          alt=""
          width="150"
          height="150"
          className="w-1/3 object-cover object-center"
        />
      </div>
    </Layout>
  );
};

export default top;
