// precision mediump float;
// →RawShaderMaterialを使用しているので要記述
// →データをどれだけ詳細に精密に決めるのか
// →highup, mediump等、精密度が異なる。

uniform vec3 uColor; //r, g, b
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;


void main(){
    vec4 textureColor = texture2D(uTexture, vUv);
    // gl_FragColor = vec4(uColor,  1.0);
    // →(r, g, b, α) αは透明度
    textureColor.rgb *= vElevation * 2.5 + 0.7;
    gl_FragColor = textureColor;
}