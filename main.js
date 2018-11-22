const url = "https://shogiwars.heroz.jp/users/history/uttnaoki"
$.ajax({
    url: url,
    success: (data) => {
        $(data).find('.contents').each((index, val) => {
            const sourceHref = 'https:' + $(val).find('.game_replay').find('a').attr('href');
            const sourceHrefLen = sourceHref.length;
            console.log(sourceHrefLen)
            const kifuURL = 'http://swks.sakura.ne.jp/wars/kifu/' + sourceHref.substring(32, sourceHrefLen-10) + '.kif';
            $('#url_list').append(`<div><a href=${kifuURL}>${kifuURL}</a></div>`)
        })
    },
});