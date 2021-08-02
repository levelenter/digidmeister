/**
 * 貼り付けられたクリップのクローンがクリックされた時に動作する
 */
AFRAME.registerComponent('clip-menu', {
  schema: {
    menu: { type: 'selector' },
  },
  init: function () {
    // メニューをClipの前に出す
    const clip = this.el;
    const menu = this.data.menu;

    this.el.addEventListener('click', (event) => {
      const isVisibleMenu = menu.getAttribute('visible');
      menu.setAttribute('data-clip_id', this.el.id);
      console.log(menu.dataset.clip_id + ':' + this.el.id);
      if (isVisibleMenu) {
        menu.object3D.position.y = 1000;
        menu.setAttribute('visible', false);
      } else {
        // クリップの位置特定
        const clipPos = clip.object3D.position;
        // カメラのZ方向にマイナスのベクトルを用意
        const forward = new THREE.Vector4(0, 0, 4, 0);
        // 現在のカメラの姿勢からZ方向にマイナスのベクトルを探す
        const forwardTo = forward.applyMatrix4(clip.object3D.matrix);
        // カメラのXとZに対して、前方向ベクトルをプラスしてセット
        menu.setAttribute('position', { x: clipPos.x + forwardTo.x, y: 1.7, z: clipPos.z + forwardTo.z });
        // メニューの向きをクリップに合わせる
        menu.setAttribute('rotation', clip.getAttribute('rotation'));
        // メニューを表示
        menu.setAttribute('visible', true);
        menu.object3D.position.y = 1.6;
      }
    });
  },
});
