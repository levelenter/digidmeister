AFRAME.registerComponent('lookat', {
  schema: { target: { type: 'selector' } },
  init: function () {
    console.log('lookat init', this.data.target);
  },
  tick: function () {
    this.el.object3D.lookAt(this.data.target.object3D.position);
  },
});
