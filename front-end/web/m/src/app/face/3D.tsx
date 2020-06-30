import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import * as THREE from '@/lib/three';
import {MTLLoader} from '@/lib/three/examples/jsm/loaders/MTLLoader';
import {OBJLoader} from '@/lib/three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from '@/lib/three/examples/jsm/controls/OrbitControls';
import {getQueryString} from '@fay-react/lib/router';
import {PATH_PREFIX} from '@/env';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: "relative"
  },
  canvas: {
    width: '100%',
    height: '500px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingProcess:{
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '30px',
    textAlign: 'center',
    width: '100%',
    fontSize: '20px'
  }
}));

export default () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [process, setProcess] = React.useState('0%');
  const ref = React.useRef<any>();

  const loadFace = React.useCallback(() => {
    const id = getQueryString('id');
    // let object: any;
    const container = ref.current!;
    // let mouseX = 0, mouseY = 0;
    // let windowHalfX = window.innerWidth / 2;
    // let windowHalfY = window.innerHeight / 2;
    const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    // camera.position.z = 250;
    console.log(container.clientWidth);
    console.log(container.clientHeight);
    const camera = new THREE.PerspectiveCamera( 45, container.clientWidth / container.clientHeight, 1, 2000 );
    camera.position.z = 500;
    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );
    // scene.background = new THREE.Color( 0x3f51b5 );

    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );
    scene.add( camera );

    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize( window.innerWidth, window.innerHeight );

    // document.body.appendChild( renderer.domElement );
    // ref.current!.appendChild(renderer.domElement);
    // var geometry = new THREE.BoxGeometry();

    // const loadModel = () => {
    //   object.traverse( function ( child: any ) {
    //     if ( child.isMesh ) child.material.map = texture;
    //   } );
    //   object.position.y = - 95;
    //   scene.add( object );
    // }
    // var manager = new THREE.LoadingManager( loadModel );
    // manager.onProgress = function ( item, loaded, total ) {
    //   console.log( item, loaded, total );
    // };
    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load( '/face/'+id+'/tex.jpg' );
    const onProgress = ( xhr: any ) => {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        if(Math.round( percentComplete )===100){
          setLoading(false);
        }
        setProcess(Math.round( percentComplete ) + '%');
        console.log( 'model ' + Math.round( percentComplete ) + '% downloaded' );
      }
    }
    const onError = () => {};

    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    mtlLoader.load('/face/'+id+'/face.mtl', function(materials) {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load( '/face/'+id+'/face.obj', ( obj ) => {
        obj.traverse( function ( child: any ) {
          if ( child.isMesh ) child.material.map = texture;
        } );
        // obj.position.y = - 95;
        scene.add( obj );
      }, onProgress, onError );
    });
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( container.devicePixelRatio );
    renderer.setSize( container.clientWidth, container.clientHeight );
    container.appendChild( renderer.domElement );

    var controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 5;
    controls.maxDistance = 2000;

    // let mouse = new THREE.Vector2();

    // function onWindowResize() {

    //   windowHalfX = window.innerWidth / 2;
    //   windowHalfY = window.innerHeight / 2;

    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();

    //   renderer.setSize( window.innerWidth, window.innerHeight );

    // }

    // function onDocumentMouseMove( event: any ) {
    //   mouseX = ( event.clientX - windowHalfX ) / 2;
    //   mouseY = ( event.clientY - windowHalfY ) / 2;
    // }

    const onDocumentMouseMove = ( event: any ) => {
      event.preventDefault();
      // mouseX = ( event.clientX / container.clientWidth ) * 2 - 1;
      // mouseY = - ( event.clientY / container.clientHeight ) * 2 + 1;

    }

    const onWindowResize = () => {

      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( container.clientWidth, container.clientHeight );

    }

    function animate() {
      requestAnimationFrame( animate );
      render();
    }
    function render() {
      // camera.position.x += ( mouseX - camera.position.x ) * .05;
      // camera.position.y += ( - mouseY - camera.position.y ) * .05;
      // camera.lookAt( scene.position );
      renderer.render( scene, camera );
    }
    animate();
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
  },[]);

  React.useEffect(() => {
    loadFace();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.canvas} ref={ref}/>
      <div className={classes.loading} style={{display: loading?"block":"none"}}>
        <img src={PATH_PREFIX + "/static/customized/face.gif"} width="100%" height="100%"/>
      </div>
      <div className={classes.loadingProcess} style={{display: loading?"block":"none"}}>人脸模型加载中...{process}</div>
    </div>
  )
}