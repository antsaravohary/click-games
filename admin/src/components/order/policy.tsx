import { Article } from "@ts-types/article-type";
import ReactDOMServer from "react-dom/server";

const Policy = (articles: Article[]) => (
  <div>
    {articles.map((article, idx) => {
      return (
        <div key={idx}>
          <h1>{article.title}</h1>
          {article?.items?.map((item, idxx) => (
            <div key={idxx}>
                <h2>{item.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: item?.content }}></div>
            </div>
          ))}
        </div>
      );
    })}
  </div>
);

const policyHtml = (articles: Article[]) =>
  ReactDOMServer.renderToStaticMarkup(Policy(articles));

export default policyHtml;
