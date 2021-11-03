import icon from "../public/img01.jpg";
import icon02 from "../public/001.png";
import icon03 from "../public/002.png";
import Image from "next/image";
import Layout from "../components/layout/Layout";
import Link from "next/link";

export default function mainIndex() {
  return (
    <Layout title="メシトモ一覧">
      <div className="flex flex-wrap items-center justify-center p-4 bg-white ">
        <div className="flex flex-col items-center m-3">
          <Image
            src={icon}
            alt=""
            className="object-cover rounded-full flex items-center justify-center"
            width="80"
            height="80"
          />
          <p className="font-bold pt-2">鈴木拓也</p>
        </div>
        <div className="flex flex-col items-center m-3">
          <Image
            src={icon02}
            alt=""
            className="object-cover rounded-full flex items-center justify-center"
            width="80"
            height="80"
          />
          <p className="font-bold pt-2">田中博</p>
        </div>
        <div className="flex flex-col items-center m-3">
          <Image
            src={icon03}
            alt=""
            className="object-cover rounded-full flex items-center justify-center"
            width="80"
            height="80"
          />
          <p className="font-bold pt-2">斎藤理恵</p>
        </div>
        <Link href="/main" passHref>
          <button
            type="submit"
            className="text-lg hover:bg-red-700 text-white font-bold py-2 px-16 rounded mt-10"
            style={{ background: "#f00a00" }}
          >
            他の飯トモを探す
          </button>
        </Link>
      </div>
    </Layout>
  );
}
