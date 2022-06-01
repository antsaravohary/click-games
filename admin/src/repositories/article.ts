import { CreateArticle, UpdateArticle } from "@ts-types/article-type";
import Base from "./base";

class Article extends Base<CreateArticle, UpdateArticle> {}

export default new Article();
