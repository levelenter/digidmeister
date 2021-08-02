/**
 * 貼り付けられたクリップを移動するボタン
 */
AFRAME.registerComponent('clip-menu-move', {
  schema: {
    // menu: { type: 'selector' },
  },
  init: function () {
    // メニューをClipの前に出す
    const menu = this.el.parentEl;

    this.el.addEventListener('click', (event) => {
      // クリップを作成して位置を移動ボタンに合わせる（マウスの位置に移動と同義）
      const clip = document.querySelector(`#${menu.dataset.clip_id}`);
      clip.setAttribute('position', this.el.object3D.getWorldPosition());
      clip.setAttribute('walled-clip', 'moving', true);

      // メニューを隠す
      menu.setAttribute('visible', false);
      menu.setAttribute('position', '0 1000 0');
    });
  },
});
