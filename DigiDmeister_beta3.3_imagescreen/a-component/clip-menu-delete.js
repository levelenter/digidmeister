/**
 * メニューを閉じる
 */
AFRAME.registerComponent('clip-menu-delete', {
  init: function () {
    // メニューをClipの前に出す
    const menu = this.el.parentEl;

    this.el.addEventListener('click', (event) => {
      const clip = document.querySelector(`#${menu.dataset.clip_id}`);
      clip.remove();

      // メニューを隠す
      menu.setAttribute('visible', false);
      menu.setAttribute('position', '0 1000 0');
    });
  },
});
