/**
 * メニューを閉じる
 */
AFRAME.registerComponent('clip-menu-close', {
  init: function () {
    // メニューをClipの前に出す
    const menu = this.el.parentEl;

    this.el.addEventListener('click', (event) => {
      // メニューを隠す
      menu.setAttribute('visible', false);
      menu.setAttribute('position', '0 1000 0');
    });
  },
});
