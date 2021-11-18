import Head from "next/head";
import Link from "next/link";

//childrenはインポート先でラップしてる全てのコンテンツが入ってくる
//titleはLayoutが呼び出された時にページから特定のタイトルを受け取る
export default function Layout({ children, title }) {
  return (
    <div className="flex font-sans justify-center w-full item-center flex-col min-h-screen text-gray-600 text-sm font-mono relative">
      <Head>
        {/* プロップスで渡された値を動的に受け取る */}
        <title>{title}</title>
      </Head>
      <body className="flex flex-col min-h-screen w-full">
        <div
          className="text-center p-2 sticky top-0 z-10 w-full"
          style={{ background: "#f00a00" }}
        >
          <p className="font-bold text-white text-lg">{title}</p>
        </div>
        <main
          className="justify-center item-center flex-grow pb-12 m-auto w-full"
          // style={{ width: "414px" }}
        >
          {children}
        </main>
        <footer className="text-center p-2 absolute bottom-0 w-full bg-gray-100 flex justify-between px-6 sticky bottom-0">
          <Link href="/main" passHref>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8" fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            >
              <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
          <Link href="/map" passHref>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link href="/main/upload" passHref>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Link>
          <Link href="/friends" passHref>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </Link>
          <Link href="/main/ranking" passHref>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Link>
        </footer>
      </body>
    </div>
  );
}
