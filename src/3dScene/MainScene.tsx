import { Component, createEffect } from "solid-js";
import * as THREE from "three";

const WIDTH_MARGIN = 0;
const HEIGHT_MARGIN = 6;

export const MainScene: Component = () => {
  createEffect(() => {
    const screenWidth =
      (document.documentElement.clientWidth ||
        window.innerWidth ||
        document.body.clientWidth) - WIDTH_MARGIN;
    const screenHeight =
      (document.documentElement.clientHeight ||
        window.innerHeight ||
        document.body.clientHeight) - HEIGHT_MARGIN;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth, 1, 1000);
    camera.position.setZ(96);

    const canvas = document.getElementById("myThreeJsCanvas");

    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
    });

    const updateRendererSize = () => {
      renderer.setSize(screenWidth, screenHeight);
      camera.aspect = screenWidth / screenHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", updateRendererSize);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    const animate = () => {
      boxGeometry.rotateX(0.01);
      boxGeometry.rotateY(0.01);
      boxGeometry.rotateZ(0.01);
      renderer.clear();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    updateRendererSize();
    animate();
  });

  return <canvas id="myThreeJsCanvas" />;
};
