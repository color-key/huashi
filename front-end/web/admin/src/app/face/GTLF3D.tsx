import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import * as THREE from '@/lib/three';
import {DRACOLoader} from '@/lib/three/examples/jsm/loaders/DRACOLoader';
import {GLTFLoader} from '@/lib/three/examples/jsm/loaders/GLTFLoader';
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
    const container = ref.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 45, container.clientWidth / container.clientHeight, 1, 2000 );
    camera.position.z = 500;
    
    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );
    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );
    scene.add( camera );
   
    let loader = new GLTFLoader();

    var dracoLoader = new DRACOLoader();
    loader.setDRACOLoader( dracoLoader );
    loader.load('/face/'+id+'/face.gltf',function (obj) {
      scene.add(obj.scene);
      setLoading(false);
  },function (xhr) {
    setProcess(Math.round( xhr.loaded / xhr.total * 100 ) + '%');
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },function (error) {
      console.log('load error!'+error);
  })

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xFFFFFF);
    renderer.setPixelRatio( container.devicePixelRatio );
    renderer.setSize( container.clientWidth, container.clientHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;

    container.appendChild( renderer.domElement );

    var controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 5;
    controls.maxDistance = 2000;

    const onDocumentMouseMove = ( event: any ) => {
      event.preventDefault();
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
      camera.lookAt( scene.position );
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