var canvas = document.querySelector('#c');



const vertexShaderSource = `
attribute vec2 a_position;

  uniform vec2 u_resolution;

  void main() {
    vec2 zeroToOne = a_position / u_resolution;

    vec2 zeroToTwo = zeroToOne * 2.0;

    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace, 0, 1);
  }
`

const fragmentShaderSource = `
  precision mediump float;
 
  void main() {
    gl_FragColor = vec4(1, 0, 0.5, 1);
  }
`

var gl = canvas.getContext('webgl');
if (!gl) {
    console.log('webgl이 없어요!');
} else {
    console.log('webgl이 있어요^^');
}

function createShader(gl, shaderType, source) {
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
 
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
 
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

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

var program = createProgram(gl, vertexShader, fragmentShader);

var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

var positionBuffer = gl.createBuffer();

// WebGL은 global bind point에 있는 많은 WebGL 자원을 조작하게 해줍니다. bind point는 WebGL 안에 있는 내부 전역 변수라고 생각하시면 되는데요. 먼저 bind point에 자원을 할당합시다. 그러면 모든 함수가 bind point를 통해 자원을 참조합니다. 그럼 position buffer를 할당해봅시다.
// gl.ARRAY_BUFFER가 전역변수(bind point 중 하나?)인듯.
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// 2D point 3개
var positions = [
  10, 20,
  80, 20,
  10, 30,
  10, 30,
  80, 20,
  80, 30,
];
gl.bufferData(
  gl.ARRAY_BUFFER,
  // GLSL은 강타입 언어이므로 positions에게 변수 유형을 부여해야함.
  new Float32Array(positions),
  gl.STATIC_DRAW
);

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

// // 잠깐 주석처리 했다.
resizeCanvasToDisplaySize(gl.canvas);

// clip space를 어떻게 screen space로 변환하는지 webGL에게 알려줘야 함.
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// 캔버스 지우기
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// program(shader 쌍) 사용 지시
gl.useProgram(program);

// 위에서 설정한 버퍼에서 데이터를 가져와 shader의 attribute에 제공하는 방법을 WebGL에 알려줘야 하는데요. 우선 attribute를 활성화해야 합니다.
gl.enableVertexAttribArray(positionAttributeLocation);

var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

// position buffer 할당
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
gl.drawArrays(primitiveType, offset, count);

// canvas는 실제로 색칠되는 픽셀 수
// display는 어떻게 볼건지? => canvas 픽셀 수보다 display 픽셀 수가 많으면 이미지가 깨져서 보임
