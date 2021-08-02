/**
 * メニュー上で画像リストにつける属性。
 * 複数のうち1つを選択することでクリップをボードにクローンする。
 * メニューの配下に設定する
 * target: Wallのセレクター
 */
AFRAME.registerComponent('select-one-image', {
  schema: {
    wall: { type: 'selector' },
  },
  init: function () {
    const menu = this.el.parentEl;
    const images = Array.from(this.el.children);
    images.forEach((element) => {
      // サブエレメントの一つにフォーカスが入ったときのイベントを設定
      element.addEventListener('raycaster-intersected', (event) => {
        // 選ばれていれば不透明、選ばれていなければ半透明
        images.forEach((i) => i.setAttribute('opacity', i === event.target ? 1 : 0.3));
      });

      // サブエレメントがクリックされたら
      element.addEventListener('click', (event) => {
        // エレメントと一致するターゲットを取得
        const found = images.find((i) => i === event.target);
        if (!found) return;

        // 選ばれた資料のクローンを作り、シーンにクローンを追加
        const clone = this.getCloneClip(found, this.data.wall.id);
        this.el.sceneEl.append(clone);

        // メニューを非表示にして超上空に飛ばす
        menu.setAttribute('visible', false);
        menu.setAttribute('position', '0 1000 0');
      });
    });
  },

  update: function () {
    console.log('select-one-image update', this.data.target);
  },

  getCloneClip: function (clip, wallId) {
    // クリップのクローンを作る
    const clone = clip.cloneNode();
    // 日時時間からIDを作成
    clone.id = `clip${new Date().getTime()}`;
    // 透明度を１に
    clone.setAttribute('opacity', 1);
    // 壁に沿って移動する属性walled-clipを追加
    clone.setAttribute('walled-clip', `wall:#${wallId}`);
    // クリップをクリックした時にサイズメニューを表示する属性を追加
    clone.setAttribute('clip-menu', `menu:#clip_menu;`);
    // クリップはクリック可能にする
    clone.setAttribute('class', 'collidable');
    // サイズを大きくしておかないとクリック領域が極小になる（TODO:元画像のアスペクト比から生成）
    clone.setAttribute('scale', '2 1 0.01');
    return clone;
  },
});
