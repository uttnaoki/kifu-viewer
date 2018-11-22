const appendKifuURLs = (uid) => {
  let url = `https://shogiwars.heroz.jp/users/history/${uid}`;
  url = `http://cors-allow.azurewebsites.net/?url=${url}`;  // corsの問題を回避

  $.ajax({
    url: url,
    cache: false,
    success: (data) => {
      $(data).find('.contents').each((index, val) => {
        const sourceHref = 'https:' + $(val).find('.game_replay').find('a').attr('href');
        const sourceHrefLen = sourceHref.length;
        const kifuURL = 'http://swks.sakura.ne.jp/wars/kifu/' + sourceHref.substring(32, sourceHrefLen-10) + '.kif';
        $('#url_list').append(`<div><a href=${kifuURL}>${kifuURL}</a></div>`)
      })
    },
  });
};

appendKifuURLs('uttnaoki');