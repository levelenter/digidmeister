/**
 * クリップ可能なWallをクリックしたら、
 * Wallの前にメニューを出す。
 */
AFRAME.registerComponent('a-clipboard', {
  schema: {
    images: { type: 'selector' },
    menu: { type: 'selector' },
  },
  init: function () {
    // メニューをボードの前に出す
    const board = this.el;
    const menu = this.data.menu;

    this.el.addEventListener('click', (event) => {
      const isVisibleMenu = menu.getAttribute('visible');
      if (isVisibleMenu) {
        menu.object3D.position.y = 1000;
        menu.setAttribute('visible', false);
      } else {
        // メニュー内の画像グループインスタンス
        const imageSelector = this.data.images;
        imageSelector.setAttribute('select-one-image', `wall:#${this.el.id}`);
        const boardPos = board.object3D.position;

        // カメラのZ方向にマイナスのベクトルを用意
        const forward = new THREE.Vector4(0, 0, 4, 0);
        // 現在のカメラの姿勢からZ方向にマイナスのベクトルを探す
        const forwardTo = forward.applyMatrix4(board.object3D.matrix);
        // カメラのXとZに対して、前方向ベクトルをプラスしてセット
        menu.setAttribute('position', { x: boardPos.x + forwardTo.x, y: 1.7, z: boardPos.z + forwardTo.z });
        // メニューを表示
        menu.setAttribute('visible', true);
        menu.object3D.position.y = 1.6;
      }
    });
  },
});
