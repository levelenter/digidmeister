AFRAME.registerComponent('click-sound', {
  schema: {
    src: { type: 'string' },
  },
  init: function () {
    // this.interactiveAnimations();
    this.el.addEventListener('click', (e) => {
      const createSound = function (point, sound_src) {
        const sound = document.createElement('a-entity');
        sound.setAttribute('position', point);
        console.log(sound_src);
        sound.setAttribute('sound', `src: ${sound_src}; autoplay: true`);
        return sound;
      };
      const point = e.detail.intersection.point;
      const sound = createSound(point, this.data.src);

      const scene = this.el.sceneEl;
      scene.appendChild(sound);
      setTimeout(function () {
        scene.removeChild(sound);
      });
    });
  },
  interactiveAnimations: function () {
    this.el.setAttribute('animation__mouseenter', 'property: scale; to: 1.5 1.5 1.5; startEvents: mouseenter; dur: 200');
    this.el.setAttribute('animation__mouseleave', 'property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200');
    this.el.setAttribute('animation__click', 'property: scale; to: 3 3 3; startEvents: click; dur:200');
  },
});
