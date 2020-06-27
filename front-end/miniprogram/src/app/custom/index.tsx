import React from 'react';
import { View, Image, Button } from 'remax/one';
import { chooseImage, getFileSystemManager, request, showToast, showLoading, hideLoading, navigateTo, showModal } from 'remax/wechat';
import {login} from '@/lib/login';
import './index.scss';
import {APPC} from '../style';
import AddPhotoIcon from '@/components/icons/add-photo';
import {SERVER_URL} from '@/env';

const CLASS_PREFIX = APPC+'-custom';

export default () => {
  const [state, setState] = React.useState({faceFront: null, faceLeft: null, faceRight: null});
  const [disabled, setDisabled] = React.useState(false);

  const handleAddPhoto = (side: 'faceFront'|'faceLeft'|'faceRight') => {
    chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0]);
        setState({...state, [side]: tempFilePaths[0]});
      }
    })
  }

  React.useEffect(() => {
    setDisabled([state.faceFront, state.faceLeft, state.faceRight].includes(null))
  }, [JSON.stringify(state)]);

  const handleUpload = () => {
    if(state.faceFront === null){
      showToast({
        title: "请上传人脸正脸照片",
        icon: "none"
      })
    }else if(state.faceLeft === null){
      showToast({
        title: "请上传左侧侧脸照片",
        icon: "none"
      })
    }else if(state.faceLeft === null){
      showToast({
        title: "请上传右侧侧脸照片",
        icon: "none"
      })
    }else{
      setDisabled(true);
      showLoading({
        title: '上传中',
      })
      const fileSystemManager = getFileSystemManager();
      const res1 = fileSystemManager.readFileSync(state.faceFront!, 'base64');
      const res2 = fileSystemManager.readFileSync(state.faceLeft!, 'base64');
      const res3 = fileSystemManager.readFileSync(state.faceRight!, 'base64');
      login().then((res: any) => {
        if(res.success){
          request({
            url: SERVER_URL+'/face',
            method: 'POST',
            data: {
              userId: res.openid,
              face1: res1,
              face2: res2,
              face3: res3,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res: any) {
              console.log(res, res.data)
              setDisabled(false);
              let error = null;
              if(res.statusCode === 413){
                error = '文件太大';
              }else if(res.statusCode !== 200){
                error = '人脸识别失败';
              }else if(!res.data.success){
                error = res.data.error;
              }
              hideLoading();
              if(error){
                showModal({
                  title: '提示',
                  content: error,
                  showCancel: false,
                })
              }else{
                // navigateTo({url: "/pages/face3D/index"});
              }
            },
            fail(res){
              console.log(res);
            }
          })
        }else{
          //
        }
      })
      
    }
  }

  return (
    <View className={CLASS_PREFIX+'-root'}>
      <View className={CLASS_PREFIX+'-container'}>
        <View className={CLASS_PREFIX+'-front'} onTap={() => handleAddPhoto('faceFront')}>
          {
            state.faceFront ?
            <Image src={state.faceFront!} className={CLASS_PREFIX+'-img'}/>
            :
            <View className={CLASS_PREFIX+'-addPhoto'}>
              <View><AddPhotoIcon/></View>
              <View>上传人脸正脸照片</View>
            </View>
          }
        </View>
        <View className={CLASS_PREFIX+'-side'}>
          <View className={CLASS_PREFIX+'-side-left'} onTap={() => handleAddPhoto('faceLeft')}>
            {
              state.faceLeft ?
              <Image src={state.faceLeft!} className={CLASS_PREFIX+'-img'}/>
              :
              <View className={CLASS_PREFIX+'-addPhoto'}>
                <View><AddPhotoIcon/></View>
                <View>上传左侧侧脸照片</View>
              </View>
            }
          </View>
          <View className={CLASS_PREFIX+'-side-right'} onTap={() => handleAddPhoto('faceRight')}>
            {
              state.faceRight ?
              <Image src={state.faceRight!} className={CLASS_PREFIX+'-img'}/>
              :
              <View className={CLASS_PREFIX+'-addPhoto'}>
                <View><AddPhotoIcon/></View>
                <View>上传右侧侧脸照片</View>
              </View>
            }
          </View>
        </View>
        <Button disabled={disabled} className={CLASS_PREFIX+'-btn'} onTap={handleUpload}>脸部照片提交</Button>
      </View>
    </View>
  );
};
