import {Article} from '../models/article.js';

async function getArticle(req, res) {
  // console.log(req.params);
  try {
    const article = await Article.findOne({day: req.params.day});
    if (!article) {
      return res.status(404).send('Article not found');
    }
    res.send(article);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}
export {getArticle};