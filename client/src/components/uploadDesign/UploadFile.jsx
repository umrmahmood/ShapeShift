import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../../styling/uploadFile.css";

const STLViewer = () => {
	const [stlFile, setStlFile] = useState(null);
	const mount = useRef(null);

	useEffect(() => {
		if (!stlFile) return;

		const loader = new STLLoader();
		loader.load(URL.createObjectURL(stlFile), (geometry) => {
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.1,
				1000
			);
			const renderer = new THREE.WebGLRenderer();

			const width = 800;
			const height = 400;
			renderer.setSize(width, height);
			mount.current.appendChild(renderer.domElement);

			const controls = new OrbitControls(camera, renderer.domElement);
			controls.addEventListener("change", () => {
				renderer.render(scene, camera);
			});

			const gridTexture = new THREE.TextureLoader().load(
				"path/to/grid_texture.png"
			); // Replace 'path/to/grid_texture.png' with the path to your grid texture image
			scene.background = gridTexture;

			const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Ambient light
			scene.add(ambientLight);

			const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Directional light
			directionalLight.position.set(1, 1, 1);
			scene.add(directionalLight);

			// const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Keep intensity at 1
			// directionalLight.position.set(0, 0, 1); // Change the position to illuminate the object evenly
			// directionalLight.castShadow = true; // Enable shadow casting if needed
			// // Set shadow properties if needed
			// directionalLight.shadow.mapSize.width = 1024; // default
			// directionalLight.shadow.mapSize.height = 1024; // default
			// directionalLight.shadow.camera.near = 0.5; // default
			// directionalLight.shadow.camera.far = 500; // default
			// scene.add(directionalLight);

			const material = new THREE.MeshPhongMaterial({ color: 0x2194ce });
			const mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);

			camera.position.z = 5;

			const animate = () => {
				requestAnimationFrame(animate);
				controls.update();
				renderer.render(scene, camera);
			};

			animate();
		});
	}, [stlFile]);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setStlFile(file);
	};

	return (
		<div>
			<input type="file" accept=".stl" onChange={handleFileChange} />
			<div ref={mount} className="stl-container"></div>
		</div>
	);
};

export default STLViewer;
