"use strict"

//초기화 코드
let canvas = document.querySelector("#c");

let gl = canvas.getContext("webgl");
if (!gl)
{
	console.log("webGl이 없어요")
}

const vertexShaderSource = `
attribute vec2 a_position;
uniform vec2 u_resolution;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;

void main() {
	// 위치를 픽셀에서 0.0과 1.0사이로 변환
	vec2 zeroToOne = a_position / u_resolution;

	// 0->1에서 0->2로 변환
	vec2 zeroToTwo = zeroToOne * 2.0;

	// 0->2에서 -1->+1로 변환 (clip space)
	vec2 clipSpace = zeroToTwo - 1.0;

	gl_Position = vec4(clipSpace * vec2(1,-1), 0, 1);
  v_texCoord = a_texCoord;
}`

const fragmentShaderSource = `
// Fragment shader는 기본 정밀도를 가지고 있지 않으므로 하나를 선택해야 합니다.
// mediump은 좋은 기본값으로 "중간 정밀도"를 의미합니다.
precision mediump float;

// 텍스처
uniform sampler2D u_image;

// Vertex shader에서 전달된 texCoords
varying vec2 v_texCoord;

void main() {
  // 텍스처의 색상 탐색
  gl_FragColor = texture2D(u_image, v_texCoord);
}`


function main() {
  let image = new Image();
  image.src = "./assets/pig_head.png";
  image.onload = function() {
    render(image);
  }
}
function render(image){
  function createShader(gl, shaderType, sourceCode) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);

    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  let program = createProgram(gl, vertexShader, fragmentShader);
  let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  let colorUniformLocation = gl.getUniformLocation(program, "u_color");
  let positionBuffer = gl.createBuffer();
  var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 랜더링 코드
  function resizeCanvasToDisplaySize(canvas) {
    // 브라우저가 캔버스를 표시하고 있는 크기를 CSS 픽셀 단위로 얻어옵니다.
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // 캔버스와 크기가 다른지 확인합니다.
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;

    if (needResize) {
      // 캔버스를 동일한 크기가 되도록 합니다.
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
    return needResize;
  }

  resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  // console.log(gl.canvas.width);
  // console.log(gl.canvas.height);
  // 캔버스 지우기
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // program(shader 쌍) 사용 지시
  gl.useProgram(program);
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  gl.enableVertexAttribArray(positionAttributeLocation);
  // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // positionBuffer(ARRAY_BUFFER)의 데이터를 꺼내오는 방법을 attribute에 지시
  var size = 2;          // 반복마다 2개의 컴포넌트
  var type = gl.FLOAT;   // 데이터는 32bit float
  var normalize = false; // 데이터 정규화 안 함
  var stride = 0;        // 0 = 다음 위치를 가져오기 위해 반복마다 size * sizeof(type) 만큼 앞으로 이동
  var offset = 0;        // 버퍼의 처음부터 시작

  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0, 0,
      image.width, 0,
      0, image.height,
      0, image.height,
      image.width, 0,
      image.width, image.height,
    ]),
    gl.STATIC_DRAW
  );

  //텍스쳐 코드
  let texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
  let texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0
    ]),
    gl.STATIC_DRAW
  );

  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  // 텍스처 생성
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // 어떤 크기의 이미지도 렌더링할 수 있도록 매개변수 설정
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // 텍스처에 이미지 업로드
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

main();