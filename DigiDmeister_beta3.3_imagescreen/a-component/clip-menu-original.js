/**
 * 最大化
 */
AFRAME.registerComponent('clip-menu-original', {
  init: function () {
    // メニューをClipの前に出す
    const menu = this.el.parentEl;
    this.el.setAttribute('visible', false);
    this.el.classList.toggle('collidable');

    this.el.addEventListener('click', (event) => {
      console.log('shrink click');
      const clip = document.querySelector(`#${menu.dataset.clip_id}`);
      const walledClip = clip.getAttribute('walled-clip');
      const wall = walledClip.wall;
      console.log(clip);

      const originalX = clip.dataset.original_x;
      const originalY = clip.dataset.original_y;
      console.log(originalX, originalY);
      clip.setAttribute('scale', `${originalX} ${originalY} 0.05`);

      // 縮小ボタンを隠す
      this.el.setAttribute('visible', false);
      this.el.classList.toggle('collidable');

      // 拡大ボタンを出す
      const max = document.querySelector('[clip-menu-max]');
      max.setAttribute('visible', true);
      max.classList.toggle('collidable');

      // メニューを隠す
      menu.setAttribute('visible', false);
      menu.setAttribute('position', '0 1000 0');
    });
  },
});
