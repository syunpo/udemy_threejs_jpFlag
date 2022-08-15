// シェーダーで使う修飾子たち
// attribute : 頂点情報などを入れる。頂点の位置を決めるための座標。色とかも。
// uniform : グローバル変数を入れる。vertexでもflagmentでも共通して使う変数に対して定義する。
// ↑マウスの操作や、時間とともに形を変えたりする場合に、時間をuniformで定義したりする。
// varing : VertexShaderからFragmentShaderに変数を渡すときに使う。

// ↓↓↓RawShaderMaterialを使用するときは下記3つを要定義
// uniform mat4 projectionMatrix;
// →カメラがどこからどこまでの領域を写すのかを決めるための行列。
// uniform mat4 viewMatrix;
// →モデルを写すためのカメラの位置を決めるための行列。
// uniform mat4 modelMatrix;
// →モデルの位置を決めるための行列。位置、大きさ、回転等
// attribute vec3 position;
// →x, y, zの3次元ベクトル
// ↑↑↑RawShaderMaterialを使用するときは上記3つを要定義


// float a = 1.0;
// float b = 2.0;
// float c = a + b;
// →float:浮動小数点
// →glslはC言語と似ている
// →型を必ず定義する必要がある。floatとかintとか

uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // modelPosition.x += 0.3;
    float elevation = sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
    // modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
    // modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;

    modelPosition.z += elevation;

    // modelPosition.y *= 0.6;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    // →りんごは3次元空間に存在するが、コンピュータ画面は2次元空間。
    // 3次元に存在する物体を2次元空間に写すために「座標変換」が必要になるので、3つの行列をかけている。
    // vec4:4次元ベクトル

    vUv = uv;
    vElevation = elevation;
}