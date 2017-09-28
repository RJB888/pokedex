'use strict';

page('/', app.homeController.index);
page('/about', ()=>{});
page('/mons', ()=>{});
page('/mons/:id', ()=>{});
page('/type/:monType', ()=>{});
page();

(function populateNav(){
  let routes = [
    {route: '/', name: 'Home'},
    {route: '/about', name: 'About'},
    {route: '/mons', name: 'All'},
  ];
  let render = Handlebars.compile($('#nav-item-template').html())
  $('nav ul').append(routes.map(render))
})()
