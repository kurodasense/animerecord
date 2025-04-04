const jwt = require("jsonwebtoken");
const config = require("../config");
function createJWT() {
  const payload = { user_name: config.USERNAME };
  const token = jwt.sign(payload, "1-1-4-5-1-4");
  return token;
}

function verifyJWT(token) {
  const decoded = jwt.verify(token, "1-1-4-5-1-4");
  if (decoded.user_name === config.USERNAME) return true;
  else return false;
}

// 基于 google custom search 搜索图片
async function searchImageByGoogle(query, num) {
  try {
    // 构建请求 URL
    const url = new URL("https://customsearch.googleapis.com/customsearch/v1");
    url.searchParams.append("q", query);
    url.searchParams.append("key", config.KEYAPI);
    url.searchParams.append("cx", config.SEARCH_ENGINE_ID);
    url.searchParams.append("searchType", "image");
    url.searchParams.append("num", num);

    // 使用 fetch API 发起请求
    const response = await fetch(url.toString());

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // 检查是否有结果
    if (data.items && data.items.length > 0) {
      return data.items[0].link;
    } else {
      throw new Error("No images found for the given query");
    }
  } catch (error) {
    console.error("Error searching for images:", error);
    throw error;
  }
}

module.exports = {
  createJWT,
  verifyJWT,
  searchImageByGoogle
};
