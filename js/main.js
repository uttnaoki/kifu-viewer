const getQuery = () => {
  // クエリが空なら空を返却
  if (window.location.search === "") return;

  const variables = window.location.search.split("?")[1].split("&");
  const obj = {};
  variables.forEach(function (v, i) {
    const variable = v.split("=");
    obj[variable[0]] = variable[1];
  });
  return obj;
}

const appendKifuURLs = (uid) => {
  let url = `https://shogiwars.heroz.jp/users/history/${uid}`;
  url = `https://cors-allow.azurewebsites.net/?url=${url}`;  // corsの問題を回避

  $.ajax({
    url: url,
    cache: false,
    success: (res) => {
      if (!res.length) {
        console.log('将棋ウォーズからHTMLを取得できませんでした。')
      }
      $(res).find('.contents').each((index, val) => {
        const sourceHref = 'https:' + $(val).find('.game_replay').find('a').attr('href');
        const sourceHrefLen = sourceHref.length;
        const kifuURL = 'http://swks.sakura.ne.jp/wars/kifu/' + sourceHref.substring(32, sourceHrefLen-10) + '.kif';
        $('#url_list').append(`<div><a href=${kifuURL}>${kifuURL}</a></div>`)
      })
    }
  });
};

$(document).ready(function () {
  const queries = getQuery();
  
  // クエリにuidがあれば棋譜URL表示処理を実行
  if (queries && 'uid' in queries) {
    appendKifuURLs(queries.uid);
    $('#text_uid').val(queries.uid);
  };
  
  $('#form_uid').submit((e) => {
    e.preventDefault();
    const uid = $('#text_uid').val();
    const baseURL = location.hostname === '127.0.0.1'
      ? `http://${location.host}/`
      : 'https://uttnaoki.github.io/kifu-viewer/'
    window.location.href = `${baseURL}?uid=${uid}`
  })
});