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
    $('article').animate({ 'margin-top' : '380px' }, 'fast', slide_callback);
    ongoing++;
  }
  else
  { // close
    $('nav').css('border-top','none');
    $('article').animate({ 'margin-top' : '200px' }, 'fast', slide_callback);
    ongoing++;
  }

  $('nav ul li').toggle('fast',"swing", toggle_callback);
}

function article_adapter()
{
  $('article').css('margin-top', '200px');
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
    window.location.hash = page;
    
    $('#article').fadeOut('fast', function () {
      $(this).load(`content/${page}.html`, function (response, status, xhr) {
        if (status === "success") {
          $(this).fadeIn('slow');
        } else {
          $(this).html(`<p>Error loading content.</p>`).fadeIn();
        }
      });
    });

    $('nav ul li a').css('color','var(--text-primary)');
    $('nav ul li a#' + page).css('color','var(--golden)');
    menu_display();
    article_adapter();
    window.scrollTo(0, 0)
}

$(function() {
  $('nav').on('click', 'a[href^="#"]', function(e) {
    e.preventDefault();
    const pageId = $(this).attr('id');
    load(pageId);
  });

  const initialPage = window.location.hash ? window.location.hash.substring(1) : 'main';
  load(initialPage);
});
