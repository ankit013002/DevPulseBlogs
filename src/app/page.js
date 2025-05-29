import { getArticles } from "@/action/getArticles";
import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/components/articleCard";

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="mt-[1%] w-[100%] h-[100%]">
      {articles.map((article, index) => {
        console.log(article.link);
        return (
          <div className="width-[100%]" key={index}>
            <Link href={`/article/${article.link}`}>
              <ArticleCard cardInfo={article} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
