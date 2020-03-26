// var Url = 'http://172.20.10.4/laf/';
var Url = 'http://172.20.10.3/laf/';
// var Url = 'http://localhost/laf/';
module.exports = {
  //拾金不昧主页查询
  indexQuery: Url + 'index.do',
  //拾金不昧主页标签列表查询
  indexByTag: Url + 'indexbytag.do',
  //拾金不昧主页单条详情查询
  QueryOne: Url + 'queryone.do',
  //我发表的拾物招领删除功能
  Delete: Url + 'delete.do',
  //我发表的拾物招领修改状态功能
  Update: Url + 'update.do',
  //我发表的拾物招领查询
  MinePush: Url + 'minepush.do',
  //发表拾物招领
  Push: Url + 'push.do',


  //丢三落四发表失物寻找
  Search: Url + 'search.do',
  //丢三落四主页标签列表查询
  Search_indexByTag: Url + 'search-indexbytag.do',
  //丢三落四主页查询
  Search_indexQuery: Url + 'search-index.do',
  //丢三落四主页单条详情查询
  Search_QueryOne: Url + 'search-queryone.do',
  //我发表的失物查询
  MineSearch: Url + 'search-minepush.do',
  //我发表的失物删除功能
  Search_Delete: Url + 'search-delete.do',
  //我发表的失物修改状态功能
  Search_Update: Url + 'search-update.do',

  //登录注册
  LoginOn: Url + 'userlogin.do',
  Register:Url + 'userregister.do'
}