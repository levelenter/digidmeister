AFRAME.registerComponent('resize', {
  schema: {
    type: { type: 'string' },
  },
  init: function () {
    this.el.addEventListener('click', (event) => {
      const direction = this.data.type === 'up' ? 1 : -1;

      const clipMenu = this.el.parentEl;
      const target = document.querySelector(`#${clipMenu.dataset.clip_id}`);
      console.log('resize target', target);

      target.object3D.scale.x += target.object3D.scale.x * 0.2 * direction;
      target.object3D.scale.y += target.object3D.scale.y * 0.2 * direction;
    });
  },
});
