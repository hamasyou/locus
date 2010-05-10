// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
function openWin(url) {
  var win = new Window("cart", {
              url:       url,
              title:     "L.A.W Cart",
              className: "alphacube",
              width:     640, 
              height:    420,
              zIndex:    100,
              resizable: true,
              draggable: true
            });
  win.setDestroyOnClose();
  win.showCenter(true);
}