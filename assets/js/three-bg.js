// three-bg.js - Drone Swarm Particle System
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded.');
        return;
    }

    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    // Use a deep dark blue/black background
    scene.background = new THREE.Color(0x020205);
    scene.fog = new THREE.FogExp2(0x020205, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Particles (Drones)
    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x00f0ff); // Cyan
    const color2 = new THREE.Color(0x8a2be2); // Purple
    const color3 = new THREE.Color(0xff00ff); // Magenta

    for (let i = 0; i < particleCount; i++) {
        // Positions spread in a cylinder/sphere shape
        const r = 200 + Math.random() * 300;
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + (Math.random() * 100 - 50);
        positions[i * 3 + 2] = r * Math.cos(phi);

        // Colors Mix
        const mixedColor = new THREE.Color();
        const rand = Math.random();
        if (rand < 0.33) mixedColor.copy(color1);
        else if (rand < 0.66) mixedColor.copy(color2);
        else mixedColor.copy(color3);

        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;

        sizes[i] = Math.random() * 2 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom Shader Material for Glowing Dots
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 }
        },
        vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            void main() {
                vColor = color;
                vec3 pos = position;
                // Add slight floating motion
                pos.y += sin(time + pos.x * 0.05) * 5.0;
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            void main() {
                // Circular soft particle
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                float alpha = (0.5 - dist) * 2.0;
                // Core is brighter
                vec3 finalColor = mix(vColor, vec3(1.0), alpha * 0.5);
                gl_FragColor = vec4(finalColor, alpha * 0.8);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        
        const time = clock.getElapsedTime();
        material.uniforms.time.value = time;

        targetX = mouseX * 0.1;
        targetY = mouseY * 0.1;

        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;

        // Interactive camera movement
        camera.position.x += (mouseX - camera.position.x) * 0.02;
        camera.position.y += (-mouseY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        // Light mode integration
        if (document.documentElement.classList.contains('light-mode')) {
            scene.background.setHex(0xf0f0f5);
            scene.fog.color.setHex(0xf0f0f5);
            material.blending = THREE.NormalBlending; // Adjust blending for light background
        } else {
            scene.background.setHex(0x020205);
            scene.fog.color.setHex(0x020205);
            material.blending = THREE.AdditiveBlending;
        }

        renderer.render(scene, camera);
    }

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
