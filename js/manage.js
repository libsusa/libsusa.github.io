// Behrooz Kamary
// Version 0.5.0

var ongoing = 0;

function menu_display()
{
  $('nav').css('border-top','none');

  // close the drop down-menu if open
  if ($('header button').is(":visible") &&
      $('nav ul li').is(":visible"))
  {
    $('nav').css('width','auto');
    $('nav ul li').css('display','none');
    console.log('close the open menu.');
  }

  //if ($(window).width() > 720)
  if (window.matchMedia('(min-width: 720px)').matches)
  {
    $('nav ul li').css('display','inline');
    console.log('Desktop mode.');
  }
  else
  {
    $('nav ul li').css('display','none');
    console.log('Mobile mode.');
  }
}

function toggle_callback()
{
  if ($('nav ul li').is(":hidden"))
  {
    $('nav').css('width','auto');
  }

  $('header button').disabled = false;
}

function slide_callback()
{
  ongoing--;
}

function menu_button_click()
{
  if (ongoing > 0)
  {
    return;
  }

  $('header button').disabled = true;

  if ($('nav ul li').is(":hidden"))
  { // open
    $('nav').css('border-top','1px solid #404040');
    $('nav').css('width','100%');
    $('article').animate({ 'margin-top' : '360px' }, 'fast', slide_callback);
    ongoing++;
  }
  else
  { // close
    $('nav').css('border-top','none');
    $('article').animate({ 'margin-top' : '100px' }, 'fast', slide_callback);
    ongoing++;
  }

  $('nav ul li').toggle('fast',"swing", toggle_callback);
}

function article_adapter()
{
  $('article').css('margin-left', $(window).width() * 0.1 + 'px');
  $('article').css('margin-right', $(window).width() * 0.1 + 'px');
  $('article').css('margin-top', '100px');
}

$(function()
{
  $('header button').click(menu_button_click);
  menu_display();
  article_adapter();
});

$(window).resize(function()
{
  menu_display();
  article_adapter();
});

function load(page)
{
    $('#article').load('content/' + page + '.html');
    $('nav ul li a').css('color','#aaa');
    $('nav ul li a#' + page).css('color','#00c489');
    menu_display();
    article_adapter();
}

$(document).ready(function() {
  if(window.location.hash) {
      // hash found
      var page = window.location.hash.substring(1);
      console.log('hash : ' + page);
      load(page);
  } else {
      // No hash found
      load('main');
  }

});
