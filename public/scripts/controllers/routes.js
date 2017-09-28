'use strict';

page('/', ()=>{});
page('/about', ()=>{});
page('/the-mons', ()=>{});
page('/type/:monType', ()=>{});
page();

(function populateNav(){
  let routes = [
    {route: '/', name: 'Home'},
    {route: '/about', name: 'About'},
    {route: '/the-mons', name: 'All'},
  ];
  let render = Handlebars.compile($('#nav-item-template').html())
  $('nav ul').append(routes.map(render))
})()
