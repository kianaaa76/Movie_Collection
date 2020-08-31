export function showToast(text) {
  global.App.toast.show(text);
}

export function getTagsId(tagsList) {
  var tagsId = [];
  tagsList.map(tag => {
    switch (tag.trim()) {
      case "action":
        tagsId.push(5218);
        break;
      case "adventure":
        tagsId.push(5219);
        break;
      case "fantasy":
        tagsId.push(5220);
        break;
      case "sci-fi":
        tagsId.push(5221);
        break;
      case "thriller":
        tagsId.push(5222);
        break;
      case "documentary":
        tagsId.push(5223);
        break;
      case "romance":
        tagsId.push(5224);
        break;
      case "animation":
        tagsId.push(5225);
        break;
      case "comedy":
        tagsId.push(5226);
        break;
      case "family":
        tagsId.push(5227);
        break;
      case "musical":
        tagsId.push(5228);
        break;
      case "mystery":
        tagsId.push(5229);
        break;
      case "western":
        tagsId.push(5230);
        break;
      case "drama":
        tags.push(5231);
        break;
      case "history":
        tagsId.push(5232);
        break;
      case "sport":
        tagsId.push(5233);
        break;
      case "crime":
        tagsId.push(5234);
        break;
      case "horror":
        tagsId.push(5235);
        break;
      case "war":
        tagsId.push(5236);
        break;
      case "biography":
        tagsId.push(5237);
        break;
      case "music":
        tagsId.push(5238);
        break;
      case "game-show":
        tagsId.push(5239);
        break;
      case "reality-tv":
        tagsId.push(5240);
        break;
      case "news":
        tagsId.push(5241);
        break;
      case "short":
        tagsId.push(5242);
        break;
      case "film-noir":
        tagsId.push(5243);
        break;
      case "director":
        tagsId.push(5244);
        break;
      case "actor":
        tagsId.push(5245);
        break;
      default:
        break;
    }
  });
  return tagsId;
}
