import * as THREE from "three";

export class FireShader {

  private fragmentShader = `

uniform vec3 iResolution;
uniform float iTime;

float rand(vec2 n) {
    return fract(sin(cos(dot(n, vec2(12.9898,12.1414)))) * 83758.5453);
}

float noise(vec2 n) {
    const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float fbm(vec2 n) {
    float total = 0.0, amplitude = 1.0;
    for (int i = 0; i <10; i++) {
        total += noise(n) * amplitude;
        n += n*.9;
        amplitude *= 0.87;
    }
    return total;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

    const vec3 c1 = vec3(0.5, 0.0, 0.1);
    const vec3 c2 = vec3(0.9, 0.1, 0.0);
    const vec3 c3 = vec3(0.2, 0.1, 0.7);
    const vec3 c4 = vec3(1.0, 0.9, 0.1);
    const vec3 c5 = vec3(0.1);
    const vec3 c6 = vec3(0.9);

    vec2 speed = vec2(0.1, 0.9);
    float shift = 1.327+sin(iTime*2.0)/2.4;
    float alpha = 1.0;

    float dist = 3.5-sin(iTime*0.4)/1.89;

    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 p = fragCoord.xy * dist / iResolution.xx;
    p += sin(p.yx*4.0+vec2(.2,-.3)*iTime)*0.04;
    p += sin(p.yx*8.0+vec2(.6,+.1)*iTime)*0.01;

    p.x -= iTime/20.0;
    float q = fbm(p - iTime * 0.3+1.0*1./2.0);
    float qb = fbm(p - iTime * 0.4+0.1*1./2.0);
    float q2 = fbm(p - iTime * 0.44 - 5.0*1./2.0) - 6.0;
    float q3 = fbm(p - iTime * 0.9 - 10.0*1./15.0)-4.0;
    float q4 = fbm(p - iTime * 1.4 - 20.0*1./14.0)+2.0;
    q = (q + qb - .4 * q2 -2.0*q3  + .6*q4)/3.8;
    vec2 r = vec2(fbm(p + q /2.0 + iTime * speed.x - p.x - p.y), fbm(p + q - iTime * speed.y));
    vec3 c = mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);
    vec3 color = vec3(1.0/(pow(c+1.61,vec3(4.0))) * cos(shift * fragCoord.y / iResolution.y));

    color=vec3(0.2,.9,.0)/(pow((r.y+r.y)* max(.0,p.y)+0.1, 4.0));;
    color = color/(1.0+max(vec3(0),color));
    fragColor = vec4(color.x, color.y, color.z, alpha);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}`;

  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.OrthographicCamera;
  private scene: THREE.Scene;
  private plane: THREE.PlaneBufferGeometry;

  constructor() {
    this.canvas = document.getElementById("FireShaderCanvas") as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.autoClearColor = false;
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1,);
    this.scene = new THREE.Scene();
    this.plane = new THREE.PlaneBufferGeometry(2, 2);
  }

  public uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3() },
  };

  public InitializeBackground(): void {
    const material = new THREE.ShaderMaterial({
      fragmentShader: this.fragmentShader,
      uniforms: this.uniforms,
    });
    material.needsUpdate = true;
    this.scene.add(new THREE.Mesh(this.plane, material));

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    requestAnimationFrame((time) => { this.render(time); });
  }

  private resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, true);
    }
    return needResize;
  }

  private render(time: number) {

    time *= 0.001;  // convert to seconds

    this.resizeRendererToDisplaySize(this.renderer);

    const canvas = this.renderer.domElement;
    this.uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
    this.uniforms.iTime.value = time;

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame((time) => { this.render(time); });
  }

}
