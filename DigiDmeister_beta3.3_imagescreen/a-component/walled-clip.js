function putFront(baseEl, offset) {
  const basePos = baseEl.object3D.position;
  // カメラのZ方向のベクトルを用意
  const forward = new THREE.Vector4(0, 0, offset, 0);
  const forwardTo = forward.applyMatrix4(baseEl.object3D.matrix);
  return { x: basePos.x + forwardTo.x, y: basePos.y, z: basePos.z + forwardTo.z };
}
/**
 * 壁に貼ったクリップのクローンに設定する属性
 * wall : 貼り付けた壁のセレクター
 */
AFRAME.registerComponent('walled-clip', {
  schema: {
    wall: { type: 'selector' },
    moving: { type: 'boolean' },
  },
  init: function () {
    this.frontPos = putFront(this.data.wall, 0.6);
    this.el.setAttribute('position', this.frontPos);
    this.el.setAttribute('rotation', this.data.wall.getAttribute('rotation'));

    this.handling = this.data.moving;
    this.el.addEventListener('click', (event) => {
      // クリックされたら終わり
      if (this.handling) {
        this.el.setAttribute('walled-clip', 'moving', false);
      }
    });

    /**
     * 交差が入った時
     */
    this.el.addEventListener('raycaster-intersected', (evt) => {
      console.log('moving in intersectiond', this.data.moving);
      // this.intersected = this.el;
      this.raycaster = evt.detail.el;
    });

    /**
     * 交差が外れた時
     */
    this.el.addEventListener('raycaster-intersected-cleared', (event) => {
      // this.intersected = null;
      this.raycaster = null;
    });
  },

  tick: function () {
    if (!this.raycaster || !this.handling) return;
    let item = this.raycaster.components.raycaster.getIntersection(this.data.wall);
    if (!item) return;
    let move = item.point.clone();
    this.el.setAttribute('position', move);
    this.el.setAttribute('rotation', this.data.wall.getAttribute('rotation'));
  },

  update: function () {
    this.handling = this.data.moving;
  },
});
