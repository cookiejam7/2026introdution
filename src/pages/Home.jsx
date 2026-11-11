import stadium from "../assets/stadium.jpg";
import stadium2 from "../assets/stadium2.png";
import shin1 from "../assets/shin001.jpg";
import shin2 from "../assets/shin002.jpg";
import shin3 from "../assets/shin003.png";
import shin4 from "../assets/shin004.gif";
import shin5 from "../assets/shin005.gif";
import shin6 from "../assets/shin006.gif";
import { useEffect, useState } from "react";
import useThemeStore from "../store/themeStore";
import ThemeButton from "../components/ThemeButton";

function Home() {
  const [visible, setVisible] = useState(false);

  const theme = useThemeStore((state) => state.theme);

  const cardStyle = `rounded-xl p-6 shadow transition-colors duration-0 ${
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
  }`;

  // 랜덤 명언 API 관련 상태
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [translatedQuote, setTranslatedQuote] = useState("");

  // 랜덤 명언을 가져오는 함수

  async function getQuote() {
    setLoading(true);
    setError(null);
    setTranslatedQuote("");

    try {
      // 1. 랜덤 영어 명언 가져오기
      const response = await fetch("https://dummyjson.com/quotes/random");

      if (!response.ok) {
        throw new Error("명언 요청 실패");
      }

      const data = await response.json();
      setQuote(data);

      // 2. 영어 명언을 한국어로 번역
      const translateResponse = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          data.quote,
        )}&langpair=en|ko`,
      );

      if (!translateResponse.ok) {
        throw new Error("번역 요청 실패");
      }

      const translatedData = await translateResponse.json();

      if (translatedData.responseStatus !== 200) {
        throw new Error("번역에 실패했습니다.");
      }

      // 3. 번역 결과 저장
      setTranslatedQuote(translatedData.responseData.translatedText);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setVisible(true);
    getQuote();
  }, []);

  return (
    <div
      className={`min-h-screen bg-cover bg-center transition-all duration-0 ${
        visible ? "opacity-100" : "opacity-0"
      } ${
        theme === "dark"
          ? "bg-gray-950 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
      style={{
        backgroundImage: `url(${theme === "dark" ? stadium2 : stadium})`,
      }}
    >
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-10">
        <div className="flex justify-end">
          <ThemeButton />
        </div>
        {/* 자기소개 */}
        <div className={cardStyle}>
          <h1 className="text-2xl font-bold">이승민</h1>

          <p className="mt-3">
            멋쟁이사자처럼 14기 아기사자
            <br />
            인천대학교 산업경영공학과
          </p>
        </div>

        {/* 기술스택 */}
        <div className={cardStyle}>
          <h1 className="text-2xl font-bold">기술스택</h1>

          <ul className="mt-3 space-y-2">
            <li>HTML / CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Vite</li>
          </ul>
        </div>

        {/* Next Stack */}
        <div className={cardStyle}>
          <h1 className="text-2xl font-bold">Next Stack</h1>

          <ul className="mt-3 space-y-2">
            <li>Tailwind CSS</li>
            <li>Jamovi</li>
            <li>Python</li>
          </ul>
        </div>

        {/* 랜덤 명언 API */}
        <div className={cardStyle}>
          <h1 className="text-2xl font-bold">오늘의 명언</h1>

          <div
            className={`mt-4 rounded-lg p-5 text-center ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {loading ? (
              <p>명언을 불러오는 중...</p>
            ) : (
              <>
                {quote && (
                  <>
                    <p className="text-lg font-bold">
                      {translatedQuote || quote.quote}
                    </p>

                    <p
                      className={`mt-3 text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      원문: {quote.quote}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      - {quote.author}
                    </p>
                  </>
                )}

                {error && <p className="mt-3 text-red-500">{error}</p>}
              </>
            )}
          </div>

          <button
            onClick={getQuote}
            disabled={loading}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "불러오는 중..." : "다른 명언 보기"}
          </button>
        </div>

        {/* 갤러리 */}
        <div className={cardStyle}>
          <h1 className="text-2xl font-bold">갤러리</h1>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <img
              src={shin1}
              alt="shin1"
              className="aspect-square w-full rounded-lg object-cover"
            />

            <img
              src={shin2}
              alt="shin2"
              className="aspect-square w-full rounded-lg object-cover"
            />

            <img
              src={shin3}
              alt="shin3"
              className="aspect-square w-full rounded-lg object-cover"
            />

            <img
              src={shin4}
              alt="shin4"
              className="aspect-square w-full rounded-lg object-cover"
            />

            <img
              src={shin5}
              alt="shin5"
              className="aspect-square w-full rounded-lg object-cover"
            />

            <img
              src={shin6}
              alt="shin6"
              className="aspect-square w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
