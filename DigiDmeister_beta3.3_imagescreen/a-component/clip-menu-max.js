/**
 * 最大化
 */
AFRAME.registerComponent('clip-menu-max', {
  init: function () {
    // メニューをClipの前に出す
    const menu = this.el.parentEl;

    // 拡大ボタンを表示
    this.el.setAttribute('visible', true);

    this.el.addEventListener('click', (event) => {
      console.log('max');
      const clip = document.querySelector(`#${menu.dataset.clip_id}`);
      const walledClip = clip.getAttribute('walled-clip');
      const wall = walledClip.wall;

      const mesh = wall.getObject3D('mesh');
      if (!mesh) return;
      const originScale = clip.getAttribute('scale');
      clip.setAttribute('data-original_x', originScale.x);
      clip.setAttribute('data-original_y', originScale.y);

      // 取得したメッシュの最大値を取得
      const modelFullBox = new THREE.Box3().setFromObject(mesh);

      const src = clip.getAttribute('material', 'src');
      console.log('src:', src);
      if (src.width) {
        const x = modelFullBox.max.x - modelFullBox.min.x;
        const y = modelFullBox.max.y - modelFullBox.min.y;
        const aspectY = x * (src.height / src.width);
        console.log('aspectY', aspectY);
        clip.setAttribute('scale', { x: x, y: aspectY, z: 0.1 });
      } else {
        const x = modelFullBox.max.x - modelFullBox.min.x;
        const y = modelFullBox.max.y - modelFullBox.min.y;
        clip.setAttribute('scale', { x: x, y: y, z: 0.1 });
      }

      // 拡大ボタンを隠す
      this.el.setAttribute('visible', false);
      this.el.classList.toggle('collidable');

      // 縮小ボタンを出す
      const min = document.querySelector('[clip-menu-original]');
      min.setAttribute('visible', true);
      min.classList.toggle('collidable');

      // メニューを隠す
      menu.setAttribute('visible', false);
      menu.setAttribute('position', '0 1000 0');
    });
  },
});
